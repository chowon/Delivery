import React, { Component } from 'react';
import { View, Text, Image, Alert, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Card } from 'react-native-elements';
import Swipe from '../components/Swipe';
import store from '../store';

class RecommendScreen extends Component {

  static
  defaultProps = {
    recommends: [
      {
        id: '1',
        name: '햄버거',
        source: require('../../assets/image/burger.jpg')
      },
      {
        id: '2',
        name: '치킨',
        source: require('../../assets/image/chicken.jpg')
      },
      {
        id: '3',
        name: '족발',
        source: require('../../assets/image/jokbal.jpg')
      },
      {
        id: '4',
        name: '칼국수',
        source: require('../../assets/image/kalguksu.jpg')
      },
      {
        id: '5',
        name: '떡볶이',
        source: require('../../assets/image/tuckboki.jpg')
      },
    ]
  }

  renderCard(recommend) {
    return (
      <Card title={recommend.name}>
        <View style={{ height: 300 }}>
          <Image
            style={{ flex: 1,  width: undefined, height: undefined }}
            source={recommend.source}
          />
        </View>

      </Card>
    );
  }
  // <View style={styles.detailWrapper}>
  //   <Text>{job.company}</Text>
  //   <Text>{job.formattedRelativeTime}</Text>
  // </View>
  //
  renderNoMoreCards() {
    console.log("renderNoMoreCards",this.props);

    return (
      <View />
    )
  }

  onComplete = () => {

    const recommend = this.props.restaurants[Math.floor(Math.random() * 4 + 1)][Math.floor(Math.random() * 2)];
    Alert.alert(
      `추천 식당 ${recommend.name}입니다.`,
      `${recommend.name}`,
      [
        {text: '이동', onPress: () => this.props.navigation.navigate('restaurant', {restaurant: recommend})},
      ],
      { cancelable: false }
    )
  }

  render() {
    return (
      <View style={{ marginTop: 40 }}>
        <Text style={{ textAlign: "center"}}>
          좋아하면 오른쪽, 싫어하면 왼쪽으로 스와이프 해주세요
        </Text>
        <Swipe
          data={this.props.recommends}
          renderCard={this.renderCard}
          keyProp="id"
          renderNoMoreCards={this.renderNoMoreCards.bind(this)}
          onComplete={this.onComplete}
        />
      </View>
    );
  }
}
// onSwipeRight={job => this.props.likeJob(job)}
//renderNoMoreCards={this.renderNoMoreCards.bind(this)}
const styles = StyleSheet.create({
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  }
})

function mapStateToProps({ restaurants }) {
  return { restaurants }
}

export default connect(mapStateToProps)(RecommendScreen);
