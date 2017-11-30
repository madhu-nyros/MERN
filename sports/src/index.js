import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route,browserHistory} from 'react-router';
import thunk from 'redux-thunk';
import reducers from './reducers';
import NotFound  from './components/Categories/NotFound.js';


const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);
import App from './components/App';
import Home from './components/Categories/Home.js';
import Displaydetails from './components/Categories/Displaydetails.js';
// import Header from './components/Categories/header.js';
import './components/App.css';
ReactDOM.render(
<Provider store={store}>
	<Router history={browserHistory} >
		<Route path='/' component={App} />
		<Route path="/signin" component={App} />
 		<Route path="/home" component={Home} />
        <Route path="/Displaydetails/:id" component={Displaydetails} /> 	
        <Route path="*" component={NotFound} />   
	</Router>
</Provider>,	
  document.getElementById('root')
);
// <Route path="*" component={Notfound} />
// <Route path="/" component={Home} />
