import React, { Component } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { List, ListItem, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../actions';

class CartScreen extends Component {

  static
  navigationOptions = ({ navigation }) => {
    return {
      headerRight:
        <Button
          title="비우기"
          onPress={navigation.getParam('onRightButtonPress') }
          backgroundColor= "rgba(0,0,0,0)"
          color="rgba(0, 122, 255, 1)"
        />
    };
  };


  componentWillMount() {
    this.props.navigation.setParams({onRightButtonPress: this.onRightButtonPress })
  }
  componentDidUpdate() {
    this.renderPopup();
  }

  onRightButtonPress = () => {
    this.props.clearCart()
  }

  onListItemPress(menu) {
    const restaurant = this.props.navigation.getParam('restaurant');
    Alert.alert(
      `장바구니에 ${menu.name}을 삭제하시겠습니까?`,
      `${menu.name}`,
      [
        {text: '예', onPress: () => this.props.removeMenuFromCart(menu)},
        {text: '아니요', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ],
      { cancelable: false }
    )
  }

  renderPopup = () => {
    if (this.props.popup) {
      Alert.alert(
        `${this.props.popup}`,
        "",
        [
          {text: '확인', onPress: () => this.props.confirmPopup(), style: 'cancel'},
        ],
        { cancelable: false }
      )
    }
  }

  renderItem = ({ item }) => {
    return (
      <ListItem
        title={item.name}
        subtitle={item.price}원
        onPress={() => this.onListItemPress(item)}
      />
    );
  }

  render() {

    return (
      <List>
        <FlatList
          data={ _.values(this.props.menus)}
          renderItem={this.renderItem}
          keyExtractor={menu => menu.id.toString()}
        />
        <Button
          title='주문하기'
          buttonStyle={styles.buttonStyle}
          raised
          onPress={this.props.order}
        />
      </List>
    );
  }
}

const styles = {
  buttonStyle: {
    backgroundColor: '#0288D1',
    marginTop: 15,
    marginBottom: 15
  }
}

function mapStateToProps({ cart, popup }) {
  return { menus: cart.menus, popup: popup.msg }
}

export default connect(mapStateToProps, actions)(CartScreen);
