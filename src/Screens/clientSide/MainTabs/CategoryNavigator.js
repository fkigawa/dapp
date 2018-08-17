import { Navigation } from 'react-native-navigation';

const categoryNavigator = () => {
    Navigation.startTabBasedApp({
        tabs: [
            {
                label: 'Browse',
                screen: 'CategoryScreen', // this is a registered name for a screen
                title: 'Browse'
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
};

export default categoryNavigator
