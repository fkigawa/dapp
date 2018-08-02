import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, AsyncStorage} from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import homeNavigator from './MainTabs/HomeNavigator'

export default class AccountScreen extends React.Component {

  logout = () => {
    homeNavigator();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Here's your Account boi</Text>
        <LoginButton onLogoutFinished={() => this.logout()} />
      </View>
    );
  }
}

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