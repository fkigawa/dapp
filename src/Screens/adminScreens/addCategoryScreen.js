import React from 'react';
// import {StyleSheet, Text, TextInput, View, ListView, TouchableOpacity} from 'react-native';
import {View, TextInput, Text, Button, TouchableOpacity} from 'react-native-ui-lib';
import {urlLink} from "../../../keys"


class addCategoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      name: '',
      imageUrl: ''
    })
  }

  submitHandler() {
    fetch(`${urlLink}/createCategory`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json; charset=utf-8",
      },
      mode: "cors",
      credentials: "same-origin",
      body: JSON.stringify({
          name: this.state.name,
          imageUrl: this.state.imageUrl
      })
    }).then((response) => {
      console.log(response);
      return response.json();
    }).then((response) => {
      console.log(response);
      if (response.success === true) {
        console.log('category created')
      }
    }).catch((err) => {
      console.log("The error is", err);
      this.setState({error: true});
    })
  }

  changeName(event){
    this.setState({
      name: event
    })
  }

  changeImageUrl(event){
    this.setState({
      imageUrl: event
    })
  }

  formFilled(){
      console.log(this.state.name,this.state.imageUrl)
      if (!this.state.name, !this.state.imageUrl){
          return true
      }
      else {
          return false
      }
  }


  render() {
    return (
      <View flex paddingH-25 paddingT-120>
        <TextInput text50 autoCapitalize='none' placeholder="Category name" value={this.state.name} onChangeText={(event)=>this.changeName(event)} dark10/>
        <TextInput text50  autoCapitalize='none' placeholder="Image url" value={this.state.imageUrl} onChangeText={(event)=>this.changeImageUrl(event)} dark10/>
        <View marginT-270 center>
          <Button text70 white background-orange30 disabled={this.formFilled()} onPress={()=>this.submitHandler()} label="Create Category"/>
        </View>
      </View>
    );
  }
}

export default addCategoryScreen
