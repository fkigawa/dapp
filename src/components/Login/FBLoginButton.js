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
  Button,
} from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import startNavigator from '../../Screens/MainTabs/MainNavigator'

export default class FBLoginButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      loggedIn: false,
      checked: false,
      accessToken: ''
    })
  }

  getProductsScreen = () => {
    startNavigator();
  }

  saveToken = () => {
    AsyncStorage.setItem('accessToken', this.state.accessToken);
  }

  componentDidMount = async () => {
    try {
      let accessToken = await AsyncStorage.getItem('accessToken')
      if (accessToken) {
        this.setState({
          checked: true
        })
        this.getProductsScreen();
      }
    } catch (error) {
      console.log(error.message);
    }

  }

  render() {
    return (
      <View>
        {this.state.loggedIn ?
          <Text>Loading Shop...</Text>
          :
          this.state.checked ? <LoginButton
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
                          loggedIn: true,
                          accessToken: data.accessToken
                        }, () => {
                          console.log('got auth token; rerouting')
                          this.getProductsScreen()
                        })
                      this.saveToken()
                    }
                  )
                }
              }
            }
            onLogoutFinished={() => alert("Logged Out")}/>
            :
            null
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
