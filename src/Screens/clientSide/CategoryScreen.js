/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-ui-lib';
import ProductCategoryButton from "../../components/Product_Category/ProductCategoryButton";
import {currentCategory} from "../../store/actions/products";
import mapNavigator from "./MainTabs/MapNavigator";
import {connect} from "react-redux";
import geolib from "geolib";
import Geocode from "react-geocode";
import geoKey from "../../../keys"
import {Spinner} from "nachos-ui"
type Props = {};

let options = {
  enableHighAccuracy: false,
  timeout: 5000,
  maximumAge: 0
};

let latInput;
let longInput;
let currentAddress;

class CategoryScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = ({
      myAddress: '',
        done: false
    })
  }

    componentDidMount() {
      Geocode.fromAddress("Twitch").then(
        response => {
          const { lat, lng } = response.results[0].geometry.location;
          latInput = lat;
          longInput = lng;
        },
        error => {
          console.error('heree', error);
        }
      );

      navigator.geolocation.requestAuthorization()

      navigator.geolocation.getCurrentPosition(
          (position) => {
            Geocode.setApiKey(geoKey);

            Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
              response => {
                const address = response.results[0].formatted_address;
                this.setState({
                  myAddress: address,
                    done: true
                });
                console.log(this.state.myAddress)
              },
              error => {
                console.error(error);
              }
            );

            let distance = geolib.getDistance(position.coords, {
                latitude: latInput,
                longitude: longInput
            });
            distance *= 0.000621371
            if (distance > 2) {
              alert('you are too far from a valid delivery location.')
            }
          },
          function() {
              alert('Position could not be determined.')
          }, options
      );
    }

    changeAddress = (myAddress) => {
      this.setState({myAddress})
    };

    changeCategoryHandler = category =>{
        this.props.changeCategory(category)
    };
    render() {
        return (
          <View>
            <View>
              <TextInput clearButtonMode="while-editing" placeholder="Enter your address" value={this.state.myAddress} onChangeText={(event)=>this.changeAddress(event)}/>
            </View>
            <View style={styles.container}>
              <ProductCategoryButton changeCategory={this.changeCategoryHandler} key={Math.random()}/>
            </View>

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
        justifyContent: 'space-between',
        flexDirection: "row"
    },
    addressBox:{
        backgroundColor: "rgba(236, 133, 29, .8)",
        padding: 5,
        alignItems: "center"
    },
    loader:{
        flex:1,
        flexDirection: "row",
        flexWrap: "wrap",
        transform:[{rotate:"270deg"}],
        alignItems: "center",
        justifyContent: "center"
    },
});
