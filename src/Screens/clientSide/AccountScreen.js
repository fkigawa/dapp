import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, AsyncStorage, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux'
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import homeNavigator from './MainTabs/HomeNavigator'
import addressNavigator from './MainTabs/AddressNavigator'
import deliveryNavigator from './MainTabs/DeliveryNavigator'
import logoutNavigator from './MainTabs/LogoutNavigator'
import {addingUserId, addingAccessToken, addingDeliverer, changingFirstName, changingLastName} from "../../store/actions/products";
import {urlLink} from "../../../keys";
let deliveryPortal;
var logoutButton;
const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
} = FBSDK;

class AccountScreen extends React.Component {

  payment = () => {
    logoutNavigator();
  };

  address = () => {
    addressNavigator();
  };

  fbAuth = () => {
    LoginManager.logOut();
    this.props.addingAccessToken('')
    fetch(`${urlLink}/logout`)
    .then((response) => {
        return response.json();
    })
    .then((resp) => {
      homeNavigator();
    })
  }

  getButton = () => {
    if (this.props.accessToken) {
      logoutButton =  <TouchableOpacity style={styles.touchable} onPress={this.fbAuth} activeOpacity={0.9}>
          <View style={styles.button}>
            <Text style={styles.text}>Logout</Text>
          </View>
        </TouchableOpacity>
        {/* <LoginButton onLogoutFinished={() => this.logout()} /> */}
      return logoutButton
    } else if (this.props.userId) {
      logoutButton =  <TouchableOpacity style={styles.touchable} onPress={this.normalLogout} activeOpacity={0.9}>
          <View style={styles.button}>
            <Text style={styles.text}>Logout</Text>
          </View>
        </TouchableOpacity>
      return logoutButton;
    }
  };

  normalLogout = () => {
    this.props.addingUserId('');
    fetch(`${urlLink}/logout`)
    .then((response) => {
        return response.json();
    })
    .then((resp) => {
      homeNavigator();
    })
  }


  getDeliveryPortal = () => {
    if (this.props.isDeliverer) {
      deliveryPortal = <TouchableOpacity style={styles.delivery} onPress={()=>this.props.navigator.showModal({
        screen: "allOrdersScreen", // unique ID registered with Navigation.registerScreen
        title: "All Orders", // title of the screen as appears in the nav bar (optional)
        passProps: {}, // simple serializable object that will pass as props to the modal (optional)
        navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
        animationType: 'slide-up' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
      })
      } activeOpacity={0.9}>
          <View style={styles.buttonDelivery}>
            <Text style={styles.textDelivery}>Delivery Portal</Text>
          </View>
        </TouchableOpacity>
      return deliveryPortal
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.nameHolder}>
          <Text style={styles.text2}>{this.props.firstName + " " + this.props.lastName}</Text>
        </View>
          {/* <TextInput text50
            autoCapitalize='none'
            placeholder={this.props.firstName + " " + this.props.lastName}
            value={this.state.fullName}
            onChangeText={(event)=>this.changeName(event)} dark10/> */}
          {/* <Button title="Payment" onPress={()=>this.props.navigator.showModal({
            screen: "LogoutScreen", // unique ID registered with Navigation.registerScreen
            title: "Payment", // title of the screen as appears in the nav bar (optional)
            passProps: {}, // simple serializable object that will pass as props to the modal (optional)
            navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
            animationType: 'slide-up' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
          })
          }/>
          <Button title="Addresses" onPress={()=>this.props.navigator.showModal({
            screen: "AddressScreen", // unique ID registered with Navigation.registerScreen
            title: "Addresses", // title of the screen as appears in the nav bar (optional)
            passProps: {}, // simple serializable object that will pass as props to the modal (optional)
            navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
            animationType: 'slide-up' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
          })
          }/> */}
          {this.getDeliveryPortal()}
          {this.getButton()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return{
    isDeliverer: state.root.isDeliverer,
    userId: state.root.userId,
    cartItems: state.root.cartItems,
    accessToken: state.root.accessToken,
    userId: state.root.userId,
    firstName: state.root.firstName,
    lastName: state.root.lastName
  }
}

const mapDispatchToProps = dispatch => {
    return{
        addingDeliverer: (isDeliverer)=> dispatch(addingDeliverer(isDeliverer)),
        addingAccessToken: (accessToken)=> dispatch(addingAccessToken(accessToken)),
        addingUserId: (userId) => dispatch(addingUserId(userId)),
        changingFirstName: (firstName) => dispatch(changingFirstName(firstName)),
        changingLastName: (lastName) => dispatch(changingLastName(lastName)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  logout: {
    flex: 3
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
  buttonDelivery: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    paddingRight: 40,
    paddingLeft: 40,
    borderRadius: 100,
    width: "90%",
    // shadowRadius: 10,
    // shadowOpacity: 0.8,
    // shadowOffset:{  width: -5,  height: 10,  },
    // shadowColor: 'black',
  },
  text: {
    fontSize: 22,
    color: "white",
    fontFamily: "Avenir Next",
  },
  textDelivery: {
    fontSize: 34,
    color: "black",
    fontFamily: "Avenir Next",
  },
  text2: {
    fontSize: 40,
    color: "black",
    fontFamily: "Avenir Next",
    paddingTop: '10%',
    alignItems: "center",
  },
  touchable: {
    width: "100%",
    alignItems: "center",
    // flex: 3
  },
  nameHolder: {
    flex: .9
  },
  delivery: {
    flex: 1,
    paddingBottom: '10%',
    fontSize: 40,
    width: "100%",
    alignItems: "center",
  }
});
