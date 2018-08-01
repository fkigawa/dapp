import { Navigation } from 'react-native-navigation';

import LoginScreen from './LoginScreen';

import CategoryScreen from "./CategoryScreen"
import ProductsScreen from './ProductsScreen'
import CartScreen from './CartScreen'

export function registerScreens() {
  Navigation.registerComponent('LoginScreen', () => LoginScreen);
  Navigation.registerComponent("CategoryScreen", ()=>CategoryScreen)
  Navigation.registerComponent('ProductsScreen', () => ProductsScreen);
  Navigation.registerComponent('CartScreen', () => CartScreen);
}
