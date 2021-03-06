var express = require('express');
var bodyParser   = require('body-parser');
var app     = express();
var engine  = require('ejs-locals');
var path =require('path');
var nodemailer = require('nodemailer');
var mongoose =require('mongoose');
var  db = require('./model/db');
var cors = require('cors');
var schema =require('./model/players');
var games=require('./model/games');
var players=require('./model/joinedplayers');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/Registration', function (req, res){
  schema.findOne({name:req.body.name}, function(err, result) {
      if (!err && result == null){
      	new schema({
	      	name : req.body.name,
	      	password: req.body.password,
	      	age : req.body.age,
	      	gender:req.body.gender
	      }).save(function(err1, player){
	      	res.json({
	      		status: 200,
	      		data : player
	      	})
	      })
      } else {
      	res.json({
      		status :success,
      		data : result
      	})
      }  
    });
})
app.post('/Login',function(req,res){
	schema.findOne({name:req.body.name,password:req.body.password},function(err,result){        
        if(result == null){
           res.json({
           	     status:401,
           	     data:0,
           })
        }
        else{
            res.json({
             	 status:200,
             	 data:{pid:result.id,pname:result.name}        
            })
        }
	});
})
// post data from db to frontend start
app.use('/Home',function(req,res){
   games.find({},function(err,result){
       if(result == null){
          res.json({
              status:401,
              data:0
          })        
       }
       else{
          res.json({
             status:200,
             data:result
          })
       }
   });
})  
// post data from db to frontend end
app.use('/joinedplayers',function(req,res){
  players.findOne({$and:[{gameid : req.body.gameid},{playerid:req.body.playerid}]}).exec(function(err, doc){
    if (!err && doc == null){
      new players({
        gameid:req.body.gameid,
        playerid:req.body.playerid
       }).save(function(err1,response){
           res.json({
              status:200, 
              data:{gid:response.gameid,pid:response.playerid}
           });
       })
    } else {
       res.json({
           status:400,
           data:doc
       });
    }   
  })
})
// store the playerid and gameid in collection end
// get gameid in onload for button name changed like join here to joined start
app.use('/Gameid',function(req,res){
 players.find({}).populate('gameid').populate('playerid').exec(function(err,result){
     if(result != null){
        res.json({
          data:result
        })
     }
     else{
        res.json({
           status:401,
           data:0
        })
     }
   })
})   
// get gameid in onload for button name changed like join here to joined end
// get the player details and sport details start
app.post('/getDetails',function(req,res){
    players.find({gameid:req.body.gameid}).populate('gameid').populate('playerid').exec(function(err, result){
      if(result != null){ 
            res.json({
             status:200,
             data:result
          })       
       }
       else{
           res.json({
              status:401,
              data:0
          })
       }
    });
}) 
// get the player details and sport details end
// get player details for Editprofile start
app.post('/Editprofile',function(req,res){
  schema.find({_id:req.body.playerid},function(error,result){
     if(result != null && result != ' '){
            res.json({
               status:200,
               data:result
            });
     }
     else{
            res.json({
               status:401,
               data:0
            });
         }
     });
  })
// get player details for Editprofile start
//upadte user profile start
 app.post('/updateprofile',function(req,res){
    schema.findOne({_id : req.body.pid },function(err, doc){
      doc.name = req.body.name;
      doc.age = req.body.age;
      doc.gender = req.body.gender;
      doc.save(function(err1, user){
        res.json({
          status:200,
          data : user
        })
      })
    })
 })
//update user profile end
 //player unjoin from the game  start
app.use('/unjoinplayer',function(req,res){
 players.deleteOne({gameid:req.body.gameid,playerid:req.body.playerid},function(error,result){
    if(result){
       res.json({
           status:200,
           data:'success'
       });
    }
    else{
       res.json({
          status:401,
          data:'fail'
       })
    }
  }) 
});

//player unjoin from the game end
//participants count start
app.use('/getCount',function(req,res){
  players.aggregate([{"$group" : {_id:"$gameid", count:{$sum:1}}}],function(err,countresponse){
       if(countresponse){
         res.json({
             data:countresponse,
             status:200
         });
       }
       else{
          res.json({
            data:'fail',
            status:401
          });
       }
    })
  })
 
//participants count end
app.listen(3001,function(){
      console.log('Example app listening on port 3001');    
});

