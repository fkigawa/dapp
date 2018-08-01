import { Navigation } from 'react-native-navigation';

const productsNavigator = () => {
  console.log('Navigation.startTabBasedApp PRODUCTS')
  Navigation.startTabBasedApp({
    tabs: [
      {
        label: 'Categories',
        screen: 'ProductsScreen', // this is a registered name for a screen
        title: 'Products'
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

export default productsNavigator
