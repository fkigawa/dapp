import React from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableOpacity,TextInput} from 'react-native';
import FBLoginButton from '../../components/Login/FBLoginButton'
import RegistrationNavigator from "./MainTabs/RegistrationNavigator"
import LoginWithEmailNavigator from "./MainTabs/LoginWithEmailNavigator"
import categoryNavigator from "./MainTabs/CategoryNavigator";
import addProductNavigator from "../adminScreens/AdminTabs/AddProductNavigator"
import {changingEmail, changingFirstName, changingLastName, loggingIn, addingUserId, addingDeliverer} from "../../store/actions/products";
import {connect} from "react-redux"
let urlLink = "http://localhost:1337";

class LoginScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
        password: ""
    }
  }

  async componentDidMount () {
    let result = await fetch(`${urlLink}/user`, {
      headers: {
          "Content-Type": "application/json; charset=utf-8",
      },
      credentials: "include",
    });

    let json = await result.json()
    if (json.user) {
      this.props.addingUserId(json.user._id)
      if (json.user.isDeliverer) {
        this.props.addingDeliverer(json.user.isDeliverer)
      }

      categoryNavigator()
    }
  }

    onPhoneNumberButton(){
        RegistrationNavigator()
    }

    changeEmail(email){
    this.setState({email})
    }

    changePassword(password){
    this.setState({password})
    }

    isFilled(){
    return (!this.state.password || !this.state.email)
    }

    onSignIn() {
      if (this.state.email === 'admin' && this.state.password === 'adminpassword') {
        addProductNavigator()
        return true;
      }
      if (this.state.password && this.state.email) {
          fetch(`${urlLink}/login`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json; charset=utf-8",
              },
              credentials: "include",
              body: JSON.stringify({
                  username: this.state.email,
                  password: this.state.password
              })
          }).then((response) => {
              return response.json();
          })
              .then((response) => {
                  if (response.success === true) {
                    this.props.addingUserId(response.userId)
                    this.props.addingDeliverer(response.isDeliverer)
                  }
              })
              .then(() => {
                  categoryNavigator()
              })
              .catch((err) => {
                  console.log("The error is", err);
                  this.setState({error: true});
              })
      }
    }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Delivery!</Text>
        <FBLoginButton />
        <Button style={styles.button} onPress={()=>this.onPhoneNumberButton()} title="Sign up with Email"/>
        <Button onPress={()=>LoginWithEmailNavigator()} title="Already have an account? Sign in."/>



      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
    return{
        addingUserId: (userId)=> dispatch(addingUserId(userId)),
        addingDeliverer: (isDeliverer)=> dispatch(addingDeliverer(isDeliverer))
    }
};

export default connect(null, mapDispatchToProps)(LoginScreen)

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
        width: 189,
        margin: 10
    },
    text:{
      color: "white"
    },
    inputStyle:{
        borderWidth: 4,
        borderColor: "black",
        padding: 10,
        height: 40,
        width: "50%",
        alignItems: "center",
        flexDirection: "row",
        margin: 5
    },
    buttonSignIn:{
        backgroundColor: "#3b5998",
        alignItems: 'center',
        padding:5,
        height: 30,
        width: "90%",
        margin: 10
    },
    buttonSignInNotFilled:{
        backgroundColor: "gray",
        alignItems: 'center',
        padding:5,
        height: 30,
        width: "90%",
        margin: 10
    },
});
