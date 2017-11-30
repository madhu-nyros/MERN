import React, { Component } from 'react';
import '../App.css';
import $ from "jquery";
import {Modal} from 'react-bootstrap';
import { Link,browserHistory } from 'react-router';
export default class Header extends Component
{
	 constructor(props){
	 	super(props);
	 	this.state={
	 		  invalid:'',
	 		  nameerror:'',
	 		  passerror:'',
	 		  showModal:'',
        name:'',
        age:'',
        gender:'',
        updatestate:false,
	 	}
	    this.Login =this.Login.bind(this);
      this.Editprofile =this.Editprofile.bind(this);
	    this.updateEdit=this.updateEdit.bind(this);
      this.getInitialState =this.getInitialState.bind(this);
      this.update =this.update.bind(this);    
      this.close =this.close.bind(this);
      this.viewprofile =this.viewprofile.bind(this);
      this.userchange =this.userchange.bind(this);
      this.agechange =this.agechange.bind(this);
      this.genderchange =this.genderchange.bind(this);
      this.logout =this.logout.bind(this);
   }
     componentDidMount(){
       if(!localStorage.playerid)
       {
         browserHistory.push('/signin');
       }
     }
     Login(event){
       event.preventDefault();
       var name =this.refs.name.value;
       var password =this.refs.password.value;
       var flag=1;
        if(name === ''){
           flag=0;
           this.setState({nameerror:'Please enter name'});
        }
        else if(name.length <= 2){
           flag=0;
           this.setState({nameerror:'Name must be more than 3 characters'});
        }
        else{
           this.setState({nameerror:''});
        }
        if(password === ''){
           flag =0;
           this.setState({passerror:'Please enter password'});
        }
        else if(password.length < 8){
           flag=0;
           this.setState({passerror:'Password must be more than 8 characters'});
        }
        else{
           this.setState({passerror:''});
        }
       if(flag === 1){ 
         $.ajax({
            url:'http://10.90.90.40:3001/Login',
            type:'POST',
            dataType:'json',
            data:{
                name:name,
                password:password
            },
            success:function(response){
                if(response.data !== 0){
                    localStorage.setItem('playerid', response.data.pid);
                    localStorage.setItem('playername',response.data.pname);
                    browserHistory.push('/Home');
                }
                else{
                   this.setState({nameerror:'Incorrect username/password'});
                }
           }.bind(this),
           error:function(err)
           {
            console.log(err);
           }
      });
    }
  }
  Editprofile()
  {
    this.setState({showModal:true});
     $.ajax({
          url:'http://10.90.90.40:3001/Editprofile',
          type:'POST',
          data:{playerid:localStorage.playerid},
          dataType:'json',
          success:function(editeddata){
             if(editeddata.data != '')
             {
                this.setState({name:editeddata.data[0].name,
                               gender:editeddata.data[0].gender,
                               age:editeddata.data[0].age
                             }) 
             }
          }.bind(this)
      });
   }
   updateEdit(){
     $.ajax({
          url:'http://10.90.90.40:3001/updateprofile',
          type:'POST',
          dataType:'json',
          data:{
              pid:localStorage.playerid,
              name:this.state.name,
              age:this.state.age,
              gender:this.state.gender
          },
          success:function(success)
          {
               this.setState({showModal:true});
          }.bind(this)
     })    
   }
  userchange(event){
    this.setState({name:event.target.value});
  }
  agechange(event){
     this.setState({age:event.target.value});
  }
  genderchange(event){
     this.setState({gender:event.target.value});
  }
  viewprofile(){
      this.setState({updatestate:false});
   }
   //modal realted functions funcitons start
  getInitialState(){
   return { showModal: false };
  }
  close(){
   this.setState({ showModal: false,updatestate:false });
  }
  update(){
     this.setState({updatestate:true});
  }
  //modal related functions end
  logout(){
      localStorage.clear();
      browserHistory.push('/signin');       
  }
	render(){
  	return(
      <div> 
     { localStorage.playerid  ? 
     <div>
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="navbar-header">
          <Link to={'/Home'}><a className="navbar-brand" id="brand">Sports</a></Link>
        </div> 
        <ul className="nav navbar-nav navbar-right">
          <li className="dropdown">
             <a className="dropdown-toggle" data-toggle="dropdown" href="#">Welcome {localStorage.getItem('playername')}
               <span className="caret"></span>
             </a>
             <ul className="dropdown-menu">
               <li><Link id="editprofile" onClick={this.Editprofile}>Edit Profile</Link></li>
             </ul>
          </li>
          <li><Link onClick={this.logout} id="logout">Signout</Link></li>
        </ul>
      </nav>
       <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Edit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
                {
                  !this.state.updatestate ? 
                     <div className="panel panel-default"> 
                       <div className="panel-heading">   
                           <h3>Profile</h3>
                        </div>
                        <div className="panel-body"> 
                           <ul className="list-group">
                              <li className="list-group-item">Name:{this.state.name}</li>
                              <li className="list-group-item">Gender:{this.state.gender}</li>
                              <li className="list-group-item">Age:{this.state.age}</li>
                           </ul>
                         </div>
                         <div className="panel-footer">
                           <button className="btn btn-sm btn-info" onClick={this.update}>Edit</button> 
                         </div>
                     </div> 
                  :
                    <div>
                     <form onSubmit={this.updateEdit}>
                        <div className="form-group">
                          <label>username</label>
                          <input type="text" className="form-control" value={this.state.name} ref='name' id="Username" onChange={()=>{this.userchange(event)}}  placeholder="Enter Username" />
                          <small className="err" >{this.state.usererror}</small>
                        </div>
                        <div className="form-group">
                          <label>age</label>
                          <input type="text" className="form-control" ref='age' value={this.state.age} onChange={()=> {this.agechange(event)}} id="age" placeholder="Age" />
                          <small className="err" >{this.state.ageerror}</small>
                        </div>
                        <div className="form-group">
                          <label>gender</label>
                          <select className="form-control"  id="Gender" onChange={() => {this.genderchange(event)}} > 
                              <option value='Male' selected={this.state.gender === 'Male'?true:false} >Male</option>                            
                              <option value='Female' selected={this.state.gender === 'Female'?true:false}>Female</option>
                          </select>
                        </div>
                        <div className="form-group">
                            <input type="submit" className="form-control" value="update" id="rsubmit" />
                        </div>
                    </form>
                     <Link className="pull-left" id='viewprofile' onClick={this.viewprofile}>viewprofile</Link>
                   </div>  
                 }
          </Modal.Body>

        <Modal.Footer>
           <button onClick={this.close}>Close</button>
        </Modal.Footer>
      </Modal>
     </div> 
        :
       <nav className="navbar navbar-default" id="topnav">
        <div className="navbar-header">
          <a className="navbar-brand">Sports</a>
        </div>
        <form className="form-inline loginform" onSubmit={this.Login}>
          <h6>{this.state.invalid}</h6>
          <div className="form-group">
            <label  className="loglabel">username</label>
            <input type="name" className='form-control' ref="name" id="name"/>
            <span className="err" id="nameerror">{this.state.nameerror}</span>
          </div>
          <div className="form-group">
            <label  className="loglabel">password</label>
            <input type="password" className='form-control' ref="password" id="pwd"/>
            <span className="err" id="passerror">{this.state.passerror}</span> 
          </div>
          <div className="form-group">
            <input type="submit" id="submit" className="btn btn-sm btn-default form-control" value="Signin"/>
          </div>
        </form>
      </nav>  
     }
     </div>
     );
   }
 }


  			 