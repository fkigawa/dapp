import {registerScreens} from './src/Screens/index';
import {LoginScreen} from './src/Screens/LoginScreen';
import {CategoryScreen} from './src/Screens/CategoryScreen';
import {CartScreen} from './src/Screens/CartScreen';
import {AccountScreen} from './src/Screens/AccountScreen';
import React from "react"
import Provider from "react-redux";
import {AppRegistry} from "react-native"
import App from "./App"

import configureStore from "./src/store/configureStore"
const store = configureStore();

const RNRedux = () => (
    <Provider store={store}>
      <App />
    </Provider>
);
AppRegistry.registerComponent("dapp", () => RNRedux);
// const mapStateToProps = state => {
//   return {
//       userLoggedIn : state.root.userLoggedIn,
//       clickedCategory: state.root.clickedCategory,
//       cartItems: state.root.cartItems
//   }
// };
//
// const mapDispatchToProps = dispatch => {
//   return {
//     onAddPlace: (name) => dispatch(addPlace()),
//     onDeletePlace: ()=> dispatch(deletePlace()),
//       onSelectPlace: (key) => dispatch(selectPlace(key)),
//       onDeselectPlace: () => dispatch(deselectPlace())
// };
// };
//
// export default connect(mapStateToProps,mapDispatchToProps)(LoginScreen)
//
// const RNRedux = ()=> (
//     <Provider store={store}>
//
//     </Provider>
// );

// this is where you register all of your app's screens

// start the app


