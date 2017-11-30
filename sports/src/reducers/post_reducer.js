import {FETCH_POST,POST_SHOW,EDIT_POST,UPDATE_POST,FETCH_ADS,FETCH_PROMO_ADS,FETCH_SEARCH,FETCH_TRENDS,FETCH_LEADS,MYCART_PLACEORDER} from '../actions/types';

const INITIAL_STATE = {all:[],post:null,ads:[],offers:[],product_offers:[],seed_offers:[],promo_ads:[], search:[], brands:[],products:[],categories:[], trendings:[],leads:[],popular_brands:[],recent_search:[],lead_status:'', mycart_order_status:'',total_cart_data:[]};

export default function (state = INITIAL_STATE,action){
    switch (action.type) {
      case POST_SHOW:
        return {...state,post:action.payload.data};  
      case FETCH_POST:
        return { ...state, all: action.payload.data };
      case FETCH_ADS:
        return { ...state, ads: action.payload.data.imgs };
      case FETCH_PROMO_ADS:
        return { ...state, offers: action.payload.data.offers,product_offers: action.payload.data.product_offers,seed_offers: action.payload.data.seed_offers ,promo_ads: action.payload.data };                     
      case FETCH_SEARCH:
        return { ...state, search: action.payload.data,brands: action.payload.data.brands, products: action.payload.data.products,categories: action.payload.data.categories};
      case FETCH_TRENDS:
        return { ...state, trendings: action.payload.data.data,popular_brands: action.payload.data.data2,recent_search: action.payload.data.data1};
      case FETCH_LEADS:
        return { ...state, leads: action.payload.data,lead_status: action.payload.data.status};        
      case EDIT_POST:
        return { ...state, edit: action.payload.data };
      case MYCART_PLACEORDER:
        return { ...state, mycart_order_status: action.payload.data.status,total_cart_data: action.payload };
      case UPDATE_POST:
        return { ...state, update: action.payload.data };     
      default:
        return state;
    }
}
