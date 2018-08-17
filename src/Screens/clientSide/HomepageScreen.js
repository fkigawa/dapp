import React from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Button, TextInput, Image} from 'react-native';
import FBCustomLogin from '../../components/Login/FBCustomLogin'
import FBLoginButton from '../../components/Login/FBLoginButton'
import RegistrationNavigator from "./MainTabs/RegistrationNavigator"
import LoginWithEmailNavigator from "./MainTabs/LoginWithEmailNavigator"
import categoryNavigator from "./MainTabs/CategoryNavigator";
import addProductNavigator from "../adminScreens/AdminTabs/AddProductNavigator"
import {changingEmail, changingFirstName, changingLastName, loggingIn, addingUserId, addingDeliverer} from "../../store/actions/products";
import {connect} from "react-redux"
import {urlLink} from "../../../keys"
import SplashScreen from 'react-native-splash-screen'
import logo from '../../assets/Plug.png'

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
      console.log(json.user)
      this.props.changingFirstName(json.user.firstName);
      this.props.changingLastName(json.user.lastName);
      this.props.addingUserId(json.user._id)
      if (json.user.isDeliverer) {
        this.props.addingDeliverer(json.user.isDeliverer)
      }

      categoryNavigator()
    }
    SplashScreen.hide();
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
        <View style={styles.imageView}>
          <Image
            style={[{width: 300, height: 100}]}
            source={logo}
            resizeMode={'contain'}
          />
        </View>

        {/* <Text style={styles.text}>Plug</Text> */}
        <View style={styles.loginView}>
        <FBCustomLogin />
        <TouchableOpacity style={styles.button}
          raised
          onPress={()=>this.props.navigator.showModal({
            screen: "RegistrationScreen", // unique ID registered with Navigation.registerScreen
            title: "Login", // title of the screen as appears in the nav bar (optional)
            passProps: {}, // simple serializable object that will pass as props to the modal (optional)
            navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
            animationType: 'slide-up' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
          })
          }>
          <Text style={styles.signIn}>Sign Up With Email</Text>
        </TouchableOpacity>
          <View style={styles.touchable}>
            <Text style={styles.existing}>Already have an account?</Text>
            <TouchableOpacity style={styles.submitButton} onPress={()=>this.props.navigator.showModal({
              screen: "LoginScreen", // unique ID registered with Navigation.registerScreen
              title: "Login", // title of the screen as appears in the nav bar (optional)
              passProps: {}, // simple serializable object that will pass as props to the modal (optional)
              navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
              animationType: 'slide-up' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
            })
          }><Text style={styles.signInBottom}>Sign in.</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
    return{
        addingUserId: (userId)=> dispatch(addingUserId(userId)),
        addingDeliverer: (isDeliverer)=> dispatch(addingDeliverer(isDeliverer)),
        changingFirstName: (firstName)=> dispatch(changingFirstName(firstName)),
        changingLastName: (lastName)=> dispatch(changingLastName(lastName))
    }
};

export default connect(null, mapDispatchToProps)(LoginScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    fontSize: 20,
    color: "dodgerblue",
    fontFamily: "AvenirNext-DemiBold",
  },
  existing: {
    fontSize: 16
  },
  signIn: {
    color: 'dodgerblue',
    fontSize: 16,
    fontFamily: "AvenirNext-DemiBold",
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 2,
    textAlign: 'center'
  },
  signInBottom: {
    color: 'dodgerblue',
    fontSize: 16,
    fontFamily: "AvenirNext-DemiBold",
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 2
  },
  submitButton: {
    marginLeft: 5
  },
  text: {
    fontSize: 60,
    color: "black",
    fontFamily: "AvenirNext-DemiBold"
  },
  touchable: {
    flex: 1,
    fontSize: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },
  loginView: {
    flex: 2,
    // borderWidth: 2
  },
  imageView: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
