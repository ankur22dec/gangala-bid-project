/* eslint-disable no-prototype-builtins */
/* eslint-disable no-  */
import axios from 'axios';
import { toast, Zoom } from 'react-toastify';
import { get, post, put, deleteApi } from '../api';

import {
  ADD_TO_CART,
  CREATE_ACUTION,
  GET_CART,
  GET_PRODUCT,
  GET_SELLER_PRODUCT,
  GET_WALLET,
  LOGIN_USER,
  LOGOUT_USER,
  SET_COUNTRY,
  GET_AUCTION,
  GET_SINGLE_AUCTION,
  SET_PRODUCT_DETAILS,
  SET_MIN_MAX_RANGE_PRODUCT,
  SET_WISHLIST_PRODUCTS,
  USERS_WISHLIST_WITH_PRODUCTS,
  UPDATE_REGISTER_POPUP_STATE,
  UPDATE_REDIRECT_LOGIN_USER,
  GET_USER_ADDRESS
} from './type';

/***
 * Redirect login user state update
 */

export const updateRedirectLoginUserState = (data) => {
  return {
    type: UPDATE_REDIRECT_LOGIN_USER,
    payload: data
  };
};

/***
 * resetPassword
 */
export const resetPassword = async (form) => async (dispatch) => {
  try {
    console.log('Acton RUn');
    ;
    const res = await axios.post(`api/user/new-password`, form);
    ;

    toast.warn('Password Reset Successfully', {
      containerId: 'D',
      transition: Zoom
    });
  } catch (error) {
    console.log('here');
    ;

    console.log(error);
    ;
  }
};

/***
 * Send Verficaiton Email
 */
export const sendVerficaionEmail = async (form) => async (dispatch) => {
  try {
    console.log('Acton RUn');
    ;
    const res = await axios.post(`api/user/reset-password`, form);
    ;

    toast.warn('Email Successfully Send', {
      containerId: 'D',
      transition: Zoom
    });
  } catch (error) {
    console.log('here');
    ;

    console.log(error);
    ;
  }
};
/**
 * Set Min Max Range
 */

export const setMinMaxRange = (min, max) => async (dispatch) => {
  dispatch({
    type: SET_MIN_MAX_RANGE_PRODUCT,
    min: min,
    max: max
  });
};

/**
 * Get Seller Product
 */
export const getSellerProduct = () => async (dispatch) => {
  try {
    // const res = await axios.get(`api/product/sellerProduct`);
    const res = await get('api/product/sellerProduct');
    dispatch({
      type: GET_SELLER_PRODUCT,
      payload: res
    });
  } catch (error) {
    console.log(error);
  }
};
/**
 * Create Product
 */
export const createProduct = (form, obj) => async (dispatch) => {
  try {
    let config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    ;
    let res = await axios.post(`api/product/createProduct`, form, obj, config);
    if (res.data.response) {
      dispatch(authUser());
      dispatch(getMe());
      dispatch(getSellerProduct());
    }
  } catch (error) {
    console.log(error);
  }
};
/**
 * upload Profile
 */
export const uploadProfile = (form) => async (dispatch) => {
  try {
    let localtoken = localStorage.getItem('token');
    let config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + localtoken
      }
    };
    let res = await axios.post(`api/user/upload/sellerProfile`, form, config);
    // let res = await post("api/user/upload/sellerProfile", form)
    if (res.data.response) {
      // dispatch(authUser());
      dispatch(getMe());
    } else {
      console.log('I am here');
    }
  } catch (error) {
    console.log(error);
  }
};
/**
 * Register User in Mongo and Odoo
 * **/
