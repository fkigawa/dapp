import React from "react"
import {Platform, Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import drinkImage from "../../assets/can-of-coke.png"
import cupImage from "../../assets/solo-cup.png"
import snacks from "../../assets/snacks.png"
import productsNavigator from "../../Screens/clientSide/MainTabs/ProductsNavigator"
import {currentCategory} from "../../store/actions/products";
import connect from "react-redux"
import {urlLink} from "../../../App"

var categoryArray = [];

export default class ProductCategoryButton extends React.Component{
    constructor(props){
      super(props);
      this.state = ({
        categories: []
      })
    }

    componentDidMount = () => {
      fetch(`${urlLink}/categories`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json; charset=utf-8",
          },
          credentials: "include"
      }).then((response) => {
          return response.json();
      }).then((response) => {
          categoryArray = this.state.categories.slice()
          categoryArray = response.categories
          this.setState ({
            categories: categoryArray
          })
      })
    }

    onPressTile(name){
        this.props.changeCategory(name)
        productsNavigator()
    }

    render() {
        return (
            <View style={styles.container}>
              {this.state.categories.map((data,i)=>{
                  return (
                      <TouchableOpacity key={i} onPress={()=>this.onPressTile(data.name)} style={styles.button} >
                          <Image source={{uri:data.imageUrl}} style={styles.imageSize}/>
                          <Text>{data.name}</Text>
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
