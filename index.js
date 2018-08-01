import { Navigation } from 'react-native-navigation';
import {registerScreens} from './src/Screens/index';
import {LoginScreen} from './src/Screens/LoginScreen';
import {CategoryScreen} from './src/Screens/CategoryScreen';
import {CartScreen} from './src/Screens/CartScreen';
import {AccountScreen} from './src/Screens/AccountScreen';
import React from "react"
import Provider from "react-redux";
import configureStore from "./src/store/configureStore"
import {connect} from "react-redux"
import {addPlace,deselectPlace,deletePlace,selectPlace} from "./src/store/actions/index"
const store = configureStore();


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



registerScreens(); // this is where you register all of your app's screens

// start the app

// Navigation.startSingleScreenApp({
//   screen: {
//     screen: 'LoginScreen', // unique ID registered with Navigation.registerScreen
//     title: 'Welcome', // title of the screen as appears in the nav bar (optional)
//     navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
//     navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
//   },
//   animationType: 'slide-down' // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
// });
Navigation.startSingleScreenApp({
  screen: {
    screen: 'CategoryScreen', // unique ID registered with Navigation.registerScreen
    title: 'Welcome', // title of the screen as appears in the nav bar (optional)
    navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
    navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
  },
  animationType: 'slide-down' // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
});
