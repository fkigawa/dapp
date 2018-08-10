/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import ProductCategoryButton from "../../components/Product_Category/ProductCategoryButton";
import {currentCategory} from "../../store/actions/products";
import {connect} from "react-redux"
type Props = {};
class GeolocationScreen extends Component<Props> {

    componentDidMount() {
      navigator.geolocation.requestAuthorization()
      console.log(navigator.geolocation.getCurrentPosition(geo_success))
    }

    changeCategoryHandler = category =>{
        this.props.changeCategory(category)
    };
    render() {
        return (
            <View style={styles.container}>
                <ProductCategoryButton changeCategory={this.changeCategoryHandler}/>
            </View>
        );
    }
}
const mapStateToProps = state => {
    return {
        categoryPage: state.root.currentCategory
    }
};

const mapDispatchToProps = dispatch =>{
    return{
        changeCategory: (category)=> dispatch(currentCategory(category))
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(GeolocationScreen)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: "row"
    }
});
