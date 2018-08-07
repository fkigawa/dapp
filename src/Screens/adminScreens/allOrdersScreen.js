import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, AsyncStorage} from 'react-native';
import {connect} from 'react-redux'
let urlLink = "http://localhost:1337";

class allOrders extends React.Component {

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
        <Text style={styles.welcome}>All Ordrs</Text>
        <Button title='Update Orders' onPress={() => this.updateOrders()}/>
      </View>
    );
  }
}

export default allOrders

// const mapStateToProps = state => {
//   return{
//     userId: state.root.userId,
//     cartItems: state.root.cartItems
//   }
// }
//
// const mapDispatchToProps = dispatch => {
//     return{
//         addingUserId: ()=> dispatch(addingUserId()),
//     }
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(allOrders)

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
