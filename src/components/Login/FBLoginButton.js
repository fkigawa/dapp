import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ListView,
  Alert,
  Button
} from 'react-native';
import { LoginButton } from 'react-native-fbsdk';

export default class FBLoginButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <LoginButton
          readPermissions={["public_profile", 'email']}
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("login has error: " + result.error);
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
              } else {
                
              }
            }
          }
          onLogoutFinished={() => alert("Logged Out")}/>
      </View>
    );
  }
};

module.exports = FBLoginButton;
