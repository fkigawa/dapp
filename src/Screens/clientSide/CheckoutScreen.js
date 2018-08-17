import React from "react"
// import {TextInput, View, StyleSheet, TouchableOpacity, Text, Button} from "react-native";
import {View, TextInput, Text, Button} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';
import {urlLink} from "../../../keys"
import categoryNavigator from "./MainTabs/CategoryNavigator";
import Icon from 'react-native-vector-icons/Feather';
import Stripe from 'react-native-stripe-api'
import {key} from "../../../keys"
import {connect} from "react-redux";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
class CheckoutScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            number: "",
            expmonth: "",
            expyear: "",
            cvc: "",
            phoneNumber: "",
            addressLineOne: "",
            city:"",
            state:"",
            zipCode:"",
            total: 0,
            fullName: "",
        };
    }
    componentDidMount(){
        let myTotal = this.state.total;
        this.props.cartItems.map((data,i)=>{
            myTotal += (data.price*data.quantity)
        });
        myTotal=parseFloat(Math.round(myTotal * 100) / 100).toFixed(2);

        this.setState({total: myTotal});
    }

    back = () => {
      categoryNavigator()
    };

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

    changePhoneNumber(event){
      this.setState({
        phoneNumber: event
      })
    };

    changeAddressLineOne(event){
      this.setState({
        addressLineOne: event
      })
    };

    changeCity(event){
      this.setState({
        city: event
      })
    };

    changeState(event){
      this.setState({
        state: event
      })
    };

    changeZipCode(event){
      this.setState({
        zipCode: event
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



    render(){
        return (
          <KeyboardAwareScrollView>
          <View flex paddingH-25 paddingT-70>
            <View style={styles.icon}>
              <Icon size={40} color='grey' name="x" onPress={() => this.props.navigator.dismissModal({
                animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
              })}/>
            </View>

            {/* <Text blue50 text60 center>
                {this.props.cartItems.map((data,i)=> <Text style={styles.welcome} key={i}>{data.name} {data.price}  {"\n"}</Text>)}
                Total: ${this.state.total}
            </Text> */}

            <Text blue50 text40 center style={styles.text}>Contact Information</Text>
            <TextInput text50 autoCapitalize='none' placeholder={this.props.firstName + " " + this.props.lastName} value={this.state.fullName} onChangeText={(event)=>this.changeName(event)} dark10/>
            <TextInput text50 autoCapitalize='none' placeholder="Phone number" value={this.state.phoneNumber} onChangeText={(event)=>this.changePhoneNumber(event)} dark10/>

            <Text blue50 text40 center style={styles.text}>Card Information</Text>
            <TextInput text50 autoCapitalize='none' placeholder="Credit card number" value={this.state.number} onChangeText={(event)=>this.changeNumber(event)} dark10/>
            <TextInput text50 autoCapitalize='none' placeholder="Expiration month" value={this.state.expmonth} onChangeText={(event)=>this.changeExpmonth(event)} dark10/>
            <TextInput text50 autoCapitalize='none' placeholder="Expiration year" value={this.state.expyear} onChangeText={(event)=>this.changeExpyear(event)} dark10/>
            <TextInput text50 autoCapitalize='none' placeholder="Enter CVC" value={this.state.cvc} onChangeText={(event)=>this.changeCvc(event)} dark10/>

            <Text blue50 text40 center style={styles.text}>Address Information</Text>
            <TextInput text50 autoCapitalize='none' placeholder="Street Address" value={this.state.addressLineOne} onChangeText={(event)=>this.changeAddressLineOne(event)} dark10/>
            <TextInput text50 autoCapitalize='none' placeholder="City" value={this.state.city} onChangeText={(event)=>this.changeCity(event)} dark10/>
            <TextInput text50 autoCapitalize='none' placeholder="State" value={this.state.state} onChangeText={(event)=>this.changeState(event)} dark10/>
            <TextInput text50 autoCapitalize='none' placeholder="Zip Code" value={this.state.zipCode} onChangeText={(event)=>this.changeZipCode(event)} dark10/>
            <View margin-20 center>
              <Button text70 white background-orange30 disabled={this.formFilled()} onPress={()=>this.onCheckoutButton()} label={'Pay $' + this.state.total}/>
            </View>
          </View>
          </KeyboardAwareScrollView>
        )
    }
}

const mapStateToProps = state => {
    return{
        cartItems: state.root.cartItems,
        firstName: state.root.firstName,
        lastName: state.root.lastName
    };
};


export default connect(mapStateToProps)(CheckoutScreen)


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
  },
  text: {
    marginBottom: 20,
  }
});
