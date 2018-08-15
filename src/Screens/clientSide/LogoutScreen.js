import React, {Component} from 'react';
import {View, TextInput, Text, Button, TouchableOpacity} from 'react-native-ui-lib';
import {connect} from 'react-redux'
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import {StyleSheet} from 'react-native';
import homeNavigator from './MainTabs/HomeNavigator'
import categoryNavigator from './MainTabs/CategoryNavigator'
import {addingUserId, addingAccessToken} from "../../store/actions/products";
import Icon from 'react-native-vector-icons/Feather';
import {urlLink} from "../../../keys"

var logoutButton;

class LogoutScreen extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          number: "",
          expmonth: "",
          expyear: "",
          cvc: "",
          fullName: "",
      };
  }
  submitHandler(){
      if(this.state.password === this.state.repeatPassword) {
          fetch(`${urlLink}/registration`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json; charset=utf-8",
              },
              mode: "cors",
              credentials: "same-origin",
              body: JSON.stringify({
                  firstName: this.props.firstName,
                  lastName: this.props.lastName,
                  email: this.props.email,
                  password: this.state.password
              })
          }).then((response) => {
              console.log(response);
              return response.json();
          })
              .then((response) => {
                  console.log(response);
                  if (response === true) {
                      homeNavigator()
                  }
              })
              .catch((err) => {
                  console.log("The error is", err);
                  this.setState({error: true});
              })
      }
      else{
          this.setState({formFilled: "false"})
      }
  }
  changeNumber(event){
    this.setState({
      number: event
    })
  };

  changeName(event){
    this.setState({
      fullName: event
    })
  };

  changeExpmonth(event){
    this.setState({
      expmonth: event
    })
  };

  changeExpyear(event){
    this.setState({
      expyear: event
    })
  };

  changeCvc(event){
    this.setState({
      cvc: event
    })
  };
  formFilled(){
      if (!this.state.number || !this.state.expmonth || !this.state.expyear || !this.state.cvc){
          return true
      }
      else {
          return false
      }
  }
  onCheckoutButton(){
      let validURL = 'https://api.stripe.com/v1/tokens?card[number]=4242424242424242&card[exp_month]=1&card[name]=John&card[exp_year]=2020&card[cvc]=123&amount=999&currency=usd';
      fetch(`https://api.stripe.com/v1/tokens?card[number]=${this.state.number}&card[exp_month]=${this.state.expmonth}&card[exp_year]=${this.state.expyear}&card[cvc]=${this.state.cvc}&amount=999&currency=usd&card[name]=${this.state.fullName}&card[address_city]=${this.state.city}&card[address_country]=USA&card[address_state]=${this.state.state}&card[address_zip]=${this.state.zipCode}&card[address_line1]=${this.state.addressLineOne}`, {
          method: 'POST',
          headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": `Bearer ${key}`,
          }
      })
          .then(resp => resp.json())
          .then(data => {
              // HERE WE HAVE ACCESS TO THE TOKEN TO SEND IT TO OUR SERVERS
              // ALONG WITH INSENSITIVE DATA
              fetch(`${urlLink}/payments`, {
                  method: 'POST',
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                      stripeToken: data.id,
                      description: this.props.cartItems,
                      amount: this.state.total*100,
                      shippingLineOne: this.state.addressLineOne,
                      name: this.state.fullName,
                      zipCode: this.state.zipCode,
                      state: this.state.state,
                      city: this.state.city
                  })
              })
                  .then(resp => resp.json())
                  .then(function(response) {
                      console.log("RESPONSE FROM MY BACKEND FOR STRIPE", response);
                      if(response.paid) {
                          // DO SOMETHING AFTER PAYMENT CONFIRMATION
                      }
                  }.bind(this)).catch(err => console.error(err));

          });
  }

  render() {
    return (
      <View flex paddingH-25 paddingT-70>
        <View style={styles.icon}>
          <Icon size={40} color='grey' name="x" onPress={() => categoryNavigator()}/>
        </View>
        {this.state.formFilled === "false" ? <Text>Password doesn't match</Text> : null}

        <TextInput text50 autoCapitalize='none' placeholder="Full name" value={this.state.fullName} onChangeText={(event)=>this.changeName(event)} dark10/>
        <TextInput text50 autoCapitalize='none' placeholder="Credit card number" value={this.state.number} onChangeText={(event)=>this.changeNumber(event)} dark10/>
        <TextInput text50 autoCapitalize='none' placeholder="Expiration month" value={this.state.expmonth} onChangeText={(event)=>this.changeExpmonth(event)} dark10/>
        <TextInput text50 autoCapitalize='none' placeholder="Expiration year" value={this.state.expyear} onChangeText={(event)=>this.changeExpyear(event)} dark10/>
        <TextInput text50 autoCapitalize='none' placeholder="Enter CVC" value={this.state.cvc} onChangeText={(event)=>this.changeCvc(event)} dark10/>
        <View marginT-150 center>
          <Button text70 white background-orange30 disabled={this.formFilled()} onPress={()=>this.onCheckoutButton()} label="Save Card Information"/>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return{
    userId: state.root.userId,
    cartItems: state.root.cartItems,
    accessToken: state.root.accessToken,
    userId: state.root.userId
  }
}

const mapDispatchToProps = dispatch => {
    return{
        addingAccessToken: (accessToken)=> dispatch(addingAccessToken(accessToken)),
        addingUserId: (userId) => dispatch(addingUserId(userId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoutScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginBottom: 40,
    marginTop: -50,
    marginLeft: -10,
    alignItems: 'flex-start'
  }
});
