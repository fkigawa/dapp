import React, { Component } from 'react';
import {
  Platform,
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
import {changingEmail, changingFirstName, changingLastName, loggingIn, addingUserId, addingAccessToken, addingDeliverer} from "../../store/actions/products";
import {connect} from "react-redux"

// import Icon from 'react-native-vector-icons/Feather'
const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
} = FBSDK;
import {urlLink} from "../../../keys"


class FBLoginButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      loggedIn: false,
      accessToken: ''
    })
  }

  fbAuth = () => {
    LoginManager.logInWithReadPermissions(["public_profile", 'email']).then((result)=> {
        if(result.isCancelled){
          console.log('Login was cancelled...');
        } else {
          AccessToken.getCurrentAccessToken().then(
            (data) => {
              this.props.addingAccessToken(data.accessToken)
              this.setState({
                  loggedIn: true,
                  accessToken: data.accessToken
                }, () => {
                  fetch(`https://graph.facebook.com/v3.1/me?fields=id%2Cname%2Cemail&access_token=${this.state.accessToken}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    },
                  }).then((response) => {
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
                            lastName: lastName,
                            id: resp.id
                        })
                    }).then((response) => {
                        return response.json();
                    }).then((response) => {
                        console.log('this is the response', response)
                        this.props.changingFirstName(response.firstName)
                        this.props.changingLastName(response.lastName)
                        if (response.isDeliverer) {
                          this.props.addingDeliverer(response.isDeliverer)
                        }
                        this.getProductsScreen()
                    })
                  }).catch(err => console.log(err))
                })
              this.saveToken()
            }
          )
        }
      },
      function(error) {
        alert('Login failed with error: ' + error);
      }
    );
  }

  getProductsScreen = () => {
    startNavigator();
  }
  saveToken = () => {
    AsyncStorage.setItem('accessToken', this.state.accessToken);
  }

  try = () => {
    console.log(this.props.addingAccessToken)
  }

  componentDidMount = async () => {
    AccessToken.getCurrentAccessToken().then(
      async (data) => {
        if (data) {
          try {
            let accessToken = await AsyncStorage.getItem('accessToken');
            if (accessToken) {
              this.props.addingAccessToken(accessToken)
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
        <TouchableOpacity style={styles.touchable} onPress={this.fbAuth} activeOpacity={0.9}>
          <View style={styles.button}>
            <Text style={styles.text}>Continue with Facebook</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
};

const mapStateToProps = state => {
    return {
        firstName: state.root.firstName,
        lastName: state.root.lastName
    }
};

const mapDispatchToProps = dispatch => {
    return{
        addingAccessToken: (accessToken)=> dispatch(addingAccessToken(accessToken)),
        addingDeliverer: (isDeliverer)=> dispatch(addingDeliverer(isDeliverer)),
        changingFirstName: (firstName)=> dispatch(changingFirstName(firstName)),
        changingLastName: (lastName)=> dispatch(changingLastName(lastName))
    }
};

export default connect(null, mapDispatchToProps)(FBLoginButton)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "center",
    padding: 8,
    paddingRight: 40,
    paddingLeft: 40,
    borderRadius: 100,
    backgroundColor: "#3b5998",
    width: "90%",
    // shadowRadius: 10,
    // shadowOpacity: 0.8,
    // shadowOffset:{  width: -5,  height: 10,  },
    // shadowColor: 'black',
  },
  text: {
    marginLeft: 0,
    fontSize: 22,
    color: "white",
    fontFamily: "Avenir Next"
  },
  touchable: {
    marginTop: 100,
    marginBottom: 20,
    width: "100%",
    alignItems: "center"
  }
});
