import React, { Component } from 'react';
import {browserHistory,Link} from 'react-router';
import Header from './Categories/header.js'
import Registration from './Categories/Registration.js';
class App extends Component {
  constructor(props){
    super(props);
  }
   componentDidMount(){
    	
      if(localStorage.playerid){
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
