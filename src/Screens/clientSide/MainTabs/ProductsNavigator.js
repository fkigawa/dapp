import { Navigation } from 'react-native-navigation';
import React from "react"
import {TouchableOpacity,View,Text,StyleSheet} from "react-native"
import Icon from "react-native-vector-icons/Feather"

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

// Our custom component we want as a button in the nav bar
const CustomButton = () =>

        <View style={styles.button}>
<Icon name={"arrow-left"} size={25}/>
        </View>;

Navigation.registerComponent('CustomButton', () => CustomButton);
const productsNavigator = (name) => {
  console.log('Navigation.startTabBasedApp PRODUCTS')
  Navigation.startTabBasedApp({
    tabs: [
      {
        label: 'Categories',
        screen: 'ProductsScreen', // this is a registered name for a screen
        title: name,
          // navigatorButtons:{
          //     leftButtons: [
          //         {
          //             id: 'custom-button',
          //             component: 'CustomButton', // This line loads our component as a nav bar button item
          //         },
          //     ],
          // },
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

export default productsNavigator
