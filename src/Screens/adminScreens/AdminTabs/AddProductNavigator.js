import { Navigation } from 'react-native-navigation';

const addProductNavigator = () => {
    Navigation.startTabBasedApp({
        tabs: [
            {
                label: '+Category',
                screen: 'addCategoryScreen',
                title: 'Add Category'
            },
            {
                label: '+Products',
                screen: 'addProductsScreen', // this is a registered name for a screen
                title: 'Add Products'
            },
            {
                label: '+Driver',
                screen: 'addDriverScreen', // this is a registered name for a screen
                title: 'Add Driver'
            },
            {
                label: 'Orders',
                screen: 'allOrdersScreen',
                title: 'All Orders'
            },
        ],
        tabsStyle: {
            tabBarTextFontSize: 20,
            navBarComponentAlignment: 'center'
        },
    });
};

export default addProductNavigator
