import React, { Component } from 'react';
import { View, Text, FlatList, Alert, StyleSheet } from 'react-native';
import { List, ListItem, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';

class RestaurantScreen extends Component {
  static
  navigationOptions = ({ navigation }) => {
    return {
      headerRight:
        <Button
          title="즐겨찾기"
          onPress={navigation.getParam('onRightButtonPress') }
          backgroundColor= "rgba(0,0,0,0)"
          color="rgba(0, 122, 255, 1)"
        />
    };
  };

  constructor(props) {
    super(props);
    this.alertShowing = false;
  }



  componentWillMount() {
    this.props.navigation.setParams({onRightButtonPress: this.onRightButtonPress })
  }

  componentDidMount() {
    this.updateTabBarLabels();
  }

  componentDidUpdate() {

  }

  onRightButtonPress = () => {
    this.props.addPin(this.props.navigation.getParam('restaurant'));
  }

  updateTabBarLabels = () => {
    const restaurant = this.props.navigation.getParam('restaurant');
    this.props.navigation.setParams({ title: restaurant.name })
  }

  onListItemPress(menu) {
    const restaurant = this.props.navigation.getParam('restaurant');
    Alert.alert(
      `장바구니에 ${menu.name}을 담으시겠습니까?`,
      `${menu.name}`,
      [
        {text: '예', onPress: () => this.props.addToCart(restaurant, menu)},
        {text: '아니요', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ],
      { cancelable: false }
    )
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
    const restaurant = this.props.navigation.getParam('restaurant');
    return (
      <View>
        <Text>{restaurant.name}</Text>
        <Text>{restaurant.description}</Text>
        <Text>전화번호: {restaurant.phone}</Text>
        <Text>{restaurant.minimum}원 이상 주문 가능합니다.</Text>
        <List>
          <FlatList
            data={ restaurant.menu}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#0288D1',
    marginTop: 15,
    marginBottom: 15
  }
})

export default connect(null, actions)(RestaurantScreen);
