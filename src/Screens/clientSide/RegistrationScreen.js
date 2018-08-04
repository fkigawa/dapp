import React from "react"
import {TextInput, View, StyleSheet, TouchableOpacity, Text} from "react-native";


export default class RegistrationScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            firstName: "First Name",
            lastName: "",
            email: "",
            password: "",
            repeatPassword: "",
        }

    }
    changeFirstName(event){
        this.setState({firstName:event})
    }
    changeLastName(){

    }
    onEmail(){

    }
    onPassword(){

    }
    onRepeatPassword(){

    }
    render(){
        return (
            <View>
                <View style={styles.container}>

                    <Text style={styles.textStyle}>First Name: </Text>
                    <TextInput style={styles.inputStyle} placeholder="Enter First Name" value={this.state.firstName} onChangeText={(event)=>this.changeFirstName(event)}/>
                    {console.log(this.state.firstName)}
                    <Text style={styles.textStyle}>Last Name: </Text>
                    <TextInput style={styles.inputStyle} placeholder="Enter Last Name"/>

                    <Text style={styles.textStyle}>Email: </Text>
                    <TextInput style={styles.inputStyle} placeholder="Enter Email"/>

                    <Text style={styles.textStyle}>Password: </Text>
                    <TextInput style={styles.inputStyle} secureTextEntry={true} placeholder="Enter Password" type="password"/>

                    <Text style={styles.textStyle}>Repeat Password: </Text>
                    <TextInput style={styles.inputStyle} secureTextEntry={true} placeholder="Repeat Password"/>


                </View>

                <TouchableOpacity style={styles.button}><Text style={{color:"white"}}>Submit Information</Text></TouchableOpacity>

            </View>
        )
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
    }
});