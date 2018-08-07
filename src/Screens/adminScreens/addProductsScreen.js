import React from 'react';
import {StyleSheet, Text, TextInput, View, ListView, TouchableOpacity} from 'react-native';
import {urlLink} from "../../../App"


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
      <View>
        <View style={styles.container}>

          <Text style={styles.textStyle}>Enter name of product: </Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="Enter name of product"
            value={this.state.name}
            onChangeText={(event)=>this.changeName(event)}
          />

          <Text style={styles.textStyle}>Enter description of product: </Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="Enter description of product"
            value={this.state.description}
            onChangeText={(event)=>this.changeDescription(event)}
          />

          <Text style={styles.textStyle}>Enter price of product: </Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="Enter price of product"
            value={this.state.price}
            onChangeText={(event)=>this.changePrice(event)}
          />

          <Text style={styles.textStyle}>Enter image url of product: </Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="Enter image url of product"
            value={this.state.imageUrl}
            onChangeText={(event)=>this.changeImageUrl(event)}
          />

          <Text style={styles.textStyle}>Enter category of product: </Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="Enter category of product"
            value={this.state.category}
            onChangeText={(event)=>this.changeCategory(event)}
          />

        </View>

        <TouchableOpacity
          disabled={this.formFilled()}
          style={this.formFilled() ? styles.buttonFalse : styles.button}
          onPress={()=>this.submitHandler()}>
          <Text style={{color:"white"}}>Submit Product</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

export default addProductsScreen

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
