import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { Input } from '../components/Input';
import * as actions from '../actions';

class AuthScreen extends Component {

  state = {
    email: '',
    password: '',
    showLoading: false,
  }

  componentDidUpdate() {

  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loggedIn) {
      this.setState({ showLoading: false });
    }
  }

  logInOrSignUp = () => {
    const { email, password, showLoading } = this.state;
    this.setState({ showLoading: true });
    this.props.logInOrSignUp(email, password);
  }

  render() {
    const { email, password, showLoading, email_valid } = this.state;
    return (
      <View style={styles.container}>
        <Input
          placeholder="user@gmail.com"
          label="Email"
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />
        <Input
          secureTextEntry
          placeholder="password"
          label="Password"
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
        />
      <Button style={styles.button}
          title='LOG IN OR SIGN UP'
          activeOpacity={1}
          underlayColor="transparent"
          onPress={this.logInOrSignUp}
          loading={showLoading}
          loadingProps={{ size: 'small', color: 'white' }}
          disabled={showLoading}
          buttonStyle={{ height: 50, width: 250, backgroundColor: 'blue', borderWidth: 2, borderColor: 'white', borderRadius: 30 }}
          containerStyle={{ marginVertical: 10 }}
          titleStyle={{ fontWeight: 'bold', color: 'white' }}
        />
      </View>
    );
  }
}

function mapStateToProps({loggedIn}) {
  return { loggedIn };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 140,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  button: {
    top: 20
  }
});

export default connect(mapStateToProps, actions)(AuthScreen);
