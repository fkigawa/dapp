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
type Props = {};
class ProductsScreen extends Component<Props> {
    buttonClicked()
    {
        categoryNavigator()
    }
  render() {

    return (
      <View style={styles.container}>
        <Button style={styles.button} onPress={()=>this.buttonClicked()} title="Back"/>
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
