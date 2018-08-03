import React from "react"
import {TextInput, View, StyleSheet, TouchableOpacity, Text} from "react-native";


export default class RegistrationScreen extends React.Component{
    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.textStyle}>Email: </Text>
                <TextInput style={styles.inputStyle} placeholder="Enter Email"/>
                <Text style={styles.textStyle}>Password: </Text>
                <TextInput style={styles.inputStyle} placeholder="Enter Password"/>
                <Text style={styles.textStyle}>Repeat Password: </Text>
                <TextInput style={styles.inputStyle} placeholder="Repeat Password"/>
                {/*<TouchableOpacity style={styles.button}><Text style={{color:"white"}}>Submit Phone Number</Text></TouchableOpacity>*/}

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