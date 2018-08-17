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
import {currentCategory, changingFirstName, changingLastName} from "../../store/actions/products";
import mapNavigator from "./MainTabs/MapNavigator";
import {connect} from "react-redux";
import geolib from "geolib";
import Geocode from "react-geocode";
import geoKey from "../../../keys"
import {Spinner} from "nachos-ui"
import {urlLink} from "../../../keys"
type Props = {};

let options = {
  enableHighAccuracy: false,
  timeout: 5000,
  maximumAge: 0
};

let latInput;
let longInput;
let currentAddress;
let tooFar = false;

class CategoryScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = ({
      myAddress: '',
        done: false
    })
  }

    componentDidMount() {
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
            <View style={styles.container}>
              <ProductCategoryButton changeCategory={this.changeCategoryHandler} key={Math.random()}/>
            </View>

          </View>
        );
    }
}
const mapStateToProps = state => {
    return {
        categoryPage: state.root.currentCategory,
        firstName: state.root.firstName,
        lastName: state.root.lastName
    }
};

const mapDispatchToProps = dispatch =>{
    return{
        changeCategory: (category)=> dispatch(currentCategory(category)),
        changingFirstName: (firstName)=> dispatch(changingFirstName(firstName)),
        changingLastName: (lastName)=>  dispatch(changingLastName(lastName))
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(CategoryScreen)

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        flexDirection: "row"
    },
    address:{
      padding: 15
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
