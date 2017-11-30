import React, { Component } from 'react';
import '../App.css';
import $ from "jquery";
import {browserHistory} from 'react-router';
export default class Registration extends Component{
  constructor(props){
     super(props);
    this.state={
          usererror:'',
          passworderror:'',
          cpassworderror:'',
          ageerror:'',
          gender:'Male',     
    };
    this.register =this.register.bind(this);
    this.handleChange =this.handleChange.bind(this);
  }
   componentDidMount()
   {
      if(localStorage.playerid){
          browserHistory.push('/');
      }
   }
   register(event)
   {
       var name = this.refs.name.value;
       var password =this.refs.password.value;
       var cpassword = this.refs.password1.value;
       var age =this.refs.age.value;
       var gender = this.state.gender;
       var namereg      =  new RegExp(/^[A-Za-z]+$/) ;
        var errorflag = 0;
        if(name === ''){
           errorflag = 0;
           this.setState({usererror:'Please enter playername'});
        }
        else if(name.length <= 2){
           errorflag = 0;
          this.setState({usererror:'Name must be more than 3 characters'});
        }
        else if(!namereg.test(name)){
           errorflag = 0;
           this.setState({usererror:'Please enter characters only'});  
        }
        else{
            errorflag = 1;    
           this.setState({usererror:''});  
        }
        if(password === ''){  
           errorflag = 0;
           this.setState({passworderror:'Please enter password'});
        }
        else if(password.length < 8){
           errorflag = 0;
           this.setState({passworderror:'Password must be more than 8 characters'});
        }
        else{
           errorflag = 1;  
           this.setState({passworderror:''});
        }
        if(cpassword === ''){
           errorflag = 0; 
           this.setState({cpassworderror:' Please enter confirm password '});
        }
        else if(password !== cpassword){
           errorflag = 0;
           this.setState({cpassworderror:'Confirm password not match'});
        }
        else{
           errorflag = 1;
           this.setState({cpassworderror:''});
        }
        if(age === ''){
           errorflag = 0;
           this.setState({ageerror:'Please enter age'});
        } 
        else if(namereg.test(age)){
          errorflag = 0;
          this.setState({ageerror:'Please enter age in numeric formate'}); 
        }
        else{
          errorflag = 1; 
          this.setState({ageerror:''});
        }
       if(errorflag === 1 ){
         $.ajax({
              url:'http://10.90.90.40:3001/Registration',
              type:'POST',
              dataType:'json',
              data:{
                name:name,
                password:password,
                age:age,
                gender:gender
              },
              success:function(response){
                 console.log(response.data);

                 if(response.data !== 0)
                 {
                    localStorage.setItem('playerid', response.data._id);
                    localStorage.setItem('playername',response.data.name);
                    browserHistory.push('/Home');
                 }
              }
          });
      } 
      event.preventDefault();
    }
    handleChange(event)
    {
        this.setState({gender: event.target.value});
    }
render(){
    return (
       <div className="container">
         <div className="row">
           <div className="col-md-8">
               <img src={require('./../../assets/images/school-games.jpg')} alt="school-games"  width="700" height="450"/>
           </div>
           <div className="col-md-4">
              <h1>Create an account</h1>
              <form onSubmit={this.register}>
                <div className="form-group">
                  <label>username</label>
                  <input type="text" className="form-control" ref='name' id="Username"  placeholder="Enter Username" />
                  <small className="err" >{this.state.usererror}</small>
                </div>
                <div className="form-group">
                  <label>password</label>
                  <input type="password" className="form-control" ref='password'  id="Password" placeholder="Password"/>
                  <small className="err" >{this.state.passworderror}</small>
                </div>
                <div className="form-group">
                  <label>confirm password</label>
                  <input type="password" className="form-control" ref='password1'  id="cPassword" placeholder="Password"/>
                  <small className="err" >{this.state.cpassworderror}</small>
                </div>
                <div className="form-group">
                  <label>age</label>
                  <input type="text" className="form-control" ref='age'  id="age" placeholder="Age" />
                  <small className="err" >{this.state.ageerror}</small>
                </div>
                <div className="form-group">
                  <label>gender</label>
                  <select className="form-control" id="Gender"  onChange={this.handleChange.bind(this)} >
                     <option value="Male">Male</option>
                     <option value="Female">Female</option>
                  </select>
                </div>
                <div className="form-group">
                    <input type="submit" className="form-control" value="Create an account" id="rsubmit" />
                </div>
              </form>
           </div> 
         </div>
       </div>  
      );
    }
  }
