
import {LOGGING_IN,CURRENT_CATEGORY,ADD_CART,CHANGE_LASTNAME,CHANGE_FIRSTNAME,CHANGE_EMAIL,ADD_USERID,FB_ACCESS_TOKEN,DELIVERER,CURRENT_PRODUCT,CHANGE_QUANTITY,INITIALIZE_PRODUCTS,EMPTY_CART} from "../actions/actionTypes"


const initialState = {
    userLoggedIn : false,
    currentCategory: "",
    cartItems: [],
    email: "",
    firstName: "",
    lastName: "",
    userId: "",
    accessToken: "",
    isDeliverer: "",
    currentProduct: "",
    productList: [],
    productQuantity:{}
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
            let isInCart = false;
            newArray.map((cartItem,i)=>{
                if(cartItem.name === action.item.name){
                    isInCart = true;
                    cartItem.quantity = action.item.quantity;
                }
            });
            if(!isInCart){
                newArray.push(action.item);
            }
            return{
                ...state,
                cartItems: newArray
            };
        case EMPTY_CART:
            let emptyArray = [];
            return{
                ...state,
                cartItems: emptyArray
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
          };
        case FB_ACCESS_TOKEN:
          return{
            ...state,
            accessToken: action.accessToken
          };
        case DELIVERER:
          return{
            ...state,
            isDeliverer: action.isDeliverer
        };
        case CURRENT_PRODUCT:
          return{
            ...state,
            currentProduct: action.product
          };
        case CHANGE_QUANTITY:
            console.log("Went inside");
            let objectCopy = {...state.productQuantity};
            for (let key in objectCopy)
            {
                if(key===action.name){
                    objectCopy[key] = action.quantity;
                    break;
                }
                objectCopy[action.name] = action.quantity
            }
            console.log("Object Copy", objectCopy);
            return{
                ...state,
                productQuantity: objectCopy
            };

        case INITIALIZE_PRODUCTS:
            let myObjectCopy = {...state.productQuantity};
            myObjectCopy[action.name] = 0;
            return {
                ...state,
                productQuantity: myObjectCopy
            };
        default:
            return state;
    }
};

export default reducer;
