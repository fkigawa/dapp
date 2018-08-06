import React from 'react';
import {StyleSheet, Text, View, ListView} from 'react-native';


class addProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      name: '',
      description: '',
      price: '',
      imageUrl: ''
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
          imageUrl: this.state.imageUrl
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
    else {
      this.setState({formFilled: "false"})
    }
  }

  changeName(event){
    this.setState({
      name: event.target.value
    })
  }

  changeDescription(event){
    this.setState({
      description: event.target.value
    })
  }

  changePrice(event){
    this.setState({
      price: event.target.value
    })
  }

  changeImageUrl(event){
    this.setState({
      imageUrl: event.target.value
    })
  }

  formFilled(){
      if (!this.state.name || !this.state.description || !this.state.price || !this.state.imageUrl){
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

          <Text style={styles.welcome}>Here's your Cart!</Text>

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
