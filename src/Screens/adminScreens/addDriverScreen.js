import React from 'react';
// import {StyleSheet, Text, TextInput, View, ListView, TouchableOpacity} from 'react-native';
import {View, TextInput, Text, Button, TouchableOpacity} from 'react-native-ui-lib';
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
      <View flex paddingH-25 paddingT-120>
        <TextInput text50 autoCapitalize='none' placeholder="Enter email of driver" value={this.state.email} onChangeText={(event)=>this.changeEmail(event)} dark10/>
        <View marginT-270 center>
          <Button text70 white background-orange30 disabled={this.formFilled()} onPress={()=>this.submitHandler()} label="Create Driver Portal"/>
        </View>
      </View>
    );
  }
}

export default addDriverScreen
