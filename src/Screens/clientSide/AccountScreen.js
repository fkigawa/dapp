import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, AsyncStorage} from 'react-native';
import {connect} from 'react-redux'
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import homeNavigator from './MainTabs/HomeNavigator'
import addressNavigator from './MainTabs/AddressNavigator'
import deliveryNavigator from './MainTabs/DeliveryNavigator'
import logoutNavigator from './MainTabs/LogoutNavigator'
import {addingUserId, addingAccessToken, addingDeliverer} from "../../store/actions/products";
let urlLink = "http://localhost:1337";
let deliveryPortal;
var logoutButton;
const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
} = FBSDK;

class AccountScreen extends React.Component {

  payment = () => {
    logoutNavigator();
  }

  address = () => {
    addressNavigator();
  }

  getButton = () => {
    if (this.props.accessToken) {
      logoutButton =
        <LoginButton onLogoutFinished={() => this.logout()} />;
      return logoutButton
    } else if (this.props.userId) {
      logoutButton =  <Button title='logout' onPress={() => this.normalLogout()}/>
      return logoutButton;
    }
  };

  logout = () => {
    this.props.addingAccessToken('')
    fetch(`${urlLink}/logout`)
    .then((response) => {
        return response.json();
    })
    .then((resp) => {
      homeNavigator();
    })
  }

  normalLogout = () => {
    this.props.addingUserId('');
    fetch(`${urlLink}/logout`)
    .then((response) => {
        return response.json();
    })
    .then((resp) => {
      homeNavigator();
    })
  }


  getDeliveryPortal = () => {
    if (this.props.isDeliverer) {
      deliveryPortal = <Button title="Delivery Portal" onPress={() => deliveryNavigator()}/>
      return deliveryPortal
    }
  };

  render() {
    return (
      <View style={styles.container}>
          <Button title="Payment" onPress={()=>this.props.navigator.showModal({
            screen: "LogoutScreen", // unique ID registered with Navigation.registerScreen
            title: "Payment", // title of the screen as appears in the nav bar (optional)
            passProps: {}, // simple serializable object that will pass as props to the modal (optional)
            navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
            animationType: 'slide-up' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
          })
          }/>
          <Button title="Addresses" onPress={()=>this.props.navigator.showModal({
            screen: "LogoutScreen", // unique ID registered with Navigation.registerScreen
            title: "Addresses", // title of the screen as appears in the nav bar (optional)
            passProps: {}, // simple serializable object that will pass as props to the modal (optional)
            navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
            animationType: 'slide-up' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
          })
          }/>
          {this.getButton()}
          {this.getDeliveryPortal()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return{
    isDeliverer: state.root.isDeliverer,
    userId: state.root.userId,
    cartItems: state.root.cartItems,
    accessToken: state.root.accessToken,
    userId: state.root.userId
  }
}

const mapDispatchToProps = dispatch => {
    return{
        addingDeliverer: (isDeliverer)=> dispatch(addingDeliverer(isDeliverer)),
        addingAccessToken: (accessToken)=> dispatch(addingAccessToken(accessToken)),
        addingUserId: (userId) => dispatch(addingUserId(userId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  logout: {
    margin: 470,
  }
});
