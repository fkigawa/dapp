import React from "react"
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {addCart} from "../../store/actions/products";
import {connect} from "react-redux"
class ProductButton extends React.Component{
    constructor(props){
        super(props);
    }
    onPressTile(data){
        alert("item added");
        console.log("Data in press tile is", data);
        this.props.addToCart(data);
    }
    render(){
        return (
        <View style={styles.container}>
            {this.props.products.map((data,i)=>{
                console.log("Data in render is", data);
                return (

                    <View>

                    <Image source={data.image} style={styles.imageSize}/>
                        <Text>{data.productName}</Text>
                        <Text>{data.price}</Text>
                    <TouchableOpacity key={i} onPress={()=>this.onPressTile(data)} style={styles.button} >
                        <Text style={styles.addToCart}> Add To Cart </Text>
                    </TouchableOpacity>
                    </View>
                )
            })}
        </View>
    )}
};

const mapStateToProps = state =>{
    return{
        cartItems: state.root.cartItems
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addToCart: (item) => dispatch(addCart(item))
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