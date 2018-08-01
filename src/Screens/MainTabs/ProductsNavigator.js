import { Navigation } from 'react-native-navigation';

const productsNavigator = () => {
  Navigation.startTabBasedApp({
    tabs: [
      {
        screen: 'ProductsScreen', // this is a registered name for a screen
        title: 'Products'
      },
      // {
      //   screen: 'CartScreen', // this is a registered name for a screen
      //   title: 'Cart'
      // },
    ]
  });
}

export default productsNavigator
