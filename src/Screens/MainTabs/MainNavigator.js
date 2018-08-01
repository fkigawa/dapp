import { Navigation } from 'react-native-navigation';

const startNavigator = () => {
  Navigation.startTabBasedApp({
    tabs: [
      {
        label: 'One',
        screen: 'ProductsScreen', // this is a registered name for a screen
        title: 'Categories'
      },
    ]
  });
}

export default startNavigator
