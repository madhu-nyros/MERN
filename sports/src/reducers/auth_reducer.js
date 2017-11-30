import {AUTH_USER,AUTH_ERROR,LOGOUT_USER,MYCART_PLACEORDER} from '../actions/types';
// import jwtDecode from 'jwt-decode';
// const token = localStorage.getItem('token');
const INITIAL_STATE = {formdata:[]};
export default function(state = INITIAL_STATE,action){
    switch (action.type) {
      case AUTH_USER:
          return {...state,authenticated:false,formdata:action.payload.data};
      case LOGOUT_USER:
          return {...state,authenticated:false};
         
      case AUTH_ERROR:
          return {...state,error:action.payload};
      default:
          return state;

    }
}