export const registerUser = (user, from = '') => async (dispatch) => {
  try {
    // let res = await axios.post(`api/user/register`, user);
    let res = await post('api/user/register', user);
    if (res.success) {
      if (from == 'facebook') {
        localStorage.setItem('token', res.token);
        dispatch(getMe());
      }
      console.log("resss", res)
      toast.warn('User Registered successfully', {
        containerId: 'D',
        transition: Zoom
      });
    }
  } catch (error) {
    if (error.response.data == "User Is Already Register With This Email" && from == "facebook") {
      let res = await post('api/user/loginwithoutpassword', user);
      if (res.success) {
        localStorage.setItem('token', res.token);
        dispatch(getMe());
      }
    } else {
      console.log("eorror==>", error.response);
      toast.error(error.response.data, {
        containerId: 'D',
        transition: Zoom
      });
    }

  }
};

/**
 * Update user in mongo
 * **/

export const updateUser = (name, id) => async (dispatch) => {
  try {
    let obj = {
      id: id,
      name: name
    };
    let res = await put(`api/user/updateProfile`, obj);
    dispatch(authUser());
  } catch (error) {
    console.log(error.response);
    toast.error(error.response.data, {
      containerId: 'D',
      transition: Zoom
    });
  }
};
/**
 * Update user address id in mongo
 * **/

export const updateUserAddressId = (id) => async (dispatch) => {
  try {
    let obj = {
      addressId: id
    };
    let res = await put(`api/user/updatePrimaryAddressId`, obj);
    dispatch(authUser());
  } catch (error) {
    console.log(error.response);
    toast.error(error.response.data, {
      containerId: 'D',
      transition: Zoom
    });
  }
};

/**
 * Register Seller Account
 *
 */
export const registerSeller = (user) => async (dispatch) => {
  let config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  user.waNumber = Number(user.waNumber);
  try {
    let res = await axios.post(`api/user/sellerRegister`, user, config);
    console.log(res);
    toast.warn(res.data.message, {
      containerId: 'D',
      transition: Zoom
    });
  } catch (error) {
    console.log(error.response);
    toast.error(error.response.data, {
      containerId: 'D',
      transition: Zoom
    });
  }
};
/**
 * Login USer
 */
export const registerModal = (isOpen) => async (dispatch) => {
  dispatch({
    type: UPDATE_REGISTER_POPUP_STATE,
    payload: isOpen
  });
};

