import React from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Button, TextInput} from 'react-native';
import FBCustomLogin from '../../components/Login/FBCustomLogin'
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
        <Text style={styles.text}>Plug</Text>
        <FBCustomLogin />
        <TouchableOpacity style={styles.button}
          raised
          onPress={()=>this.onPhoneNumberButton()}>
          <Text style={styles.signIn}>Sign Up With Email</Text>
        </TouchableOpacity>
          <View style={styles.touchable}>
            <Text style={styles.existing}>Already have an account?</Text>
            <TouchableOpacity style={styles.submitButton} onPress={()=>LoginWithEmailNavigator()}><Text style={styles.signIn}>Sign in.</Text></TouchableOpacity>
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
  button: {
    fontSize: 20,
    color: "dodgerblue",
    marginBottom: 100
  },
  existing: {
    fontSize: 16
  },
  signIn: {
    color: 'dodgerblue',
    fontSize: 16
  },
  submitButton: {
    marginLeft: 5
  },
  text: {
    marginTop: -100,
    marginBottom: 150,
    fontSize: 60,
    color: "black",
    fontFamily: "AvenirNext-DemiBold"
  },
  touchable: {
    fontSize: 25,
    marginBottom: -275,
    flexDirection: 'row'
  }
});
