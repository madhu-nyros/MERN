import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route,browserHistory} from 'react-router';
import NotFound  from './components/Categories/NotFound.js';
import App from './components/App';
import Home from './components/Categories/Home.js';
import './components/App.css';
ReactDOM.render(
<Provider>
	<Router history={browserHistory} >
	 <Route path='/' component={App} />
	 <Route path="/signin" component={App} />
	 <Route path="/home" component={Home} />
         <Route path="*" component={NotFound} />   
	</Router>
</Provider>,	
  document.getElementById('root')
);

