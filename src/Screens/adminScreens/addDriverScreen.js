import React from 'react';
import {StyleSheet, Text, TextInput, View, ListView, TouchableOpacity} from 'react-native';
import {urlLink} from "../../../App"


class addDriverScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      email: ''
    })
  }

  submitHandler() {
    fetch(`${urlLink}/createDriver`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
          email: this.state.email
      })
    }).then((response) => {
      console.log(response);
      return response.json();
    }).then((response) => {
      console.log(response);
      if (response.success === true) {
        console.log('driver created')
      }
    }).catch((err) => {
      console.log("The error is", err);
    })
  }

  changeEmail(event){
    this.setState({
      email: event
    })
  }

  formFilled(){
      if (!this.state.email){
          return true
      }
      else {
          return false
      }
  }


  render() {
    return (
      <View>
        <View style={styles.container}>

          <Text style={styles.textStyle}>Enter email of driver: </Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="Enter email of driver"
            value={this.state.email}
            onChangeText={(event)=>this.changeEmail(event)}
          />
        </View>

        <TouchableOpacity
          disabled={this.formFilled()}
          style={this.formFilled() ? styles.buttonFalse : styles.button}
          onPress={()=>this.submitHandler()}>
          <Text style={{color:"white"}}>Make Driver</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

export default addDriverScreen

const styles = StyleSheet.create({
    container:{
        padding: 10,
        flexDirection: "row",
        flexWrap: "wrap"
    },
    inputStyle:{
        borderWidth: 4,
        borderColor: "black",
        padding: 10,
        height: 40,
        width: "50%",
        alignItems: "center",
        flexDirection: "row"
    },
    button:{
        backgroundColor: "#3b5998",
        alignItems: 'center',
        padding: 5,
        margin: 10,
        height: 30,
    },
    textStyle:{
        alignItems: "center",
        fontSize: 20,
        margin: 10
    },
    buttonFalse:{
        backgroundColor: "gray",
        alignItems: 'center',
        padding: 5,
        margin: 10,
        height: 30,
    }
});
