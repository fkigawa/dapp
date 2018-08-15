import React from "react"
import {Text, View, StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native';
import {addCart,currentProduct,changingQuantity} from "../../store/actions/products";
import {connect} from "react-redux"
import {urlLink} from "../../../keys"
//import Icon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Feather';



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
            <ScrollView>
        <View style={styles.container} key={this.props.key}>

            {this.props.products.map((data,i)=>{
                return (
                    <View key={Math.random()} style={styles.buttonContainer}>
                        <View style={styles.addToCart}>
                            <TouchableOpacity onPress={()=>this.onPressTile(data)} style={styles.button} >
                                {/*<Text style={styles.addToCartText}> + </Text>*/}
                                <Icon name={"plus-circle"}  size={25} color={"#ec851d"}/>
                            </TouchableOpacity>
                        </View>
                            <TouchableOpacity onPress={()=>this.onProductButton(data.name)} style={styles.button1} >
                                <Image source={{uri:data.imageUrl}} style={styles.imageSize}/>
                                <Text style={{fontSize: 11}}>${data.price} each</Text>
                                <Text style={{fontSize: 11}}>{data.name}, {data.description}</Text>

                            </TouchableOpacity>



                    </View>
                )
            })}

        </View>
            </ScrollView>
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
        flex:1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        padding: 5,
    },
    buttonContainer:{
        height: 190,
        width: "30%",
        alignItems: "center",
    },
    button1: {
        flex: 6,
        backgroundColor: 'white',
        height: "100%",
        width: "100%",
        alignItems: "flex-start",
    },
    button: {
        backgroundColor: 'white',
        height: "100%"
    },
    imageSize:{
        height: "80%",
        width: "80%",
        alignItems: "center",
    },
    addToCartText:{
        fontSize: 7,
    },
    addToCart:{
        flexDirection: "row",
        justifyContent: "flex-end",
        flex:1,
        width: "100%",
        height: "100%"
    }
});
