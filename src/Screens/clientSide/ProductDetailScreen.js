import React from "react"
import {connect} from "react-redux"
import {View,Text,Button} from "react-native"
import productsNavigator from "./MainTabs/ProductsNavigator";
import {urlLink} from "../../../App"
class ProductDetailScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            product: {},
            done: false
        }
    }
    async componentDidMount(){
        console.log("Got in product detail");
        fetch(`${urlLink}/productDetail/${this.props.currentProduct}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            credentials: "include"
        }).then((response) => {
            return response.json();
        }).then((response) => {
            console.log("RESPONSE ON DETAILED PAGE", response);
            this.setState ({
                 product: response.product,
                done: true
            })
        })
    }

    onBack() {
        productsNavigator()
    }
    render(){
        return (
            <View>
                {this.state.done ?
                    <ProductDetailScreen2 product={this.state.product} onBack={()=>this.onBack()} currentProduct={this.props.currentProduct}/>
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

            </View>
        )
    }
}

const mapStateToProps = state => {
    return{
        currentProduct: state.root.currentProduct
    }
};

export default connect(mapStateToProps)(ProductDetailScreen)

