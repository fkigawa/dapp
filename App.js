import React from "react";
import {Navigation} from "react-native-navigation"
import {Provider} from "react-redux"
import LoginScreen from './src/Screens/LoginScreen';
import CategoryScreen from './src/Screens/CategoryScreen';
import CartScreen from './src/Screens/CartScreen';
import AccountScreen from './src/Screens/AccountScreen';
import configureStore from "./src/store/configureStore"
import ProductsScreen from "./src/Screens/ProductsScreen";
const store = configureStore();

Navigation.registerComponent('LoginScreen', () => LoginScreen,store,Provider);
Navigation.registerComponent("CategoryScreen", ()=> CategoryScreen,store,Provider);
Navigation.registerComponent('ProductsScreen', () => ProductsScreen,store,Provider);
Navigation.registerComponent('CartScreen', () => CartScreen,store,Provider);
Navigation.registerComponent('AccountScreen', () => AccountScreen ,store,Provider);

Navigation.startSingleScreenApp({
    screen: {
        screen: 'LoginScreen', // unique ID registered with Navigation.registerScreen
        title: 'Welcome', // title of the screen as appears in the nav bar (optional)
        navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
        navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
    },
    animationType: 'slide-down' // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
});