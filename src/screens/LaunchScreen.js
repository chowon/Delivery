import React, { Component } from 'react';
import firebase from 'firebase';
import { View, Alert, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

class LaunchScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    var config = {
      apiKey: "AIzaSyCwPsMLJNvm86oieTt0ELRRUoD8KYodtqw",
      authDomain: "auth-ca7c3.firebaseapp.com",
      databaseURL: "https://auth-ca7c3.firebaseio.com",
      projectId: "auth-ca7c3",
      storageBucket: "auth-ca7c3.appspot.com",
      messagingSenderId: "546236214646"
    };
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate('home');
      } else {
        this.props.navigation.navigate('auth');
      }
    });

    if (this.props.loggedIn) {
      this.props.navigation.navigate('home');
    }
  }

  componentDidUpdate() {
    this.renderPopup();
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


  render() {
    return (
      <View />
    );
  }
}

function mapStateToProps({ loggedIn, popup }) {
  return { loggedIn, popup: popup.msg };
}

export default connect(mapStateToProps, actions)(LaunchScreen);
