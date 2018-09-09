import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';

class HomeScreen extends Component {

  componentWillMount() {
    this.props.loadCategory();
    this.props.loadRestaurant();
  }

  componentWillReceiveProps(nextProps) {

  }

  onButtonPress = (category) => {
    this.props.navigation.navigate(`restaurants${category.id}`, category);
  };

  renderButton = () => {
    const { category } = this.props;
    if (!category) {
      return <View />;
    }
    return category.map((c, i) =>
        <Button
          key={i}
          style={styles.buttonStyle}
          title={`${category[i].name}`}
          onPress={() => this.onButtonPress(category[i])}
        />
    );
  }

  renderAlbums() {
		return this.state.albums.map(album =>
			<AlbumDetail key={album.title} album={album} />
		);
	}

  render() {
    return (
      <View>
        {this.renderButton()}
      </View>
    );
  }
}

const styles = {
  buttonStyle: {
    backgroundColor: '#0288D1',
    marginTop: 15,
  }
}

function mapStateToProps({ category }) {
  return { category };
}

export default connect(mapStateToProps, actions)(HomeScreen);
// export default HomeScreen;
