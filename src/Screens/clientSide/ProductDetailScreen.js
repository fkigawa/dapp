import React from "react"
import {connect} from "react-redux"
import {View,Text,Button} from "react-native"
import productsNavigator from "./MainTabs/ProductsNavigator";
import {urlLink} from "../../../App"
import {changingQuantity, addCart, changingProductList} from "../../store/actions";
class ProductDetailScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            product: {},
            done: false,
            itemAmount: 0
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
        productsNavigator(this.props.currentPage)
    }

    onAddToCart(){
        let cartArray = new Array(this.state.itemAmount).fill(this.state.product);
        let singleItem = {...cartArray[0]};
        for(let i = 0; i < this.state.itemAmount; i++){
            this.props.addToCart(singleItem)
        }

        let productQuantityCopy = {...this.props.productQuantity};
        for(let key in productQuantityCopy){
            if(key === singleItem.name){
                let quantity = productQuantityCopy[key];
                quantity = quantity + this.state.itemAmount;
                this.props.changeQuantity(quantity, key)
            }
        }
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
    }
    render(){
        return (
            <View>
                {this.state.done ?
                    <ProductDetailScreen2
                        product={this.state.product}
                        onBack={(category)=>this.onBack(category)}
                        currentProduct={this.props.currentProduct}
                        incNum={()=>this.increaseNumber()}
                        decNum={()=>this.decreaseNumber()}
                        currentNum={this.state.itemAmount}
                        cartHandler={()=>this.onAddToCart()}
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
            <View>
                <Button title="Back" onPress={()=>this.props.onBack()}/>

                <Text>
                    Current Product: {this.props.currentProduct}
                </Text>

                <Text>
                    Description: {this.props.product.description} {"\n"}
                    Price: {this.props.product.price}
                </Text>

                <Button title="-" onPress={()=>this.props.decNum()}/>

                <Text>{this.props.currentNum}</Text>

                <Button title="+" onPress={()=>this.props.incNum()}/>

                <Button title="Add to Cart" onPress={()=>this.props.cartHandler()}/>

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

