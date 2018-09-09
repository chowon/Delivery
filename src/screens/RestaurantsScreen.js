import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Button, ListItem, List } from 'react-native-elements';
import _ from 'lodash';
import * as actions from '../actions';


class RestaurantsScreen extends Component {
  componentWillMount() {
    const { props } = this;
    const { id, category, restaurants } = props;
    this.setState({
      restaurant: restaurants[id],
      category: _.find(category, { id: parseInt(id) })
    })
  }

  componentDidMount() {
    this.updateTabBarLabels();
  }

  updateTabBarLabels = () => {
    this.props.navigation.setParams({ title: this.state.category.name })
  }

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
          data={ _.values(this.state.restaurant)}
          renderItem={this.renderItem}
          keyExtractor={restaurant => restaurant.id.toString()}
        />
      </List>
    );
  }
}

function mapStateToProps(state) {
  console.log('mapStateToProps', state);
  const { category, restaurants } = state;
  return { restaurants, category }
}

export default connect(mapStateToProps, actions)(RestaurantsScreen);
