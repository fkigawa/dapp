import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, AsyncStorage} from 'react-native';
import {connect} from 'react-redux'
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import homeNavigator from './MainTabs/HomeNavigator'
import {addingUserId, addingAccessToken} from "../../store/actions/products";
let urlLink = "http://localhost:1337";

var logoutButton;

class LogoutScreen extends React.Component {

  getButton = () => {

    if (this.props.accessToken) {

      logoutButton = <LoginButton onLogoutFinished={() => this.logout()} />;
      return logoutButton
    } else if (this.props.userId) {

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

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Logout Here</Text>
          {this.getButton()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return{
    userId: state.root.userId,
    cartItems: state.root.cartItems,
    accessToken: state.root.accessToken,
    userId: state.root.userId
  }
}

const mapDispatchToProps = dispatch => {
    return{
        addingAccessToken: (accessToken)=> dispatch(addingAccessToken(accessToken)),
        addingUserId: (userId) => dispatch(addingUserId(userId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoutScreen)

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
