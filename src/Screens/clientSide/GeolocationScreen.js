import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, MapView} from 'react-native';
// import MapComponent from '../../components/Map/MapComponent'
import ProductCategoryButton from "../../components/Product_Category/ProductCategoryButton";
import {currentCategory} from "../../store/actions/products";
import {connect} from "react-redux"
type Props = {};

class GeolocationScreen extends Component<Props> {

    componentDidMount() {
    }

    changeCategoryHandler = category =>{
        this.props.changeCategory(category)
    };


    render() {
        return (
            <View style={styles.container}>
                <Text>here</Text>
                {/* <MapComponent /> */}
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
    },
    map: {
        height: 400,
        marginTop: 80
    }
});
