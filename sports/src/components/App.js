import React, { Component } from 'react';
// import logo from './logo.svg';
// import { Router, Route } from 'react-router';
import {browserHistory,Link} from 'react-router';
import Header from './Categories/header.js'
import Registration from './Categories/Registration.js';
// import Login from './components/Login.js';



class App extends Component {

   constructor(props)
  {
    super(props);
     
    
  }
   componentDidMount()
  {
    	if(localStorage.playerid)
    	{
    		browserHistory.push('/Home');
    	}
       
  } 

  render() {

    return (
       <div> 
          <Header/> 
          <Registration/>
       </div>
    );
  }
}

export default App;



// logOut(){
//     $.ajax({
//       method: 'post',
//       data:{
//         url:'logOut',
//         sessionId:this.state.sessionId,
//         userId:this.state.userId          
//       },        
//       url:SiteConfig.baseUrl,
//       success: function(){
//         cookies.remove('userId')
//         localStorage.clear()
//         this.setState({sessionId:null,user:null,userId:null}) 
//         this.componentDidMount()
//         browserHistory.push('/');       
//         // browserHistory.push('/');
//       }.bind(this),
//       error: function(err){
//         console.log(err);
//         this.setState({showErrorModal:true, errorMsg:err.message}) 
//       }.bind(this)
//     });
//   }