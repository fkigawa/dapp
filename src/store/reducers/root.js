import {LOGGING_IN,CURRENT_CATEGORY,ADD_CART} from "../actions/actionTypes"


const initialState = {
    userLoggedIn : false,
    currentCategory: "",
    cartItems: []
};

const reducer = (state=initialState,action) => {
    switch (action.type){
        case LOGGING_IN:
            return {
                ...state,
                userLoggedIn: true
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
        default:
            return state;
    }
};

export default reducer;