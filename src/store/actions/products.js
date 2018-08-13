
import {LOGGING_IN,CURRENT_CATEGORY,ADD_CART,CHANGE_EMAIL,CHANGE_FIRSTNAME,CHANGE_LASTNAME,ADD_USERID,FB_ACCESS_TOKEN,DELIVERER,CURRENT_PRODUCT,CHANGE_QUANTITY,INITIALIZE_PRODUCTS} from "./actionTypes"

export const loggingIn = () => {
  return {
      type: LOGGING_IN
  };
};
export const currentCategory = (category) => {
    return {
        type: CURRENT_CATEGORY,
        category: category
    };
};
export const currentProduct = (product) => {
    return {
        type: CURRENT_PRODUCT,
        product: product
    }
};
export const addCart = (item) => {
  return {
      type: ADD_CART,
      item: item
  };
};
export const changingEmail = (newEmail) => {
    return {
        type: CHANGE_EMAIL,
        newEmail: newEmail
    }
};
export const changingFirstName = (newFirstName) => {
    return {
        type: CHANGE_FIRSTNAME,
        newFirstName: newFirstName
    }
};
export const changingLastName = (newLastName) => {
    return {
        type: CHANGE_LASTNAME,
        newLastName: newLastName
    }
};
export const addingUserId = (userId) => {
  console.log("In adding user id: ", userId);
  return{
    type: ADD_USERID,
    userId: userId
  }
};
export const addingAccessToken = (accessToken) => {
  return{
    type: FB_ACCESS_TOKEN,
    accessToken: accessToken
  }
};

export const addingDeliverer = (isDeliverer) => {
  console.log('deliver1', isDeliverer)
  return{
    type: DELIVERER,
    isDeliverer: isDeliverer
  }
};

export const changingQuantity = (newQuantity, name)=>{
    console.log("New Quantity", newQuantity);
    console.log("Name", name);
    return {
        type: CHANGE_QUANTITY,
        quantity: newQuantity,
        name: name
    }
};

export const initializingProducts = (name)=>{
    return {
        type: INITIALIZE_PRODUCTS,
        name: name
    }
};


