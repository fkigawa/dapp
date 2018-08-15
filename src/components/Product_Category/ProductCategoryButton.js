import React from "react"
import {Platform, Text, View, StyleSheet, TouchableOpacity, Image,FlatList,ScrollView} from 'react-native';
import productsNavigator from "../../Screens/clientSide/MainTabs/ProductsNavigator"
import {urlLink} from "../../../App"
import {Spinner} from "nachos-ui";

var categoryArray = [];

export default class ProductCategoryButton extends React.Component{
    constructor(props){
      super(props);
      this.state = ({
        categories: [],
          buttonNumber: 1
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
    };

    onPressTile(name){
        this.props.changeCategory(name)
        productsNavigator(name)
    }
    buttonStyle = (i) =>{
        if(i%3===1){
            return styles.button2;
        }
        else if(i%3===2){
            return styles.button3;
        }
        else if(i%3===0){
            return styles.button1;
        }

    };
    buttonContainer = (i) =>{
        if(i%3===1){
            return styles.buttonContainer2;
        }
        else if(i%3===2){
            return styles.buttonContainer3;
        }
        else if(i%3===0){
            return styles.buttonContainer1;
        }
    }

    render() {
        return (
            <ScrollView>
            <View style={styles.container}>
                {this.state.categories.map((data,i)=>{
                    return (
                        <View key={i} style={this.buttonContainer(i)}>
                            <TouchableOpacity
                                onPress={()=>this.onPressTile(data.name)}
                                style={this.buttonStyle(i)}
                            >
                                <Image
                                    source={{uri:data.imageUrl}}
                                    style={styles.imageSize}
                                />
                                <Text>
                                    {data.name}

                                </Text>

                            </TouchableOpacity>
                        </View>

                    )

                })}

                {/*<FlatList*/}

                    {/*horizontal={false}*/}
                    {/*columnWrapperStyle={styles.container}*/}
                    {/*data={this.state.categories}*/}
                    {/*renderItem={({item,index}) => (*/}
                        {/*<View key={index} style={this.buttonContainer(index)}>*/}
                        {/*<TouchableOpacity*/}
                            {/*onPress={()=>this.onPressTile(item.name)}*/}
                            {/*style={this.buttonStyle(index)}*/}
                        {/*>*/}
                            {/*<Image*/}
                                {/*source={{uri:item.imageUrl}}*/}
                                {/*style={styles.imageSize}*/}
                            {/*/>*/}
                            {/*<Text>*/}
                                {/*{item.name}*/}

                            {/*</Text>*/}

                        {/*</TouchableOpacity>*/}
                    {/*</View>)}*/}
                {/*/>*/}
            </View>
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: "row",
        flexWrap: "wrap",
    },
    buttonContainer1:{
        height: 200,
        width: "35%",
        padding: 10,
        paddingRight: 5,
        paddingBottom: 5
    },
    button1: {
        backgroundColor: '#F0F0F0',
        //padding: 10,
        height: "100%",
        // width: "20%",
        alignItems: "center",
        borderRadius: 8
    },
    buttonContainer2:{
        height: 200,
        width: "65%",
        padding: 10,
        paddingLeft: 5,
        paddingBottom: 5,
    },
    button2:{
        backgroundColor: '#F0F0F0',
        // padding: 10,
        height: "100%",
        // width: "75%",
        alignItems: "center",
        borderRadius: 8
        //=alignSelf: "flex-end"
    },
    buttonContainer3:{
        height: 200,
        width: "100%",
        padding: 10,
        paddingTop: 5,
        paddingBottom: 0
    },
    button3:{
        backgroundColor: '#F0F0F0',
        // padding: 10,
        height: "100%",
        // width:350,
        alignItems: "center",
        borderRadius: 8
    },
    imageSize:{
        height: "70%",
        width: "75%",
        margin: 15
    }


});
