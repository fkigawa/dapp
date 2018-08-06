import {LOGGING_IN,CURRENT_CATEGORY,ADD_CART,CHANGE_LASTNAME,CHANGE_FIRSTNAME,CHANGE_EMAIL,ADD_USERID} from "../actions/actionTypes"


const initialState = {
    userLoggedIn : false,
    currentCategory: "",
    cartItems: [],
    email: "",
    firstName: "",
    lastName: "",
    userId: ""
};

const reducer = (state=initialState,action) => {
    switch (action.type){
        case LOGGING_IN:
            return {
                ...state,
                userLoggedIn: !state.userLoggedIn
            };
        case CURRENT_CATEGORY:
            return{
                ...state,
                currentCategory: action.category
            };
        case ADD_CART:
            let newArray = state.cartItems.slice();
            newArray.push(action.item);
            return{
                ...state,
                cartItems: newArray
            };
        case CHANGE_EMAIL:
            return{
                ...state,
                email: action.newEmail
            };
        case CHANGE_FIRSTNAME:
            return{
                ...state,
                firstName: action.newFirstName
            };
        case CHANGE_LASTNAME:
            return{
                ...state,
                lastName: action.newLastName
            };
        case ADD_USERID:
          return{
            ...state,
            userId: action.userId
          }
        default:
            return state;
    }
};

export default reducer;
