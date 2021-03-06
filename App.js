import React from "react";
import {Navigation} from "react-native-navigation"
import {Provider} from "react-redux"
import LoginScreen from './src/Screens/clientSide/LoginScreen';
import CategoryScreen from './src/Screens/clientSide/CategoryScreen';
import LogoutScreen from './src/Screens/clientSide/LogoutScreen';
import CartScreen from './src/Screens/clientSide/CartScreen';
import AccountScreen from './src/Screens/clientSide/AccountScreen';
import HomepageScreen from './src/Screens/clientSide/HomepageScreen';
import AddressScreen from './src/Screens/clientSide/AddressScreen';
import RegistrationScreen from './src/Screens/clientSide/RegistrationScreen';
import configureStore from "./src/store/configureStore"
import ProductsScreen from "./src/Screens/clientSide/ProductsScreen";
import CheckoutScreen from "./src/Screens/clientSide/CheckoutScreen";
import GeolocationScreen from "./src/Screens/clientSide/GeolocationScreen";
import ProductDetailScreen from "./src/Screens/clientSide/ProductDetailScreen";
import addProductsScreen from "./src/Screens/adminScreens/addProductsScreen"
import addDriverScreen from "./src/Screens/adminScreens/addDriverScreen"
import addCategoryScreen from "./src/Screens/adminScreens/addCategoryScreen"
import allOrdersScreen from "./src/Screens/adminScreens/allOrdersScreen"

export let urlLink = "https://46e5a70c.ngrok.io";

const store = configureStore();

Navigation.registerComponent('ProductDetailScreen', () => ProductDetailScreen,store,Provider);
Navigation.registerComponent('LoginScreen', () => LoginScreen,store,Provider);
Navigation.registerComponent("CategoryScreen", ()=> CategoryScreen,store,Provider);
Navigation.registerComponent('ProductsScreen', () => ProductsScreen,store,Provider);
Navigation.registerComponent('LogoutScreen', () => LogoutScreen,store,Provider);
Navigation.registerComponent('CartScreen', () => CartScreen,store,Provider);
Navigation.registerComponent('AddressScreen', () => AddressScreen ,store,Provider);
Navigation.registerComponent('AccountScreen', () => AccountScreen ,store,Provider);
Navigation.registerComponent('HomepageScreen', () => HomepageScreen ,store,Provider);
Navigation.registerComponent('RegistrationScreen', () => RegistrationScreen ,store,Provider);
Navigation.registerComponent('CheckoutScreen', () => CheckoutScreen ,store,Provider);
Navigation.registerComponent('GeolocationScreen', () => GeolocationScreen ,store,Provider);
Navigation.registerComponent('addProductsScreen', () => addProductsScreen,store,Provider)
Navigation.registerComponent('addDriverScreen', () => addDriverScreen,store,Provider)
Navigation.registerComponent('addCategoryScreen', () => addCategoryScreen,store,Provider)
Navigation.registerComponent('allOrdersScreen', () => allOrdersScreen,store,Provider)


Navigation.startSingleScreenApp({
    screen: {
        screen: 'HomepageScreen', // unique ID registered with Navigation.registerScreen
        title: 'Welcome', // title of the screen as appears in the nav bar (optional)
        navigatorStyle: {
          navBarHidden: true
        }, // override the navigator style for the screen, see "Styling the navigator" below (optional)
        navigatorButtons: {},
         // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
    },
    animationType: 'slide-down' // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
});

console.disableYellowBox = true;
