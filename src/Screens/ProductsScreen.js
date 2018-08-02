/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import categoryNavigator from "./MainTabs/CategoryNavigator"
import {connect} from "react-redux"
import drinkImage from "../assets/can-of-coke.png"
import cupImage from "../assets/solo-cup.png"
import snackImage from "../assets/snacks.png"
type Props = {};
let drinks = [{
  productName: "Sprite",
    price: 1.99,
    image: drinkImage
}];
let cups = [{
  productName: "Red Solo Cup",
    price: 10.99,
    image: cupImage
}];
let snacks = [{
  productName: "Cliff Bar",
    price: 2.99,
    image: snackImage
}];

class ProductsScreen extends Component<Props> {
    backToCategory()
    {
        categoryNavigator()
    }
  render() {

    return (
      <View style={styles.container}>
        <Button style={styles.button} onPress={()=>this.backToCategory()} title="Back"/>
        <Text>{this.props.currentPage}</Text>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    currentPage: state.root.currentCategory
  }
};
export default connect(mapStateToProps)(ProductsScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
    button:{
    alignItems: "flex-start"
    }
});
