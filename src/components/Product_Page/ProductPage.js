import React from "react"
import {products} from "../Product_Category/ProductCategoryButton";
import {Platform, Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
export default class ProductPage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
        <View style={styles.container}>
            {products.map((data,i)=>{
                return (
                    <TouchableOpacity key={i} onPress={()=>this.onPressTile(data.title)} style={styles.button} >
                        <Image source={data.image} style={styles.imageSize}/>
                        <Text>{data.title}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )}
};

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