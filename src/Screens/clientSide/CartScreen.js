import React from 'react';
import {StyleSheet, Text, View, ListView, TouchableOpacity} from 'react-native';
import {connect} from "react-redux"
import {addCart} from "../../store/actions/products";
let urlLink = "http://localhost:1337";

class CartScreen extends React.Component {
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
                console.log("Response from backend at checkout is", response);
            }
        })
  }
  render() {
    return (
        <View style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.welcome}>Here's your Cart!</Text>
          {this.props.cartItems.map((data,i)=> <Text style={styles.welcome} key={i}>{data.name} {data.price}</Text>)}
      </View>
            <TouchableOpacity style={styles.checkoutButton} onPress={()=>this.checkoutButtonHandler()}><Text>Checkout</Text></TouchableOpacity>
        </View>
    );
  }
}
const mapStateToProps = state => {
  console.log("USER ID IN MAP STATE TO PROPS IS", state.root.userId);
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
