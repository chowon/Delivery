import React, { Component } from 'react';
import { View, Text, FlatList, Alert, StyleSheet } from 'react-native';
import { List, ListItem, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../actions';

class PinScreen extends Component {

  onListItemPress = (restaurant) => {
    this.props.navigation.navigate('restaurant', {restaurant});
  }

  renderItem = ({ item }) => {
    return (
      <ListItem
        title={item.name}
        subtitle={item.description}
        onPress={() => this.onListItemPress(item)}
      />
    );
  }

  render() {
    return (
      <List>
        <FlatList
          data={ _.values(this.props.restaurants)}
          renderItem={this.renderItem}
          keyExtractor={restaurant => restaurant.id.toString()}
        />
      </List>
    );
  }
}

function mapStateToProps({pin}) {
  return { restaurants: pin }
}

export default connect(mapStateToProps,actions)(PinScreen);
