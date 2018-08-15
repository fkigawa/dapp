import React from "react"
// import {TextInput, View, StyleSheet, TouchableOpacity, Text} from "react-native";
import {View, TextInput, Text, Button} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';
import {connect} from "react-redux";
import {changingFirstName,changingLastName,changingEmail,loggingIn} from "../../store/actions/products"
import {urlLink} from "../../../App"
import Icon from 'react-native-vector-icons/Feather';
import homeNavigator from "./MainTabs/HomeNavigator";
class RegistrationScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            password: "",
            repeatPassword: "",
            error: "",
            formFilled: ""
        };
    }
    submitHandler(){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(this.props.email).toLowerCase())) {
          return alert('Invalid email!');
        }
        if(this.state.password === this.state.repeatPassword) {
            fetch(`${urlLink}/registration`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                mode: "cors",
                credentials: "same-origin",
                body: JSON.stringify({
                    firstName: this.props.firstName,
                    lastName: this.props.lastName,
                    email: this.props.email,
                    password: this.state.password
                })
            }).then((response) => {
                if (response._bodyInit === 'exists') {
                  return alert('This email is already in use')
                };
                return response.json();
            })
                .then((response) => {
                    // console.log(response);
                    if (response === true) {
                        homeNavigator()
                    }
                })
                .catch((err) => {
                    console.log("The error is", err);
                    this.setState({error: true});
                })
        }
        else{
            this.setState({formFilled: "false"})
            return alert('Passwords do not match')
        }
    }
    changeFirstName(newFirstName){
        this.props.changeFirstName(newFirstName)
    }
    changeLastName(newLastName){
        this.props.changeLastName(newLastName)
    }
    changeEmail(newEmail){
      this.props.changeEmail(newEmail)
    }
    onPassword(password){
        this.setState({password})
    }
    onRepeatPassword(repeatPassword){
        this.setState({repeatPassword})
    }
    formFilled(){
        if (!this.props.firstName || !this.props.lastName || !this.props.email || !this.state.password || !this.state.repeatPassword){
            return true
        }
        else{
            return false
        }
    }

    render(){
        return (
            <View flex paddingH-25 paddingT-70>
              <View style={styles.icon}>
                <Icon size={40} color='grey' name="x" onPress={() => homeNavigator()}/>
              </View>
              {/* {this.state.formFilled === "false" ? <Text>Password doesn't match</Text> : null} */}
              <TextInput text50 autoCapitalize='none' placeholder="first name" value={this.props.firstName} onChangeText={(event)=>this.changeFirstName(event)} dark10/>
              <TextInput text50 autoCapitalize='none' placeholder="last name" value={this.props.lastName} onChangeText={(event)=>this.changeLastName(event)} dark10/>
              <TextInput text50 autoCapitalize='none' placeholder="email" value={this.props.email} onChangeText={(event)=>this.changeEmail(event)} dark10/>
              <TextInput text50 autoCapitalize='none' placeholder="password" value={this.state.password} onChangeText={(event)=>this.onPassword(event)} secureTextEntry dark10/>
              <TextInput text50 autoCapitalize='none' placeholder="repeat password" secureTextEntry value={this.state.repeatPassword} onChangeText={(event)=>this.onRepeatPassword(event)} dark10/>

              <View marginT-150 center>
                <Button text70 white background-orange30 disabled={this.formFilled()} onPress={()=>this.submitHandler()} label="Sign Up"/>
              </View>
            </View>
        )
    }
}
const mapStateToProps = state => {
    return{
        firstName: state.root.firstName,
        lastName: state.root.lastName,
        email: state.root.email,
    }
};
const mapDispatchToProps = dispatch => {
    return{
        changeFirstName: (newFirstName) => dispatch(changingFirstName(newFirstName)),
        changeLastName: (newLastName)=> dispatch(changingLastName(newLastName)),
        changeEmail: (newEmail)=> dispatch(changingEmail(newEmail)),
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(RegistrationScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginBottom: 40,
    marginTop: -50,
    marginLeft: -10,
    alignItems: 'flex-start'
  }
});
