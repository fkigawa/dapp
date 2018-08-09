import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, AsyncStorage} from 'react-native';
import {connect} from 'react-redux'
import {addingUserId, addingAccessToken, addingDeliverer} from "../../store/actions/products";
import categoryNavigator from "../clientSide/MainTabs/CategoryNavigator";
let urlLink = "http://localhost:1337";

let deliveryPortal;

class allOrders extends React.Component {

  backToClientSide = () => {
    categoryNavigator();
  }

  isDeliveryPortal = () => {
    console.log('im heree', this.props.isDeliverer)
    if (this.props.isDeliverer) {
      deliveryPortal = <Button title="back" onPress={() => this.backToClientSide()}/>
      return deliveryPortal
    }
  }

  updateOrders = () => {
    fetch(`${urlLink}/transactions`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json; charset=utf-8",
      },
      credentials: "include"
    }).then((response, err) => {
      return response.json()
    }).then((response, err) => {
      console.log(response)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>All Orders</Text>
        <Button title='Update Orders' onPress={() => this.updateOrders()}/>
        {this.isDeliveryPortal()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return{
    isDeliverer: state.root.isDeliverer,
  }
}

const mapDispatchToProps = dispatch => {
    return{
        addingDeliverer: ()=> dispatch(addingDeliverer()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(allOrders)

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
