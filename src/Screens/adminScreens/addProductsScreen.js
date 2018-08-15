import React from 'react';
// import {StyleSheet, Text, TextInput, View, ListView, TouchableOpacity} from 'react-native';
import {View, TextInput, Text, Button, TouchableOpacity} from 'react-native-ui-lib';
import {urlLink} from "../../../keys"


class addProductsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      name: '',
      description: '',
      price: '',
      imageUrl: '',
      category: ''
    })
  }

  submitHandler() {
    fetch(`${urlLink}/createProduct`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json; charset=utf-8",
      },
      mode: "cors",
      credentials: "same-origin",
      body: JSON.stringify({
          name: this.state.name,
          description: this.state.description,
          price: this.state.price,
          imageUrl: this.state.imageUrl,
          category: this.state.category
      })
    }).then((response) => {
      console.log(response);
      return response.json();
    }).then((response) => {
      console.log(response);
      if (response.success === true) {
        console.log('product created')
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

  changeDescription(event){
    this.setState({
      description: event
    })
  }

  changePrice(event){
    this.setState({
      price: event
    })
  }

  changeImageUrl(event){
    this.setState({
      imageUrl: event
    })
  }

  changeCategory(event){
    console.log(this.state.category)
    this.setState({
      category: event
    })
  }

  formFilled(){
      console.log(this.state.name,this.state.description,this.state.price,this.state.imageUrl,this.state.category)
      if (!this.state.name || !this.state.description || !this.state.price || !this.state.imageUrl || !this.state.category){
          return true
      }
      else {
          return false
      }
  }


  render() {
    return (

      <View flex paddingH-25 paddingT-120>
        <TextInput text50 autoCapitalize='none' placeholder="Product name" value={this.state.name} onChangeText={(event)=>this.changeName(event)} dark10/>
        <TextInput text50  autoCapitalize='none' placeholder="Product description" value={this.state.description} onChangeText={(event)=>this.changeDescription(event)} dark10/>
        <TextInput text50  autoCapitalize='none' placeholder="Price" value={this.state.price} onChangeText={(event)=>this.changePrice(event)} dark10/>
        <TextInput text50  autoCapitalize='none' placeholder="Image url" value={this.state.imageUrl} onChangeText={(event)=>this.changeImageUrl(event)} dark10/>
        <TextInput text50  autoCapitalize='none' placeholder="Product category" value={this.state.category} onChangeText={(event)=>this.changeCategory(event)} dark10/>
        <View marginT-150 center>
          <Button text70 white background-orange30 disabled={this.formFilled()} onPress={()=>this.submitHandler()} label="Create Product"/>
        </View>
      </View>
    );
  }
}

export default addProductsScreen
