/* eslint-disable import/no-anonymous-default-export */
import {
  GET_PRODUCT,
  GET_CART,
  // REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  CREATE_ACUTION,
  REGISTER_USER_FAIL,
  SET_COUNTRY,
  GET_WALLET,
  GET_SELLER_PRODUCT,
  GET_AUCTION,
  GET_SINGLE_AUCTION,
  SET_PRODUCT_DETAILS,
  SET_MIN_MAX_RANGE_PRODUCT,
  SET_WISHLIST_PRODUCTS,
  USERS_WISHLIST_WITH_PRODUCTS,
  UPDATE_REGISTER_POPUP_STATE,
  UPDATE_REDIRECT_LOGIN_USER,
  GET_USER_ADDRESS
} from '../Action/type';
const initialState = {
  product: [],
  totalProducts: 0,
  sellerProduct: null,
  cart: [],
  auction: [],
  singleAuction: null,
  isAuth: false,
  user: null,
  country: null,
  wallet: null,
  productsDetails: null,
  productMin: null,
  productMax: null,
  wishlist: [],
  wishlistWithProducts: [],
  registerModalState: false,
  redirectUserToPage:"",
  address:[]
};
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_REDIRECT_LOGIN_USER: 
    return{
      ...state,
      redirectUserToPage:action.payload
    }
    case GET_SELLER_PRODUCT:
      return {
        ...state,
        sellerProduct: action.payload
      };
    case GET_SINGLE_AUCTION:
      return {
        ...state,
        singleAuction: action.payload
      };
    case GET_AUCTION:
      return {
        ...state,
        auction: action.payload
      };
    case UPDATE_REGISTER_POPUP_STATE:
      return {
        ...state,
        registerModalState: action.payload
      };
    case SET_WISHLIST_PRODUCTS:
      return {
        ...state,
        wishlist: action.payload
      };
    case USERS_WISHLIST_WITH_PRODUCTS:
      return {
        ...state,
        wishlistWithProducts: action.payload
      };
    case SET_MIN_MAX_RANGE_PRODUCT:
      return {
        ...state,
        productMin: action.min,
        productMax: action.max
      };
    case SET_COUNTRY:
      return {
        ...state,
        country: action.payload
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload,
        totalProducts: action.totalProducts
      };
    case GET_CART:
      return {
        ...state,
        cart: action.payload
      };
    case LOGIN_USER:
      return {
        ...state,
        isAuth: true,
        user: action.payload
      };
    case GET_WALLET:
      return {
        ...state,
        wallet: action.payload
      };
    case CREATE_ACUTION:
      localStorage.removeItem('cart');
      return {
        ...state,
        cart: []
      };
    case LOGOUT_USER:
      return {
        ...state,
        isAuth: false,
        user: null,
        wishlist: []
      };
    case SET_PRODUCT_DETAILS:
      return {
        ...state,
        productsDetails: action.payload
      };
    case REGISTER_USER_FAIL:
      return {
        ...state,
        isAuth: false,
        user: null
      };
      case GET_USER_ADDRESS:
        return {
          ...state,
          address: action.payload
        };
    default:
      return state;
  }
};
