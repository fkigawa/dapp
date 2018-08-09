import React from "react"
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {addCart,currentProduct} from "../../store/actions/products";
import {connect} from "react-redux"
import {urlLink} from "../../../App"

import productsDetailNavigator from "../../Screens/clientSide/MainTabs/ProductDetailNavigator";
class ProductButton extends React.Component{
    constructor(props){
        super(props);
    }
    onPressTile(data){
      this.props.addToCart(data);
    }
    onProductButton = data =>{
        console.log("Data in product button", data);
        console.log("Product function", this.props.changeProduct());
        this.props.changeProduct(data);
        productsDetailNavigator()
    };
    render(){
        return (
        <View style={styles.container}>
            {this.props.products.map((data,i)=>{
                return (
                    <View>
                        <View>
                            <TouchableOpacity key={i} onPress={()=>this.onProductButton(data.name)} >
                                <Image source={{uri:data.imageUrl}} style={styles.imageSize}/>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <Text>{data.name}</Text>
                            <Text>{data.price}</Text>
                            <TouchableOpacity key={i} onPress={()=>this.onPressTile(data)} style={styles.button} >
                                <Text style={styles.addToCart}> Add To Cart </Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                )
            })}
        </View>
    )};
};

const mapStateToProps = state =>{
    return{
        cartItems: state.root.cartItems
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addToCart: (item) => dispatch(addCart(item)),
        changeProduct: (product) => dispatch(currentProduct(product))
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(ProductButton)

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'space-between',
        flexDirection: "row",
        flexWrap: "wrap",
        borderColor: "black",
        borderWidth: 2,
        margin: 10
    },
    productImage:{
        backgroundColor: '#859a9b',
        height: 20,
        width:110,
        alignItems: "center",
    },
    button: {
        backgroundColor: '#859a9b',
        height: 20,
        width:110,
        alignItems: "center",
    },
    imageSize:{
        height: 100,
        width: 50,
        alignItems: "center"
    },
    addToCart:{
        fontSize: 11,
        alignItems: "center"
    }


});
