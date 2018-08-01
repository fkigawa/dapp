import { Navigation } from 'react-native-navigation';
import {registerScreens} from './src/Screens/index';
import {LoginScreen} from './src/Screens/LoginScreen';
import {CategoryScreen} from './src/Screens/CategoryScreen';

registerScreens(); // this is where you register all of your app's screens

// start the app
Navigation.startTabBasedApp({
  tabs: [
    {
      label: 'One',
      screen: 'LoginScreen', // this is a registered name for a screen
      title: 'Products'
    },
  ]
});
