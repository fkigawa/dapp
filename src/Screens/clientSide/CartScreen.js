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
            itemTracker: [],
            total: 0
        }
    }

  componentDidMount() {
    let myTotal = this.state.total;
    this.props.cartItems.map((data,i)=>{
        myTotal += data.price*data.quantity
    });
    myTotal=parseFloat(Math.round(myTotal * 100) / 100).toFixed(2);

    this.setState({total: myTotal});
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
        let newTotal = Number(this.state.total) + Number(data.price)
        newTotal=parseFloat(Math.round(newTotal * 100) / 100).toFixed(2);
        this.setState ({
          total: newTotal
        })
    }

    decreaseNumber(data){
        let quantity = data.quantity;
        quantity--;
        let singleItem = {...data};
        singleItem["quantity"] = quantity;
        this.props.addToCart(singleItem);
        let newTotal = Number(this.state.total) - Number(data.price)
        newTotal=parseFloat(Math.round(newTotal * 100) / 100).toFixed(2);
        this.setState ({
          total: newTotal
        })
    }
  render() {
    return (
      <View style={styles.container}>
          <View style={styles.containerCart}>
              {this.props.cartItems.map((data,i)=> {
                  return (
                      <View  style={styles.item} key={Math.random()}>
                        <View style={styles.itemName}>
                          <Text style={styles.text}>{data.name} </Text>
                        </View>
                        <View style={styles.quantity}>
                          <TouchableOpacity onPress={()=>this.decreaseNumber(data)} >
                              <Icon name={"minus-circle"} size={30} color={"#ec851d"} />
                          </TouchableOpacity>


                          <Text style={styles.text}>{data.quantity}</Text>

                          <TouchableOpacity onPress={()=>this.increaseNumber(data)} >
                              <Icon name={"plus-circle"} size={30} color={"#ec851d"}/>
                          </TouchableOpacity>
                        </View>
                        <View style={styles.price}>
                          <Text style={styles.text}>${parseFloat(Math.round((data.price*data.quantity) * 100) / 100).toFixed(2)}</Text>
                        </View>

                            {/*<TouchableHighlight onPress={()=>this.props.cartHandler()} style={styles.addToCart}>*/}
                                {/*<Text style={styles.addToCartText}> Add to Cart</Text>*/}
                            {/*</TouchableHighlight>*/}
                        </View>
                      )
                  }
              )}
          </View>
          <View style={styles.total}>
            <Text style={styles.text}>Total: ${this.state.total}</Text>
          </View>
        <View style={styles.containerCheckout}>
          <Button text70 white style={styles.checkout}  onPress={()=>this.toCheckoutScreen()} label="Checkout"/>
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
    flexDirection: "column",
    // borderWidth: 2
  },
  containerCart: {
    flex: 9,
    // borderWidth: 2
  },
  containerCheckout: {
    flex: 1,
    // borderWidth: 2,
    padding: 10
  },
  item: {
    height: 60,
    flexDirection: "row",
  },
  itemName: {
    flex: 1,
    // borderWidth: 2,
    padding: 10,
    alignItems: "center",
      borderBottomWidth: 1,
      borderColor: "#eee"
    // justifyContent: "center",
  },
  quantity: {
    flex: 1,
    // borderWidth:2,
    flexDirection: 'row',
    padding: 10,
    // alignItems: "center",
    justifyContent: "space-between",
      borderBottomWidth: 1,
      borderColor: "#eee"
  },
  price: {
    flex: 1,
    // borderWidth: 2,
    padding: 10,
    alignItems: "center",
    // justifyContent: "center",
      borderBottomWidth: 1,
      borderColor: "#eee"
  },
  text: {
    fontFamily: "AvenirNext-DemiBold",
    fontSize: 24
  },
  checkout: {
    backgroundColor: '#ec851d',
      fontFamily: "AvenirNext-DemiBold",
      fontWeight: "bold"
  },
  total: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
