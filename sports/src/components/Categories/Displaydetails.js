import React, { Component } from 'react';
import {browserHistory,Link} from 'react-router';
import Header  from './header.js';
import '../App.css';
import $ from "jquery";

export default class Displaydetails extends Component{
    constructor(props)
    { 
	   super(props);
     this.state={
        id:this.props.params.id,
        playerscount:'',
        players:[]
     };
	     this.getDetails =this.getDetails.bind(this);
       this.unjoin     =this.unjoin.bind(this);
    }
    componentDidMount()
    {
       if(!localStorage.playerid)
      {
        browserHistory.push('/signin');
      } 
       this.getDetails();
    }
    //the below function is for unjoin game
     unjoin(gid)
     {
        $.ajax({
           url:'http://10.90.90.40:3001/unjoinplayer',  //from joined players  
           type:'post',
           data:{
                gameid:gid,
                playerid:localStorage.getItem('playerid'),
              },
           dataType:'json',
           success:function(unjoinres)
           {
               if(unjoinres.status === 200)
               {
                 this.getDetails();
               }
           }.bind(this)          
        });
     }
     getDetails()
     {     	 
     	 $.ajax({
            url:'http://10.90.90.40:3001/getDetails',
            type:'post',
            data:{gameid:this.state.id}, //send gameid for get details from joinedplayers collection
            dataType:'json',
            success:function(response)
            {
               if(response)
               { 
                  this.setState({players:response.data}); 
                  for(var i=0;i<= response.data.length;i++)
                  {
                      this.setState({playerscount:response.data.length});
                      if(this.state.id === response.data[i].gameid[i]._id)
                      {
                          this.setState({gamename:response.data[i].gameid[i].gamename});
                      }
                  } 
               }
               else
               {
               	 console.log('error');
               }
            }.bind(this)
     	 });
     }
  render()
  {
    var style={marginTop:'6%'}
  return(
	 	<div>
		  <div>
          <Header/>
      </div>
      <div className="container discontainer" >
        <h3 style={style}>{this.state.gamename} players({this.state.playerscount})</h3>
         <ul className="pattributes">
           <li><span className="label label-success">Name</span></li>
           <li><span className="label label-danger">Gender</span></li>
           <li><span className="label label-info">Age</span></li>  
        </ul> 
        <div className="row">
          <div className="col-md-8">
            <div className="row" id='plyrsgrid'> 
              {
                // (this.state.players.length > 0) ?
                //     console.log(this.state.players.length) 
                //  :  console.log('fail')
              }                  
              {this.state.players.map(function(data,index){
                  var player=false;
                  if(localStorage.getItem('playerid') === data.playerid[0]._id)
                  {
                      player=true;
                  }  
                  return(                           
                      <div className="col-md-3" key={index}>
                        <div className="panel panel-info"> 
                          <div className="panel-heading">
                             <h4>{data.playerid[0].name}</h4>
                          </div>
                          <div className='panel-content text-center'>
                             <p id='name'>{data.playerid[0].name}</p> 
                             <p id='gender'>{data.playerid[0].gender}</p>
                             <p id='age'>Age:{data.playerid[0].age}</p>
                          </div>
                          <div className='panel-footer'>
                         {player ? <td><Link to={'/Home'}><button className="btn btn-info btn-xs" onClick = {()=> {this.unjoin(data.gameid[0]._id)}}>Quit</button></Link></td>
                          :
                          <p></p> 
                         }  
                         </div>     
                        </div>
                     </div>
                    )                 
               },this)
              } 
           </div>
         </div>
         <div className="col-md-4">
         </div>
      </div>
    </div> 
	 </div>
   )
  }
}
