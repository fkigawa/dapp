import { Navigation } from 'react-native-navigation';

const productsDetailNavigator = () => {
    console.log('Navigation.startTabBasedApp PRODUCTS DETAIL')
    Navigation.startTabBasedApp({
        tabs: [
            {
                label: 'Categories',
                screen: 'ProductDetailScreen', // this is a registered name for a screen
                title: 'Product Details'
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

export default productsDetailNavigator
