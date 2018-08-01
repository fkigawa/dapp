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
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import startNavigator from '../../Screens/MainTabs/MainNavigator'

export default class FBLoginButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      loggedIn: false,
      accessToken: ''
    })
  }

  componentDidMount() {
    console.log('is it logged?', result)
  }

  getProductsScreen = () => {
    startNavigator();
  }

  render() {
    return (
      <View>
        {this.state.loggedIn ?
          <Button onPress={() => this.getProductsScreen()} title='Shop!'/>
          :
          <LoginButton
            readPermissions={["public_profile", 'email']}
            onLoginFinished={
              (error, result) => {
                if (error) {
                  console.log("login has error: " + result.error);
                } else if (result.isCancelled) {
                  console.log("login is cancelled.");
                } else if (result.grantedPermissions){
                  AccessToken.getCurrentAccessToken().then(
                    (data) => {
                      this.setState({
                        accessToken: data
                      })
                    }
                  )
                  this.setState({
                    loggedIn: true
                  })
                }
              }
            }
            onLogoutFinished={() => alert("Logged Out")}/>
        }
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    justifyContent: 'center',
    textAlign: 'center',
    margin: 10,
  },
});

module.exports = FBLoginButton;
