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

class AccountScreen extends React.Component {

  logoutPage = () => {
    logoutNavigator();
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
          <Button title='to logout' onPress={() => this.logoutPage()}/>
          {this.getDeliveryPortal()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return{
    isDeliverer: state.root.isDeliverer,
  }
}

const mapDispatchToProps = dispatch => {
    return{
        addingDeliverer: (isDeliverer)=> dispatch(addingDeliverer(isDeliverer)),
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