export const getMe = () => async (dispatch) => {
  console.log('I am called');
  try {
    let me = await get('api/user/me');
    console.log(me);
    if (me.success) {
      dispatch({
        type: LOGIN_USER,
        payload: me.data
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const loginUser = (user) => async (dispatch) => {
  try {
    // let res = await axios.post(`api/user/login`, user);
    let res = await post('api/user/login', user);

    console.log(res);
    localStorage.setItem('token', res.token);
    dispatch({
      type: LOGIN_USER,
      payload: res.data
    });
    return true;
  } catch (error) {
    console.log(error.response);
    toast.error(error.response.data, {
      containerId: 'D',
      transition: Zoom
    });
    return false;
  }
};

/**
 * AuthLoad
 */
export const authUser = () => async (dispatch) => {
  try {
    let me = await get('api/user/me');
    if (me.success) {
      dispatch({
        type: LOGIN_USER,
        payload: me.data
      });
    }
  } catch (error) {
    console.log(error.response);
  }
};
/**
 * Logout
 */
export const logoutUser = () => async (dispatch) => {
  try {
    // let res = await axios.get(`api/user/logout`, {
    //   withCredentials: true
    // });
    toast.warn('User Logout Successfully.', {
      containerId: 'D',
      transition: Zoom
    });

    localStorage.removeItem('token');
    dispatch({
      type: LOGOUT_USER
    });
  } catch (error) {
    console.log(error.response);
    toast.error(error.response.data, {
      containerId: 'D',
      transition: Zoom
    });
  }
};
/**
 * Create Acution
 * **/
export const createAcution = (form, history) => async (dispatch) => {
  let config = {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  };
  const obj = {
    form: form
  };
  console.log(obj);
  try {
    const res = await post(`api/acution/odoo`, obj, config);
    dispatch({
      type: CREATE_ACUTION
    });
    if (res.success) {
      toast.warn('Success Acution is Created', {
        containerId: 'D',
        transition: Zoom
      });
      dispatch(getAuction());
      history.push('/Userprofile');
    }
  } catch (error) {
    console.log(error);
    toast.error('Error is Creating Acution', {
      containerId: 'D',
      transition: Zoom
    });
  }
};
/**
 * Get Auction
 */
export const getAuction = () => async (dispatch) => {
  try {
    const res = await get(`api/acution/getAuction`);
    ;
    dispatch({
      type: GET_AUCTION,
      payload: res
    });
  } catch (error) {
    console.log(error);
  }
};
/**
 * Get Single Auction
 */
export const getSingleAuction = (id) => async (dispatch) => {
  try {
    const res = await get(`api/acution/single/${id}`);
    dispatch({
      type: GET_SINGLE_AUCTION,
      payload: res
    });
  } catch (error) {
    console.log(error);
  }
};
/**
 * setCountry of current users
 */
export const getCountry = () => async (dispatch) => {
  try {
    ;
    const country = await get('api/country');
    ;

    if (country)
      dispatch({
        type: SET_COUNTRY,
        payload: country
      });
  } catch (error) {
    console.log(error);
  }
};
export const getProduct = (pageNumber, min = null, max = null) => async (
  dispatch
) => {
  try {
    let res = null;
    if (min == null) {
      res = await get(`api/product/${pageNumber}`);
    } else {
      res = await get(`api/product/range/${min}/${max}/${pageNumber}`);
    }
    dispatch({
      type: GET_PRODUCT,
      payload: res.data,
      totalProducts: res.total
    });
  } catch (error) {
    toast.warn("Yes, you've successfully reached the last wizard step !", {
      containerId: 'D',
      transition: Zoom
    });
  }
};

export const getProductDetails = (productId) => async (dispatch) => {
  try {
    const result = await get(`api/product/detail/${productId}`);
    dispatch({
      type: SET_PRODUCT_DETAILS,
      payload: result.data
    });
  } catch (error) {
    toast.warn('OOPS there is some problem while fetching product.', {
      containerId: 'D',
      transition: Zoom
    });
  }
};
export const getCart = () => async (dispatch) => {
  let cart = localStorage.getItem('cart');
  cart = JSON.parse(cart);
  dispatch({
    type: GET_CART,
    payload: cart
  });
};
export const getWishlistProducts = (userID) => async (dispatch) => {
  try {
    let getAllWishlistProducts = await get('api/wishlist/products/' + userID);
    if (getAllWishlistProducts.success) {
      dispatch({
        type: USERS_WISHLIST_WITH_PRODUCTS,
        payload: getAllWishlistProducts.data
      });
    }
  } catch (error) {
    console.log(error.response);
    toast.error(error.response.data, {
      containerId: 'D',
      transition: Zoom
    });
  }
};
export const getWishList = (userID) => async (dispatch) => {
  try {
    let getAllWishlistItems = await get('api/wishlist/' + userID);

    let arr = [];
    let d = getAllWishlistItems.data;
    for (let i in d) {
      arr.push(d[i].productID);
    }
    dispatch({
      type: SET_WISHLIST_PRODUCTS,
      payload: arr
    });
  } catch (error) {
    toast.error(error.response.data, {
      containerId: 'D',
      transition: Zoom
    });
  }
};
export const addToWishList = (id, userID) => async (dispatch) => {
  try {
    let obj = {
      productID: id,
      userID
    };
    let request = await post('api/wishlist', obj);
    if (request.success) {
      toast.warn('Product added to wishlist', {
        containerId: 'D',
        transition: Zoom
      });
      let getAllWishlistItems = await get('api/wishlist/' + userID);
      console.log(getAllWishlistItems.data);
      let arr = [];
      let d = getAllWishlistItems.data;
      for (let i in d) {
        arr.push(d[i].productID);
      }
      dispatch({
        type: SET_WISHLIST_PRODUCTS,
        payload: arr
      });
    }
  } catch (error) {
    toast.error(error.response.data, {
      containerId: 'D',
      transition: Zoom
    });
  }
};
export const removeFromWishList = (id, userID) => async (dispatch) => {
  try {
    let obj = {
      productID: id,
      userID
    };
    let request = await deleteApi('api/wishlist', obj);

    if (request.success) {
      toast.warn('Product deleted from wishlist', {
        containerId: 'D',
        transition: Zoom
      });
      let getAllWishlistItems = await get('api/wishlist/' + userID);

      let arr = [];
      let d = getAllWishlistItems.data;
      for (let i in d) {
        arr.push(d[i].productID);
      }
      dispatch({
        type: SET_WISHLIST_PRODUCTS,
        payload: arr
      });
    }
  } catch (error) {
    toast.error(error.response.data, {
      containerId: 'D',
      transition: Zoom
    });
  }
};
export const addToCart = (products) => async (dispatch) => {
  let cart = localStorage.getItem('cart');
  if (cart === '' || cart === null) {
    let arr = [];
    products.quantity = 1;

    arr.push(products);

    let product = JSON.stringify(arr);
    localStorage.setItem('cart', product);
  } else {
    let cart = localStorage.getItem('cart');
    let parseCart = JSON.parse(cart);
    products.quantity = 1;
    parseCart.push(products);
    let unparse = JSON.stringify(parseCart);
    localStorage.setItem('cart', unparse);
  }
  let cart2 = localStorage.getItem('cart');
  let cart3 = JSON.parse(cart2);
  console.log(cart3);
  dispatch({
    type: ADD_TO_CART,
    payload: cart3
  });
  dispatch(getCart());
};
export const updateCartOption = (products) => async (dispatch) => {
  let unparse = JSON.stringify(products);
  localStorage.setItem('cart', unparse);
  let cart2 = localStorage.getItem('cart');
  let cart3 = JSON.parse(cart2);
  console.log(cart3);
  dispatch({
    type: ADD_TO_CART,
    payload: cart3
  });
  dispatch(getCart());
};
export const removeFromCart = (products) => async (dispatch) => {
  let cart = localStorage.getItem('cart');
  let parseCart = JSON.parse(cart);
  parseCart = parseCart.filter((c) => c._id !== products._id);
  let unparse = JSON.stringify(parseCart);
  localStorage.setItem('cart', unparse);
  let cart2 = localStorage.getItem('cart');
  let cart3 = JSON.parse(cart2);
  console.log(cart3);
  dispatch({
    type: ADD_TO_CART,
    payload: cart3
  });
  dispatch(getCart());
};
/**
 * Get Wallet
 */
export const getWallet = () => async (dispatch) => {
  try {
    const res = await axios.get(`api/wallet`);
    dispatch({
      type: GET_WALLET,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};
/**
 * Add Address
 */

export const adduserAddress = (address) => async (dispatch) => {
  try {
    let res = await post('api/address', address);
    if (res.success) {
      console.log('res==>', res);
      dispatch(getuserAddress());
      toast.warn('Address Inserted successfully', {
        containerId: 'D',
        transition: Zoom
      });
    }
  } catch (error) {
    console.log(error.response);
    toast.error(error.response.data, {
      containerId: 'D',
      transition: Zoom
    });
  }
};
/**
 * Edit Address
 */

export const editUserAddress = (address) => async (dispatch) => {
  try {
    let res = await put('api/address', address);
    if (res.success) {
      console.log('res==>', res);
      dispatch(getuserAddress());
      toast.warn('Address Updated successfully', {
        containerId: 'D',
        transition: Zoom
      });
    }
  } catch (error) {
    console.log(error.response);
    toast.error(error.response.data, {
      containerId: 'D',
      transition: Zoom
    });
  }
};

export const getuserAddress = () => async (dispatch) => {
  try {
    let address = await get('api/address');
    if (address.success) {
      console.log('getting data===>', address);

      dispatch({
        type: GET_USER_ADDRESS,
        payload: address.data
      });
    }
  } catch (error) {
    console.log(error);
  }
};
