import React from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableOpacity,TextInput} from 'react-native';
import FBLoginButton from '../../components/Login/FBLoginButton'
import RegistrationNavigator from "./MainTabs/RegistrationNavigator"


export default class LoginScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
        password: ""
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

    onSignIn(){

    }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Delivery!</Text>

          <TextInput style={styles.inputStyle} placeholder="Enter Email" value={this.state.email} onChangeText={(event)=>this.changeEmail(event)}/>
          <TextInput style={styles.inputStyle} placeholder="Enter Password" value={this.state.password} onChangeText={(event)=>this.changePassword(event)}/>

        <TouchableOpacity style={this.isFilled() ? styles.buttonSignInNotFilled : styles.buttonSignIn} disabled={this.isFilled()} onPress={()=>this.onSignIn()}><Text style={styles.text}>Sign in with Email</Text></TouchableOpacity>
          <Button style={styles.button} onPress={()=>this.onPhoneNumberButton()} title="Register with Email"/>

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
