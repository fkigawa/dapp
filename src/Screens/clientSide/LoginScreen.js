import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import FBLoginButton from '../../components/Login/FBLoginButton'
import RegistrationNavigator from "./MainTabs/RegistrationNavigator"
export default class LoginScreen extends React.Component {
    onPhoneNumberButton(){
        RegistrationNavigator()
    }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Delivery!</Text>
          <TouchableOpacity style={styles.button} onPress={()=>this.onPhoneNumberButton()}><Text style={styles.text}>Enter Phone Number</Text></TouchableOpacity>
          <Text>OR</Text>
        <FBLoginButton />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
    button:{
      backgroundColor: "#3b5998",
        alignItems: 'center',
        padding:5,
        height: 30,
        width: 189
    },
    text:{
      color: "white"
    }
});
