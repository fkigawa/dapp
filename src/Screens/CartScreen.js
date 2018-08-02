import React from 'react';
import {StyleSheet, Text, View, ListView} from 'react-native';
import {connect} from "react-redux"
import {addCart} from "../store/actions/products";


class CartScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Here's your Cart!</Text>
          {this.props.cartItems.map((data,i)=> <Text style={styles.welcome} key={i}>{data.productName} {data.price}</Text>)}
      </View>
    );
  }
}
const mapStateToProps = state => {
  return{
    cartItems: state.root.cartItems
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
});
