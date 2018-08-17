import React from "react"
import {connect} from "react-redux"
import {View, Text, Button, Image, TouchableOpacity, StyleSheet,TouchableHighlight} from "react-native"
import productsNavigator from "./MainTabs/ProductsNavigator";
import {urlLink} from "../../../keys"
import {changingQuantity, addCart, changingProductList} from "../../store/actions";
import Icon from "react-native-vector-icons/Feather"
import homeNavigator from "./MainTabs/HomeNavigator";
class ProductDetailScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            product: {},
            done: false,
            itemAmount: 1
        }
    }
    async componentDidMount(){
        fetch(`${urlLink}/productDetail/${this.props.currentProduct}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            credentials: "include"
        }).then((response) => {
            return response.json();
        }).then((response) => {
            this.setState ({
                 product: response.product,
                done: true
            })
        })
    }
    increaseNumber(){
        let incNum = this.state.itemAmount + 1;
        this.setState({itemAmount: incNum})
    }

    decreaseNumber(){
        let decNum = this.state.itemAmount - 1;
        this.setState({itemAmount: decNum})
    }

    onBack() {
        productsNavigator(this.props.currentPage,"slide-down")
    }

    onAddToCart() {
        if(this.props.cartItems.length === 0){
            let singleItem = {...this.state.product};
            singleItem["quantity"] = this.state.itemAmount;
            this.setState({product:singleItem}, ()=>{
                this.props.addToCart(this.state.product)
                productsNavigator(this.props.currentPage,"slide-down")
            });
        }
        else {
            var self = this
            let isInCart = false;
            this.props.cartItems.map((cartItem,i)=> {
                if (cartItem.name === this.state.product.name ) {
                    console.log("in here");
                    isInCart = true;
                    let singleItem = {...cartItem};
                    console.log("Single Item", singleItem);
                    let quantity = singleItem["quantity"];
                    quantity = quantity + this.state.itemAmount;
                    singleItem["quantity"] = quantity;
                    this.setState({product: singleItem},()=>{
                        this.props.addToCart(this.state.product)
                        productsNavigator(this.props.currentPage,"slide-down")
                    })

                }
            });
            if(!isInCart){
                let singleItem = {...this.state.product};
                singleItem["quantity"] = this.state.itemAmount;
                this.setState({product:singleItem}, ()=>{
                    this.props.addToCart(this.state.product)
                    productsNavigator(this.props.currentPage,"slide-down")
                });
            }
        }
    }



        //Below code was changing the productQuantity object.,
        // let cartArray = new Array(this.state.itemAmount).fill(this.state.product);
        // let singleItem = {...cartArray[0]};
        // for(let i = 0; i < this.state.itemAmount; i++){
        //     this.props.addToCart(singleItem)
        // }
        //
        // let productQuantityCopy = {...this.props.productQuantity};
        // for(let key in productQuantityCopy){
        //     if(key === singleItem.name){
        //         let quantity = productQuantityCopy[key];
        //         quantity = quantity + this.state.itemAmount;
        //         this.props.changeQuantity(quantity, key)
        //     }
        // }



        // let cartArray = new Array(this.state.itemAmount).fill(this.state.product);
        // let singleItem = {...cartArray[0]};
        // let added = false;
        // if(this.state.itemAmount > 0){
        //     //if nothing is in the cart it'll add it accordingly
        //     if(this.props.cartItems.length === 0){
        //         singleItem["quantity"] = cartArray.length;
        //         console.log("CartArray[0]", cartArray[0]);
        //         console.log("singleItem", singleItem);
        //         this.props.addToCart(singleItem)
        //     }
        //     else{
        //         this.props.cartItems.map((item,i)=>{
        //             //accounts for if someone adds one item from the product page and again from the detailed page
        //             if(item.name === singleItem.name){
        //                 let count = item.quantity + cartArray.length;
        //                 added = true;
        //                 this.props.changeQuantity(count,i)
        //             }
        //             //accounts for if someone is adding for the first time and the item is not there
        //             else if(i===this.props.cartItems.length-1 && !added){
        //
        //                 singleItem["quantity"] = cartArray.length;
        //                 this.props.addToCart(singleItem);
        //             }
        //         })
        //     }
        // }

    render(){
        return (
            <View style={styles.container}>
                {console.log("Current Product",this.props.currentProduct )}
                {console.log("Product Product",this.state.product )}
                {this.state.done ?
                    <ProductDetailScreen2
                        product={this.state.product}
                        onBack={(category)=>this.onBack(category)}
                        currentProduct={this.props.currentProduct}
                        incNum={()=>this.increaseNumber()}
                        decNum={()=>this.decreaseNumber()}
                        currentNum={this.state.itemAmount}
                        cartHandler={()=>this.onAddToCart()}
                        key={Math.random()}
                    />
                    :
                    null
                }
            </View>
        )
    }
}

class ProductDetailScreen2 extends React.Component{
    render(){
        return(
            <View style={styles.container}
              key={Math.random()}
              >

                <View style={styles.icon}>
                    <Icon size={40} color='grey' name="x" onPress={() => this.props.onBack()}/>
                </View>
                <Image source={{uri:this.props.product.imageUrl}} style={styles.imageSize}/>

                <Text style={styles.productName}>{this.props.currentProduct} </Text>

                <Text style={styles.price}>${this.props.product.price}</Text>

                <Text style={styles.description}>{this.props.product.description}</Text>

                <View style={styles.addToCartItems}>

                    <TouchableOpacity onPress={()=>this.props.decNum()} style={styles.minusButton}>
                        <Icon name={"minus-circle"} size={50} color={"#ec851d"} />
                    </TouchableOpacity>

                <Text style={styles.quantity}>{this.props.currentNum}</Text>
                    <TouchableOpacity onPress={()=>this.props.incNum()} style={styles.plusButton}>
                        <Icon name={"plus-circle"} size={50} color={"#ec851d"}/>
                    </TouchableOpacity>


                    <TouchableHighlight onPress={()=>this.props.cartHandler()} style={styles.addToCart}>
                        <Text style={styles.addToCartText}> Add to Cart</Text>
                    </TouchableHighlight>
                {/*<Button title="Add to Cart" onPress={()=>this.props.cartHandler()}/>*/}

                </View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return{
        currentProduct: state.root.currentProduct,
        cartItems: state.root.cartItems,
        productQuantity: state.root.productQuantity,
        currentPage: state.root.currentCategory,
    }
};


const mapDispatchToProps = dispatch =>{
    return{
        changeQuantity: (quantity, name) => dispatch(changingQuantity(quantity,name)),
        addToCart: (item) => dispatch(addCart(item)),
        updatingProductList: (productList) => dispatch(changingProductList(productList))
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(ProductDetailScreen)

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    container1: {
        flex:1,
        alignItems:"center",
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "white",
    },
    addToCartItems:{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
        width: "100%"
    },
    imageSize:{
        width: "100%",
        height: "50%",
    },
    productName:{
        fontFamily: "Helvetica Neue",
        fontSize: 30,
        fontWeight: "bold",
        alignSelf: "center",
        marginBottom: 7
    },
    price:{
        fontFamily: "Helvetica Neue",
        fontSize: 20,
        alignSelf: "center",
        marginBottom: 7
    },
    description:{
        fontFamily: "Helvetica Neue",
        fontSize: 20,
        alignSelf: "center",
        fontWeight: "bold"
    },
    plusButton:{
        marginLeft: 10
    },
    minusButton:{
        marginRight: 10
    },
    quantity:{
        fontFamily: "Helvetica Neue",
        fontSize: 30,
        fontWeight: "bold",
    },
    addToCart:{
        backgroundColor: "#ec851d",
        padding: 10,
        borderRadius: 8,
        marginLeft: 10,
    },
    icon: {
        justifyContent: 'flex-start',
        // borderWidth: 2,
        padding: 10,
        alignItems: 'flex-start',
        width: "110%"
    },
    addToCartText:{
        fontFamily: "Helvetica Neue",
        fontSize: 20,
        fontWeight: "bold",
        color: "white"
    }
});
