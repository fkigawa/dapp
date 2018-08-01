import { Navigation } from 'react-native-navigation';

import LoginScreen from './LoginScreen';
import ProductsScreen from './ProductsScreen'

export function registerScreens() {
  Navigation.registerComponent('LoginScreen', () => LoginScreen);
  Navigation.registerComponent('ProductsScreen', () => ProductsScreen);
}
