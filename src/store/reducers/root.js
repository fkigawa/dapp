import {ADD_PLACE,DELETE_PLACE,DESELECT_PLACE,SELECT_PLACE} from "../actions/actionTypes"

const initialState = {
    userLoggedIn : false,
    clickedCategory: false,
    cartItems: []
};

const reducer = (state=initialState,action) => {
    switch (action.type){
        case ADD_PLACE:
            return {
                ...state
            };
        default:
            return state;
    }
};

export default reducer;