import {LOGGING_IN,CURRENT_CATEGORY,ADD_CART} from "../actions/actionTypes"


const initialState = {
    userLoggedIn : false,
    currentCategory: "",
    cartItems: ["Fruit", "Drinks", "Cups"]
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
            return{
                ...state,
                cartItems: state.cartItems.push(action.item)
            };
        default:
            return state;
    }
};

export default reducer;