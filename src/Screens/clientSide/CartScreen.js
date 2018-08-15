import React from 'react';
import {StyleSheet, Text, ListView, TouchableOpacity} from 'react-native';
import {View, Button} from 'react-native-ui-lib';
import {connect} from "react-redux"
import {addCart} from "../../store/actions/products";
let urlLink = "https://39e059b2.ngrok.io";
import checkoutNavigator from "./MainTabs/CheckoutNavigator";

class CartScreen extends React.Component {

  toCheckoutScreen = () => {
    this.props.navigator.showModal({
      screen: "CheckoutScreen", // unique ID registered with Navigation.registerScreen
      title: "Checkout", // title of the screen as appears in the nav bar (optional)
      passProps: {}, // simple serializable object that will pass as props to the modal (optional)
      navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
      animationType: 'slide-up' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
    });
  };

  checkoutButtonHandler(){
      fetch(`${urlLink}/checkout`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json; charset=utf-8",
          },
          credentials: "include",
          body: JSON.stringify({
              cartItems: this.props.cartItems,
              userId: this.props.userId
          })
      }).then((response) => {
          return response.json();
      }).then((response) => {
            if (response.success === true) {
               // console.log("Response from backend at checkout is", response);
            }
        })
  }

  render() {
    return (
      <View flex paddingH-25 paddingT-70>
        <View flex marginT-20 center>
            {this.props.cartItems.map((data,i)=> <Text style={styles.welcome} key={i}>{data.name} {data.price}</Text>)}
        </View>
        <View flex marginT-200 center>
          <Button text70 white background-orange30  onPress={()=>this.toCheckoutScreen()} label="Checkout"/>
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return{
    cartItems: state.root.cartItems,
      userId: state.root.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (item) => dispatch(addCart(item))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(CartScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
    checkoutButton:{
        backgroundColor: "#3b5998",
        alignItems: 'center',
        padding:5,
        height: 30,
        width: "90%",
        margin: 10,
        position: "absolute",
        bottom: 0
    }
});
