/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import ProductCategoryButton from "../components/Product_Category/ProductCategoryButton";

type Props = {};
export default class CategoryScreen extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <ProductCategoryButton />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: "row"
    }
});