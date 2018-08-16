import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, AsyncStorage} from 'react-native';
import {connect} from 'react-redux'
import {addingUserId, addingAccessToken, addingDeliverer} from "../../store/actions/products";
import categoryNavigator from "../clientSide/MainTabs/CategoryNavigator";
import Icon from 'react-native-vector-icons/Feather';
import {urlLink} from "../../../keys"

let deliveryPortal;

class allOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      transactions: []
    })
  }

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
      let transactionsArray = [];
      for (var i = 0; i < response.transactions.length; i++) {
        for (var j = 0; j < response.transactions[i].products.length; j++) {
          transactionsArray.push(response.transactions[i].products[j])
        };
      }

      let itemsArray = [];
      for (var i = 0; i < response.transactions.length; i++) {
        for (key in transactionsArray[i]) {
          itemsArray.push(key + ": " + transactionsArray[i][key]);
        }
      }

      console.log(itemsArray)

      this.setState({
        transactions: itemsArray
      })
      console.log(this.state.transactions[0])
    })
  }

  render() {
    return (
      <View style={styles.container}>
        {this.isDeliveryPortal()}
        <Button title='Update Orders' onPress={() => this.updateOrders()}/>
        {this.state.transactions.map(each => <Text style={styles.text}>{each}</Text>)}
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
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  text: {
    fontSize: 22,
    padding: 2
  }
});
