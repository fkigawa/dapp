import React from "react"
import {TextInput, View, StyleSheet, TouchableOpacity, Text} from "react-native";
import {connect} from "react-redux";
import {changingFirstName,changingLastName,changingEmail,loggingIn} from "../../store/actions/products"
import {urlLink} from "../../../App"
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
                console.log(response);
                return response.json();
            })
                .then((response) => {
                    console.log(response);
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
            <View>
                {this.state.formFilled === "false" ? <Text>Password doesn't match</Text> : null}

                <View style={styles.container}>

                    <Text style={styles.textStyle}>First Name: </Text>
                    <TextInput style={styles.inputStyle} placeholder="Enter First Name" value={this.props.firstName} onChangeText={(event)=>this.changeFirstName(event)}/>

                    <Text style={styles.textStyle}>Last Name: </Text>
                    <TextInput style={styles.inputStyle} placeholder="Enter Last Name" value={this.props.lastName} onChangeText={(event)=>this.changeLastName(event)}/>

                    <Text style={styles.textStyle}>Email: </Text>
                    <TextInput style={styles.inputStyle} placeholder="Enter Email" value={this.props.email} onChangeText={(event)=>this.changeEmail(event)}/>

                    <Text style={styles.textStyle}>Password: </Text>
                    <TextInput style={styles.inputStyle} secureTextEntry={true} placeholder="Enter Password" value={this.state.password} onChangeText={(event)=>this.onPassword(event)}/>


                    <Text style={styles.textStyle}>Repeat Password: </Text>
                    <TextInput style={styles.inputStyle} secureTextEntry={true} placeholder="Repeat Password" value={this.state.repeatPassword} onChangeText={(event)=>this.onRepeatPassword(event)}/>


                </View>

                <TouchableOpacity disabled={this.formFilled()} style={this.formFilled() ? styles.buttonFalse : styles.button} onPress={()=>this.submitHandler()}><Text style={{color:"white"}}>Submit Information</Text></TouchableOpacity>

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
