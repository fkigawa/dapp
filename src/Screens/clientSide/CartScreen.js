import React from 'react';
import {StyleSheet, Text, ListView, TouchableOpacity,View, Image, TouchableHighlight} from 'react-native';
import {Button} from 'react-native-ui-lib';
import {connect} from "react-redux"
import {addCart} from "../../store/actions/products";
import {urlLink} from "../../../keys"
import Icon from "react-native-vector-icons/Feather"
import checkoutNavigator from "./MainTabs/CheckoutNavigator";
let itemTracker = [];
class CartScreen extends React.Component {
    constructor(props){
        super(props);
        this.state={
            itemTracker: []
        }
    }
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


    increaseNumber(data){
        let quantity = data.quantity;
        quantity++;
        let singleItem = {...data};
        singleItem["quantity"] = quantity;
        this.props.addToCart(singleItem);
    }

    decreaseNumber(data){
        let quantity = data.quantity;
        quantity--;
        let singleItem = {...data};
        singleItem["quantity"] = quantity;
        this.props.addToCart(singleItem);
    }
  render() {
    return (
      <View style={styles.container}>
          <View style={styles.container1}>
              {this.props.cartItems.map((data,i)=> {
                  return (
                      <View style={styles.container3}>
                      <Text>{data.name} </Text>
                      <Text>${data.price}</Text>
                          <View style={styles.container2}>
                          <TouchableOpacity onPress={()=>this.decreaseNumber(data)} style={styles.minusButton}>
                              <Icon name={"minus-circle"} size={20} color={"#ec851d"} />
                          </TouchableOpacity>


                          <Text style={styles.quantity}>{data.quantity}</Text>

                          <TouchableOpacity onPress={()=>this.increaseNumber(data)} style={styles.plusButton}>
                              <Icon name={"plus-circle"} size={20} color={"#ec851d"}/>
                          </TouchableOpacity>


                          {/*<TouchableHighlight onPress={()=>this.props.cartHandler()} style={styles.addToCart}>*/}
                              {/*<Text style={styles.addToCartText}> Add to Cart</Text>*/}
                          {/*</TouchableHighlight>*/}
                          </View>
                      </View>
                      )
                  }
              )}
          </View >
        <View style={styles.container4}>
          <Button text70 white background-orange30  onPress={()=>this.toCheckoutScreen()} label="Checkout"/>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return{
    cartItems: state.root.cartItems,
      userId: state.root.userId,
      quantity: state.root.productQuantity
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
        backgroundColor: '#F5FCFF',
        flexDirection: "row"
  },
    container1: {
        flex:1,
        width: "100%",
        height: "100%",

  },
    container2: {
        flex:1,
        width: "50%",
        height: "100%",
        alignItems: "center",
        flexDirection: "row"
  },
    container3:{
        flex:1,
        width: "100%",
        height: "100%",
        flexDirection:"row",
        alignItems: "center"
    },
    container4:{
        flex:1,
        width: "100%",
        height: "100%",
        flexDirection:"row",
        alignItems: "flex-end"
    },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
    checkoutButton:{
        backgroundColor: "#3b5998",
        padding:5,
        height: 30,
        width: "90%",
        margin: 10,
    },
    imageSize:{
        height: "40%",
        width: "30%",
    },plusButton:{
        marginLeft: 10
    },
    minusButton:{
        marginLeft: 10
    },
    quantity:{
        fontFamily: "Helvetica Neue",
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 10
    },
    addToCart:{
        backgroundColor: "#ec851d",
        padding: 5,
        borderRadius: 8,
        marginLeft: 5,
    },
    icon: {
        marginLeft: -60,
        alignItems: 'flex-start',
        width: "100%"
    },
    addToCartText:{
        fontFamily: "Helvetica Neue",
        fontSize: 10,
        fontWeight: "bold",
        color: "white"
    }
});
