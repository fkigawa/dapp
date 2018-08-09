import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, AsyncStorage} from 'react-native';
import {connect} from 'react-redux'
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import homeNavigator from './MainTabs/HomeNavigator'
import deliveryNavigator from './MainTabs/DeliveryNavigator'
import logoutNavigator from './MainTabs/LogoutNavigator'
import {addingUserId, addingAccessToken, addingDeliverer} from "../../store/actions/products";
let urlLink = "http://localhost:1337";
let deliveryPortal;
var logoutButton;

class AccountScreen extends React.Component {

  // logoutPage = () => {
  //   logoutNavigator();
  // }

  getButton = () => {
    console.log(this.props.accessToken)
    if (this.props.accessToken) {
      console.log('in the if')
      logoutButton = <LoginButton onLogoutFinished={() => this.logout()} />;
      return logoutButton
    } else if (this.props.userId) {
      console.log('in the else if')
      logoutButton =  <Button title='logout' onPress={() => this.normalLogout()}/>
      return logoutButton;
    }
  }

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
      console.log('in function', this.props.isDeliverer);
      deliveryPortal = <Button title="Delivery Portal" onPress={() => deliveryNavigator()}/>
      return deliveryPortal
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Here's your Account boi</Text>
          {/* <Button title='to logout' onPress={() => this.logoutPage()}/> */}
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
});
