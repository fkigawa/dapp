import React from 'react';
import {StyleSheet, Text, View, ListView} from 'react-native';


class addProducts extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Here's your Cart!</Text>
      </View>
    );
  }
}

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
