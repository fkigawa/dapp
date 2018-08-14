import React from 'react';
// import {Platform, StyleSheet, Text, View, Button, TouchableOpacity,TextInput} from 'react-native';
import {View, TextInput, Text, Button, TouchableOpacity} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';
import FBLoginButton from '../../components/Login/FBLoginButton'
import RegistrationNavigator from "./MainTabs/RegistrationNavigator"
import categoryNavigator from "./MainTabs/CategoryNavigator";
import homeNavigator from "./MainTabs/HomeNavigator";
import addProductNavigator from "../adminScreens/AdminTabs/AddProductNavigator"
import {changingEmail, changingFirstName, changingLastName, loggingIn, addingUserId, addingDeliverer} from "../../store/actions/products";
import {connect} from "react-redux"
import Icon from 'react-native-vector-icons/Feather';
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
      <View flex paddingH-25 paddingT-120>
        <Icon style={styles.icon} name="x" onPress={() => homeNavigator()}></Icon>
        <TextInput text50 autoCapitalize='none' placeholder="email" value={this.state.email} onChangeText={(event)=>this.changeEmail(event)} dark10/>
        <TextInput text50  autoCapitalize='none' secureTextEntry={true} placeholder="password" value={this.state.password} onChangeText={(event)=>this.changePassword(event)} secureTextEntry dark10/>
        <View marginT-270 center>
          <Button text70 white background-orange30 disabled={this.isFilled()} onPress={()=>this.onSignIn()} label="Login"/>
        </View>
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
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 40,
    marginBottom: 70,
    marginTop: -70
  }
});
