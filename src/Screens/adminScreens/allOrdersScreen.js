import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, AsyncStorage} from 'react-native';
import {connect} from 'react-redux'
import {addingUserId, addingAccessToken, addingDeliverer} from "../../store/actions/products";
import categoryNavigator from "../clientSide/MainTabs/CategoryNavigator";
import Icon from 'react-native-vector-icons/Feather';
import {urlLink} from "../../../keys"

let deliveryPortal;

class allOrders extends React.Component {

  backToClientSide = () => {
    categoryNavigator();
  }

  isDeliveryPortal = () => {
    console.log('im heree', this.props.isDeliverer)
    if (this.props.isDeliverer) {
      deliveryPortal = <View style={styles.icon}>
        <Icon size={40} color='grey' name="x" onPress={() => this.props.navigator.dismissModal({
          animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
        })}/>
      </View>
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
        {this.isDeliveryPortal()}
        <Button title='Update Orders' onPress={() => this.updateOrders()}/>
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
