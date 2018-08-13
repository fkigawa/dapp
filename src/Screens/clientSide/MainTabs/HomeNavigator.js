import { Navigation } from 'react-native-navigation';
const homeNavigator = () => {
  Navigation.startSingleScreenApp({
      screen: {
          screen: 'HomepageScreen', // unique ID registered with Navigation.registerScreen
          title: 'Welcome', // title of the screen as appears in the nav bar (optional)
      },
  });
};

export default homeNavigator
