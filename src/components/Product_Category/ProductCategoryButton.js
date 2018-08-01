import React from "react"
import {Platform, Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import drinkImage from "../../assets/can-of-coke.png"
import cupImage from "../../assets/solo-cup.png"
import snacks from "../../assets/snacks.png"
import productsNavigator from "../../Screens/MainTabs/ProductsNavigator"

let products = [
    {
        image: drinkImage,
        title: "Drinks"
    },
    {
        image: cupImage,
        title: "Cups"

    },
    {
        image: snacks,
        title: "Snacks"

    }];
export default class ProductCategoryButton extends React.Component{
    constructor(props){
        super(props)
    }
    onPressTile(){
        productsNavigator()
    }
    render() {
        return (
            <View style={styles.container}>
                {products.map((data,i)=>{
                    return (
                        <TouchableOpacity key={i} onPress={()=>this.onPressTile()} style={styles.button}>
                            <Image source={data.image} style={styles.imageSize}/>
                            <Text>{data.title}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        flexDirection: "row",
        flexWrap: "wrap"
    },
    button: {
        backgroundColor: '#859a9b',
        padding: 20,
        margin: 10,
        height: 100,
        width:100,
        alignItems: "center",

    },
    imageSize:{
        height: 50,
        width: 50
    }


});