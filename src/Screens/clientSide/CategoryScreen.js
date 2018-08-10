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
import {connect} from "react-redux";
import geolib from "geolib";
import Geocode from "react-geocode";

type Props = {};

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

let latInput;
let longInput;

class CategoryScreen extends Component<Props> {

    componentDidMount() {
      Geocode.fromAddress("Twitch").then(
        response => {
          const { lat, lng } = response.results[0].geometry.location;
          latInput = lat;
          longInput = lng;
          console.log('hereeee', lat, lng);
        },
        error => {
          console.error('heree', error);
        }
      );

      navigator.geolocation.requestAuthorization()

      navigator.geolocation.getCurrentPosition(
            function(position) {
              var distance = geolib.getDistance(position.coords, {
                  latitude: latInput,
                  longitude: longInput
              })
              distance *= 0.000621371
              if (distance > 2) {
                alert('you are too far from a valid delivery location.')
              }
            },
            function() {
                alert('Position could not be determined.')
            },
            {
                enableHighAccuracy: true
            }
        );

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
export default connect(mapStateToProps,mapDispatchToProps)(CategoryScreen)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: "row"
    }
});
