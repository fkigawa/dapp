import React from "react"
import {TextInput, View, StyleSheet, TouchableOpacity, Text, Button} from "react-native";
import {urlLink} from "../../../App"
import categoryNavigator from "./MainTabs/CategoryNavigator";
import Stripe from 'react-native-stripe-api'
class CheckoutScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            number: "",
            expmonth: "",
            expyear: "",
            cvc: ""
        };
    }
    componentDidMount(){
        console.log("API KEY", String(process.env.STRIPEKEY));
        fetch('https://api.stripe.com/v1/tokens?card[number]=4242424242424242&card[exp_month]=1&card[exp_year]=2020&card[cvc]=123&amount=999&currency=usd', {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Bearer ${process.env.STRIPEKEY}`
            }
        })
            .then(resp => resp.json())
            .then(data => {
                // HERE WE HAVE ACCESS TO THE TOKEN TO SEND IT TO OUR SERVERS
                // ALONG WITH INSENSITIVE DATA
                console.log("Data", data);
                fetch(`${urlLink}/payments`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({stripeToken: data.id})
                })
                    .then(resp => resp.json())
                    .then(function(response) {
                        console.log("RESPONSE FROM MY BACKEND", response);
                        if(response.paid) {
                            // DO SOMETHING AFTER PAYMENT CONFIRMATION
                            console.log("Got in paid");
                        }
                    }.bind(this)).catch(err => console.error(err));

            });
    }
    payment = () => {
      const apiKey = process.env.STRIPE_TEST;
      const client = new Stripe(apiKey);
      const token = client.createToken('4242424242424242' , '09', '18', '111'
      ).then((response) => console.log(response)
      ).catch(err => console.log(err))
    }

    back = () => {
      categoryNavigator()
    }

    changeNumber(event){
      this.setState({
        number: event
      })
    }

    changeExpmonth(event){
      this.setState({
        expmonth: event
      })
    }

    changeExpyear(event){
      this.setState({
        expyear: event
      })
    }

    changeCvc(event){
      this.setState({
        cvc: event
      })
    }

    formFilled(){
        if (!this.state.number || !this.state.expmonth || !this.state.expyear || !this.state.cvc){
            return true
        }
        else {
            return false
        }
    }


    render(){
        return (
          <View>
            <View style={styles.container}>

              <Text style={styles.textStyle}>Enter Number: </Text>
              <TextInput
                style={styles.inputStyle}
                placeholder="Enter number"
                value={this.state.number}
                onChangeText={(event)=>this.changeNumber(event)}
              />

              <Text style={styles.textStyle}>Enter Expiration Month: </Text>
              <TextInput
                style={styles.inputStyle}
                placeholder="Enter expiration month"
                value={this.state.expmonth}
                onChangeText={(event)=>this.changeExpmonth(event)}
              />

              <Text style={styles.textStyle}>Enter Expiration Year: </Text>
              <TextInput
                style={styles.inputStyle}
                placeholder="Enter expiration year"
                value={this.state.expyear}
                onChangeText={(event)=>this.changeExpyear(event)}
              />

              <Text style={styles.textStyle}>Enter CVC: </Text>
              <TextInput
                style={styles.inputStyle}
                placeholder="Enter cvc"
                value={this.state.cvc}
                onChangeText={(event)=>this.changeCvc(event)}
              />

            </View>

            <TouchableOpacity
              disabled={this.formFilled()}
              style={this.formFilled() ? styles.buttonFalse : styles.button}
              onPress={()=>this.payment()}>
              <Text style={{color:"white"}}>Submit Card Information</Text>
            </TouchableOpacity>

            <Button title='back' onPress={() => this.back()}/>

          </View>
        )
    }
}


export default CheckoutScreen
const styles = StyleSheet.create({
    container:{
        padding: 10,
        flexDirection: "row",
        flexWrap: "wrap"
    },
    inputStyle:{
        borderWidth: 4,
        borderColor: "black",
        padding: 10,
        height: 40,
        width: "50%",
        alignItems: "center",
        flexDirection: "row"
    },
    button:{
        backgroundColor: "#3b5998",
        alignItems: 'center',
        padding: 5,
        margin: 10,
        height: 30,
    },
    textStyle:{
        alignItems: "center",
        fontSize: 20,
        margin: 10
    },
    buttonFalse:{
        backgroundColor: "gray",
        alignItems: 'center',
        padding: 5,
        margin: 10,
        height: 30,
    }
});
