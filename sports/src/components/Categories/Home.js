import React, { Component } from 'react';
import {browserHistory,Link} from 'react-router'; 
import Header  from './header.js';
import {Modal,Button,Collapse,Well,Accordion,Panel} from 'react-bootstrap';
import '../App.css';
import $ from "jquery";
export default class Home extends Component
{
  constructor(props)
  {
    super(props);
     this.state ={
            games:[],
            data:[],  //this is for store the ids to change the join button status
            gameid:[],
            count:[],
            gamename:'',
            players:[], 
            activeKey:'',
                       
          }
     this.getGames = this.getGames.bind(this); 
     this.joined   = this.joined.bind(this);
     this.getId    = this.getId.bind(this);
     this.getCount =this.getCount.bind(this);
     this.getInitialState = this.getInitialState.bind(this); //it is for modal
     this.close           = this.close.bind(this); //it is for modal
     this.unjoin          = this.unjoin.bind(this); 
     this.getDetails      = this.getDetails.bind(this);  
     this.handleSelect    =this.handleSelect.bind(this);
  }
  componentDidMount()
  {
    	if(!localStorage.playerid)
    	{
    		browserHistory.push('/signin');
    	}
      else
      {
         browserHistory.push('/Home');
      }
       this.getGames();   
       this.getId();
       this.getCount();          
  } 
  getCount()
  {
    $.ajax({
       url:'http://10.90.90.40:3001/getCount',
       type:'post',
       datatype:'json',
       success:function(count)
       { 
           // console.log(count.data)
           if(count.data)
           { 
             // console.log(count);
             this.setState({count:count.data});
           }
       }.bind(this)
    });   
  }
  getId()
  {
    $.ajax({
       url:'http://10.90.90.40:3001/Gameid',
       type:'post',
       datatype:'json',
       success:function(res)
       { 
           if(res)
           { 
             this.setState({data:res.data});
           }
       }.bind(this)
    });
  }
  joined(id)
  {
    //if joined functionality is not working then goto db and remove empty gameid values
     $.ajax({
         url:'http://10.90.90.40:3001/joinedplayers',
         type:'POST',
         dataType:'json',
         data:{
             gameid:id,
             playerid:localStorage.getItem('playerid'),
         },
         success:function(response){
            // console.log(response.data.gameid); //gameid
            if(response)
            {
                this.getGames();
                this.getId();
                this.getCount();
                // this.setState({gameid:response.data});
            }

         }.bind(this)
     });
  }
  getGames()
  {
      $.ajax({
         url:'http://10.90.90.40:3001/Home',
         type:'POST',
         dataType:'json',
         data:{data:1},
         success:function(response){
           if(response !== null)
           {
               this.setState({games:response.data});
           }
         }.bind(this),
         error:function(error)
         {
           console.log(error);
         }
       });
    }

  getInitialState() {
    return { showModal: false };

   }

  close() {
    this.setState({ showModal: false });
    this.getGames(); 
    this.getId();
    this.getCount();          
  }
  unjoin(gid)
  {
     if(gid)
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
               this.getDetails(gid);
             }
           }.bind(this)          
        });
     }
  }
  getDetails(gid)
  {       
     $.ajax({
          url:'http://10.90.90.40:3001/getDetails',
          type:'post',
          data:{gameid:gid}, //send gameid for get details from joinedplayers collection
          dataType:'json',
          success:function(response)
          {
             if(response)
             { 
                 this.setState({players:response.data}); 
                 this.setState({ showModal: true });
                for(var i=0;i<= response.data.length;i++)
                {
                    this.setState({playerscount:response.data.length});
                    if(gid === response.data[i].gameid[i]._id)
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
    handleSelect(key)
    {
       this.setState({activeKey:key});
    }
  render(){ 
     var style={cursor:'pointer'};
   return(
    <div> 
      <Header/>
      <div className="row"> 
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.gamename} players({this.state.playerscount})</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container"> 
              <div className="row">
                <div className="col-md-4">
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
                     <div id="accordion"> 
                       <Accordion activeKey={this.state.activeKey}>
                        <Panel style={style} header={data.playerid[0].name} eventKey={data.playerid[0]._id}  onClick={()=>this.handleSelect(data.playerid[0]._id)}>
                           <p className='text-center'>Name   :  {data.playerid[0].name}</p>
                           <p className='text-center'>Gender :  {data.playerid[0].gender}</p>
                           <p className='text-center'>Age    :  {data.playerid[0].age}</p>
                           {player ? <button className="btn btn-info btn-xs pull-right" onClick = {()=> {this.unjoin(data.gameid[0]._id)}}>Quit</button>
                          :
                           ' ' 
                            }  
                        </Panel>
                      </Accordion>
                     </div>
                  )                 
              },this)
            } 

               </div>
               <div className="col-md-8">
               </div>
              </div> 
            </div>     
        </Modal.Body>
        <Modal.Footer>
           <button onClick={this.close}>Close</button>
        </Modal.Footer>
      </Modal>
     </div> 
      <div className="container homecontainer">
        <div className="row">
          {this.state.games.map(function(Data,index){ 
             var check = false;
            {this.state.data.map(function(ids,index){   
               if((Data._id === ids.gameid[0]._id)  && (localStorage.getItem('playerid') === ids.playerid[0]._id) )
               {  
                  check = true;  
               }
              })
            }
        return(
             <div className="col-md-3 grid">
               <div className="panel panel-default">
                 <div className="panel-heading">
                    <h4 key={index}>{Data.gamename}</h4>
                 </div> 
                 <div className="panel-content text-center">
                  <img src={require('../../assets/images/'+ Data.imagename +'.jpg')} alt="nothing" width="200" height="200" />
                 </div>
                 <div className="panel-footer">             
                  { check  ? 
                  <button  type="button" className="btn btn-sm btn-success">Joined</button>          
                  : <button  type="button" className="btn btn-sm btn-info" onClick={() => {this.joined(Data._id)}}>Join here</button>    
                  }
              {this.state.count.map(function(value,index){
               return(
                <span id="countvalue"> 
                   { Data._id === value._id[0] ? <Link onClick={() => {this.getDetails(Data._id)}}><h4>Players({value.count})</h4></Link> : <h6></h6>}
                </span>
               )                 
               }.bind(this))
              }
         </div>
        </div>
      </div>          
     )
    }.bind(this))
   } 
  </div> 
 </div>
</div>
 );
 }
}
