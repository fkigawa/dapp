import { Navigation } from 'react-native-navigation';
const LoginWithEmailNavigator = () => {
    Navigation.startSingleScreenApp({
        screen: {
            screen: 'LoginScreen', // unique ID registered with Navigation.registerScreen
            title: 'Enter Number', // title of the screen as appears in the nav bar (optional)
        },
    });
}

export default LoginWithEmailNavigator
