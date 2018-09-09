import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';

class OrderScreen extends Component {

  render() {
    return (
      <List>
        <FlatList
          data={ _.values(this.props.restaurant)}
          renderItem={this.renderItem}
          keyExtractor={restaurant => restaurant.id.toString()}
        />
      </List>
    );
  }
}

function mapStateToProps(state) {

}

export default connect(mapStateToProps, actions)(OrderScreen);
