import {createStore, combineReducers, compose} from "redux";

import reducer from "./reducers/root"

const rootReducer = combineReducers({
    root: reducer
});

// const configureStore = () => {
//   return createStore(rootReducer);
// };


let composeEnhancers = compose;
if(__DEV__){
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
const configureStore = () => {
  return createStore(rootReducer, composeEnhancers());
};

export default configureStore;