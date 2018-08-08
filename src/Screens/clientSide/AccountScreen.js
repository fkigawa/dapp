import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, AsyncStorage} from 'react-native';
import {connect} from 'react-redux'
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import homeNavigator from './MainTabs/HomeNavigator'
import {addingUserId} from "../../store/actions/products";
let urlLink = "http://localhost:1337";

class AccountScreen extends React.Component {

  logout = () => {
    homeNavigator();
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
        <Text style={styles.welcome}>Here's your Account boi</Text>
        {/* {this.props.addingUserId ? */}
          <Button title='logout' onPress={() => this.normalLogout()}/>
          {/* // : */}
          <LoginButton onLogoutFinished={() => this.logout()} />
        {/* // } */}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return{
    userId: state.root.userId,
    cartItems: state.root.cartItems
  }
}

const mapDispatchToProps = dispatch => {
    return{
        addingUserId: ()=> dispatch(addingUserId()),
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
