import { Navigation } from 'react-native-navigation';

const startNavigator = () => {
  Navigation.startTabBasedApp({
    tabs: [
      {
        label: 'Categories',
        screen: 'CategoryScreen', // this is a registered name for a screen
        title: 'Categories'
      },
      {
        label: 'Cart',
        screen: 'CartScreen',
        title: 'Cart'
      },
      {
        label: 'My Account',
        screen: 'AccountScreen',
        title: 'My Account'
      }
    ],
    tabsStyle: {
      tabBarTextFontSize: 20,
      navBarComponentAlignment: 'center'
    },
  });
}

export default startNavigator
