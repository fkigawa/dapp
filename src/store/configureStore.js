import {createStore, combineReducers} from "redux";

import myRootReducer from "./reducers/root"

const rootReducer = combineReducers({
    root: myRootReducer
});

const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;