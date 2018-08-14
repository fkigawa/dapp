import React from "react"
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {addCart,currentProduct,changingQuantity} from "../../store/actions/products";
import {connect} from "react-redux"
import {urlLink} from "../../../App"

import productsDetailNavigator from "../../Screens/clientSide/MainTabs/ProductDetailNavigator";
class ProductButton extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            productQuantity: [],
            counter: 0
        }
    }
    onPressTile(data){
        console.log("DATA IN PRESS TILE", data);
        this.props.addToCart(data);
        let productQuantityCopy = {...this.props.productQuantity};
        let count = 0;
        for(let key in productQuantityCopy){
            if(key === data.name){
                let quantity = productQuantityCopy[key];
                quantity++;
                this.props.changeQuantity(quantity, key)
            }
        }
        // if(this.props.cartItems.length === 0){
        //     data["quantity"] = 1;
        //     this.props.addToCart(data);
        //     this.props.changeProductQuantity(data.quantity,data.name);
        // }
        // else{
        //     // let flag = false;
        //     this.props.cartItems.map((item,i)=>{
        //         //changes the quantity if it is already in the cart items
        //        if((item.name === data.name)){
        //            let count = item.quantity + 1;
        //            this.props.changeQuantity(count,i);
        //            this.props.changeProductQuantity(count,item.name);
        //            // flag = true;
        //        }
        //        //adds the product to the cart with the quantity set as 1
        //        else if(item.name !== data.name && data.quantity === 0){
        //            // flag = true;
        //            data["quantity"] = 1;
        //            this.props.addToCart(data);
        //            this.props.changeProductQuantity(data.quantity, data.name);
        //        }
        //     });
        // }
    }
    onProductButton = data =>{

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
        cartItems: state.root.cartItems,
        productQuantity: state.root.productQuantity
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addToCart: (item) => dispatch(addCart(item)),
        changeProduct: (product) => dispatch(currentProduct(product)),
        changeQuantity: (quantity,name)=> dispatch(changingQuantity(quantity,name))
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
