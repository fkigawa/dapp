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
import startNavigator from '../../Screens/clientSide/MainTabs/MainNavigator';
let urlLink = "http://localhost:1337";


export default class FBLoginButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      loggedIn: false,
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
    AccessToken.getCurrentAccessToken().then(
      async (data) => {
        if (data) {
          try {
            let accessToken = await AsyncStorage.getItem('accessToken');
            if (accessToken) {
              this.getProductsScreen();
            }
          } catch (error) {
            console.log("ERRORRR!!!!!!!",error.message);
          }
        }
      }
    )
  }

  componentWillUnmount = () => {
    this.setState({
      accessToken: ''
    })
  }

  render() {
    return (
      <View>
        {this.state.loggedIn ?
          <Text>Loading Shop...</Text>
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
                          loggedIn: true,
                          accessToken: data.accessToken
                        }, () => {
                          console.log('got auth token; rerouting')
                          fetch(`https://graph.facebook.com/v3.1/me?fields=id%2Cname%2Cemail&access_token=${this.state.accessToken}`, {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json; charset=utf-8",
                            },
                          }).then((response) => {
                              console.log(response);
                              return response.json();
                          }).then((resp) => {
                            var nameArray = resp.name.split(' ')
                            var firstName = nameArray[0];
                            var lastName;
                            if (nameArray[2]) {
                              lastName = nameArray[2]
                            } else {
                              lastName = nameArray[1]
                            }
                            fetch(`${urlLink}/facebookLogin`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json; charset=utf-8",
                                },
                                credentials: "include",
                                body: JSON.stringify({
                                    email: resp.email,
                                    firstName: firstName,
                                    lastName: lastName
                                })
                            }).then((response) => {
                                return response.json();
                            }).then((response) => {
                                this.getProductsScreen()
                            })
                          }).catch(err => console.log(err))
                        })
                      this.saveToken()
                    }
                  )
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
