import {LOGGING_IN,CURRENT_CATEGORY,ADD_CART} from "./actionTypes"
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

