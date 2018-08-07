import { Navigation } from 'react-native-navigation';

const checkoutNavigator = () => {
  Navigation.startSingleScreenApp({
      screen: {
          screen: 'CheckoutScreen', // unique ID registered with Navigation.registerScreen
          title: 'Checkout', // title of the screen as appears in the nav bar (optional)
          navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
          navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
      },
      animationType: 'slide-down' // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
  });

};

export default checkoutNavigator
