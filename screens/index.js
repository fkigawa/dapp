import { Navigation } from 'react-native-navigation';

import LoginScreen from './LoginScreen';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('LoginScreen', () => LoginScreen);
}
