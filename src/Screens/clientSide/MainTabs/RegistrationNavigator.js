import { Navigation } from 'react-native-navigation';
const RegistrationNavigator = () => {
    Navigation.startSingleScreenApp({
        screen: {
            screen: 'RegistrationScreen', // unique ID registered with Navigation.registerScreen
            title: 'Enter Number', // title of the screen as appears in the nav bar (optional)
            navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
            navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
        },
        animationType: 'slide-down'
    });
}

export default RegistrationNavigator
