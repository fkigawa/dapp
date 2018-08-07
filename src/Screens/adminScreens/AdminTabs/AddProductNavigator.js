import { Navigation } from 'react-native-navigation';

const addProductNavigator = () => {
    Navigation.startTabBasedApp({
        tabs: [
            {
                label: 'Add Category',
                screen: 'addCategoryScreen',
                title: 'Add Category'
            },
            {
                label: 'Add Products',
                screen: 'addProductsScreen', // this is a registered name for a screen
                title: 'Add Products'
            },
            {
                label: 'All Orders',
                screen: 'allOrdersScreen',
                title: 'All Orders'
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

export default addProductNavigator
