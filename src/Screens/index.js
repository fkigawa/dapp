import { Navigation } from 'react-native-navigation';

import LoginScreen from './LoginScreen';
import Provider from "react-redux";
import CategoryScreen from "./CategoryScreen"
import ProductsScreen from './ProductsScreen'
import CartScreen from './CartScreen'
import AccountScreen from './AccountScreen'
import configureStore from "../store/configureStore"
const store = configureStore();

export function registerScreens() {
  Navigation.registerComponent('LoginScreen', () => LoginScreen);
  Navigation.registerComponent("CategoryScreen", ()=>CategoryScreen)
  Navigation.registerComponent('ProductsScreen', () => ProductsScreen);
  Navigation.registerComponent('CartScreen', () => CartScreen);
  Navigation.registerComponent('AccountScreen', () => AccountScreen);
}
