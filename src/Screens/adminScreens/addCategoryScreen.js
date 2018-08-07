import React from 'react';
import {StyleSheet, Text, TextInput, View, ListView, TouchableOpacity} from 'react-native';
import {urlLink} from "../../../App"


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
      <View>
        <View style={styles.container}>

          <Text style={styles.textStyle}>Enter name of category: </Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="Enter name of category"
            value={this.state.name}
            onChangeText={(event)=>this.changeName(event)}
          />

          <Text style={styles.textStyle}>Enter image url of category: </Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="Enter image url of category"
            value={this.state.imageUrl}
            onChangeText={(event)=>this.changeImageUrl(event)}
          />

        </View>

        <TouchableOpacity
          disabled={this.formFilled()}
          style={this.formFilled() ? styles.buttonFalse : styles.button}
          onPress={()=>this.submitHandler()}>
          <Text style={{color:"white"}}>Submit Category</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

export default addCategoryScreen

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
