import { Navigation } from 'react-native-navigation';
const RegistrationNavigator = () => {
    Navigation.startSingleScreenApp({
        screen: {
            screen: 'RegistrationScreen', // unique ID registered with Navigation.registerScreen
            title: 'Enter Number', // title of the screen as appears in the nav bar (optional)
        },
    });
}

export default RegistrationNavigator
