import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import categoryNavigator from "./MainTabs/CategoryNavigator"
import {connect} from "react-redux"
import ProductButton from "../../components/Product_Page/ProductButton"
import {urlLink} from "../../../keys"
type Props = {};
import {initializingProducts,changingQuantity} from "../../store/actions/products";
import {Spinner} from "nachos-ui";
import Icon from 'react-native-vector-icons/Feather';
class ProductsScreen extends Component<Props> {
  static navigatorButtons = {
    leftButtons: [
      {
        title: '< Categories', // for a textual button, provide the button title (label)
        id: 'back', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        // testID: 'e2e_rules', // optional, used to locate this view in end-to-end tests
        // disabled: true, // optional, used to disable the button (appears faded and doesn't interact)
        // disableIconTint: true, // optional, by default the image colors are overridden and tinted to navBarButtonColor, set to true to keep the original image colors
        // showAsAction: 'ifRoom', // optional, Android only. Control how the button is displayed in the Toolbar. Accepted valued: 'ifRoom' (default) - Show this item as a button in an Action Bar if the system decides there is room for it. 'always' - Always show this item as a button in an Action Bar. 'withText' - When this item is in the action bar, always show it with a text label even if it also has an icon specified. 'never' - Never show this item as a button in an Action Bar.
        // buttonColor: 'blue', // Optional, iOS only. Set color for the button (can also be used in setButtons function to set different button style programatically)
        // buttonFontSize: 14, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
        // buttonFontWeight: '600', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
      },
      {
        // icon: Icon, // for icon button, provide the local image asset name
        // id: 'add' // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
      }
    ]
  };

  constructor(props) {
    super(props);
    this.state = ({
      products: [],
        done: false
    })
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
    if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
      if (event.id == 'back') { // this is the same id field from the static navigatorButtons definition
        categoryNavigator()
      }
    }
  }

  componentDidMount = () => {
    fetch(`${urlLink}/products/${this.props.currentPage}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        credentials: "include"
    }).then((response) => {
        return response.json();
    }).then((response) => {
      let productArray = this.state.products.slice();
      productArray = response.products;
      // this.props.updatingProductList(response.products);
      this.setState ({
        products: productArray
      },()=>{
          let flag = true;
          for(let key in this.props.productQuantity){
              if(this.props.productQuantity[key]>0){
                  flag = false;
              }
          }
          if(flag) {
              this.state.products.map((item) => {
                  this.props.updatingProductQuant(item.name);
              });
          }
      });
    })
  };

  backToCategory = () => {
    categoryNavigator()
  };

  changeProductQuantity = (quantity,name) =>{

      let mappedCartItems = this.props.products.map((item,i)=>{
          if(item.name===name){
              item = {...item, quantity: quantity}
          }
          return item;
      });
      this.props.updatingProductList(mappedCartItems);

  };
  static navigatorStyle = {
        drawUnderNavBar: false,
        navBarTranslucent: true,
        navBarTransparent: true,
        navBarBackgroundColor: "#ec851d"
    };
  render() {

    return (


          <View style={styles.container}>
                {/*<Button title='B' onPress={()=>this.backToCategory()} style={styles.button}/>*/}

          <ProductButton
              key={Math.random()}
              products={this.state.products}
              currentProduct={this.props.currentProduct}
              changeProductQuantity={(quantity,name)=>this.changeProductQuantity(quantity,name)}
              navigator={this.props.navigator}
          />
          </View>


    );
  }
}
const mapDispatchToProps = dispatch =>{
    return {
        updatingProductQuant: (name)=> dispatch(initializingProducts(name)),
        changeQuantity: (quantity,name)=> dispatch(changingQuantity(quantity,name))
    }
};

const mapStateToProps = state => {
  return {
    currentPage: state.root.currentCategory,
      currentProduct: state.root.currentProduct,
      products: state.root.productList,
      productQuantity: state.root.productQuantity
  }
};
export default connect(mapStateToProps,mapDispatchToProps)(ProductsScreen)


const styles = StyleSheet.create({
  container: {
      justifyContent: 'space-between',
      flexDirection: "row",
      marginTop: 15
  },
    loader:{
        flex:1,
        flexDirection: "row",
        flexWrap: "wrap",
        transform:[{rotate:"270deg"}],
        alignItems: "center",
        justifyContent: "center"
    },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
    button:{
    alignItems: "flex-start",
    }
});
