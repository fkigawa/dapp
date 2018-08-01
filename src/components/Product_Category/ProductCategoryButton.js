import React from "react"
import {Platform, Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import productsNavigator from '../../Screens/MainTabs/ProductsNavigator'
import drinkImage from "../../assets/can-of-coke.jpg"
let products = [
    {
        Drinks: {
                image: drinkImage,
                title: "Drinks"
            },
        Cups: {
                image: "",
                title: "Cups"
            }
    }];

export default class ProductCategoryButton extends React.Component{
    constructor(props){
      super(props)
    }
    onPressTile(){
      productsNavigator();
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={()=>this.onPressTile()} style={styles.button}>
                    <Image source={drinkImage} style={styles.imageSize}/>
                    <Text>Click Me!</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    button: {
        backgroundColor: '#859a9b',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#303838',
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        shadowOpacity: 0.35,
        alignItems: "flex-start",
        flexDirection:"column",
        height: 150,
        width: 150
    },
    imageSize:{
        height: 100,
        width: 100,
        flexDirection:"row"
    }


});
