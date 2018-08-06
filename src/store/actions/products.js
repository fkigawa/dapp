import {LOGGING_IN,CURRENT_CATEGORY,ADD_CART,CHANGE_EMAIL,CHANGE_FIRSTNAME,CHANGE_LASTNAME,ADD_USERID} from "./actionTypes"
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
  return{
    type: ADD_USERID,
    userId: userId
  }
}
