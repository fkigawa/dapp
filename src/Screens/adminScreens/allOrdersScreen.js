import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, AsyncStorage,ListView,TouchableHighlight} from 'react-native';
import {connect} from 'react-redux'
import {addingUserId, addingAccessToken, addingDeliverer} from "../../store/actions/products";
import categoryNavigator from "../clientSide/MainTabs/CategoryNavigator";
import Icon from 'react-native-vector-icons/Feather';
import {urlLink} from "../../../keys"

let deliveryPortal;

class allOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      transactions: []
    })
  }

  backToClientSide = () => {
    categoryNavigator();
  }

  isDeliveryPortal = () => {
    console.log('im heree', this.props.isDeliverer)
    if (this.props.isDeliverer) {
      deliveryPortal = <View style={styles.icon}>
        <Icon size={40} color='grey' name="x" onPress={() => this.props.navigator.dismissModal({
          animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
        })}/>
      </View>
      return deliveryPortal
    }
  }

  updateOrders = () => {
    fetch(`${urlLink}/transactions`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json; charset=utf-8",
      },
      credentials: "include"
    }).then((response, err) => {
      return response.json()
    }).then((response, err) => {
      let transactionsArray = [];
      console.log("Response", response.transactions);
      let itemsArray = response.transactions;
      this.setState({
        transactions: itemsArray,
      });
      console.log(this.state.transactions[0])
    })
  };

  render() {
    return (
      <View style={styles.container}>
        {this.isDeliveryPortal()}
          <TouchableHighlight onPress={()=>this.updateOrders()} style={styles.addToCart}>
              <Text style={styles.addToCartText}>Update Orders</Text>
          </TouchableHighlight>
        {this.state.transactions.map(each => {
          return (
              <View style={styles.container2}>
                  <Text style={styles.text}>Deliver To: {each.fullName} {"\n"}At: {each.address}</Text>
                  <Text style={styles.text}>Contact: {each.phoneNumber} </Text>
                <Text style={styles.text}>Items Bought:</Text>
                  {each.products.map((item,i) =>{
                      return (<View>
                          <Text style={styles.text}> - {item.name} x {item.quantity}</Text>
                      </View>)
                  })}
          </View>)
        })}

      </View>
    );
  }
}

const mapStateToProps = state => {
  return{
    isDeliverer: state.root.isDeliverer,
  }
};

const mapDispatchToProps = dispatch => {
    return{
        addingDeliverer: ()=> dispatch(addingDeliverer()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(allOrders)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
      padding: 10
  },
    container2:{
        width:"100%",
        alignItems:"flex-start",
        borderBottomWidth: 1,
        borderColor: "#eee",
        marginBottom: 5,
        paddingBottom: 5
    },
    icon:{
        alignSelf: 'flex-start'
    },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  text: {
    fontSize: 22,
    padding: 2
  },
    addToCart:{
        backgroundColor: "#ec851d",
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 8,
        marginLeft: 10,
        marginBottom: 20
    },
    addToCartText:{
        fontFamily: "Helvetica Neue",
        fontSize: 15,
        fontWeight: "bold",
        color: "white",
    }
});
