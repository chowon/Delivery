import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation'; //createMaterialTopTabNavigator
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Icon } from 'react-native-elements';

import configureStore from './store'
import store from './store';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderScreen from './screens/OrderScreen';
import PinScreen from './screens/PinScreen';
import RecommendScreen from './screens/RecommendScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import RestaurantsScreen from './screens/RestaurantsScreen';

class App extends Component {
  render() {
    const { persistor, store } = configureStore();
    const MainNavigator = createBottomTabNavigator({
      home: createStackNavigator({
        home: { screen: HomeScreen },
        restaurants: createMaterialTopTabNavigator({
          // restaurants1: { screen: RestaurantScreen },
          // restaurants2: { screen: RestaurantScreen },
          // restaurants3: { screen: RestaurantScreen },
          // restaurants4: { screen: RestaurantScreen },
          restaurants1: { screen: ({ navigation }) => { return <RestaurantsScreen navigation={navigation} id={'1'} /> },
            navigationOptions: ({navigation}) => {
              return { title: (navigation.state.params && navigation.state.params.title ? navigation.state.params.title : '' ) }
            },
          },
          restaurants2: { screen: ({ navigation }) => { return <RestaurantsScreen navigation={navigation} id={'2'} /> },
            navigationOptions: ({navigation}) => {
              return { title: (navigation.state.params && navigation.state.params.title ? navigation.state.params.title : '' ) }
            },
          },
          restaurants3: { screen: ({ navigation }) => { return <RestaurantsScreen navigation={navigation} id={'3'} /> },
            navigationOptions: ({navigation}) => {
              return { title: (navigation.state.params && navigation.state.params.title ? navigation.state.params.title : '' ) }
            },
          },
          restaurants4: { screen: ({ navigation }) => { return <RestaurantsScreen navigation={navigation} id={'4'} /> },
            navigationOptions: ({navigation}) => {
              return { title: (navigation.state.params && navigation.state.params.title ? navigation.state.params.title : '' ) }
            },
          },
        }),
        restaurant: {
          screen: RestaurantScreen,
          navigationOptions: ({navigation}) => {
            return { title: (navigation.state.params && navigation.state.params.title ? navigation.state.params.title : '' ) }
          }
        }
      }),

      cart: createStackNavigator({
        cart: { screen: CartScreen },
        order: { screen: OrderScreen }
      }),
      pin: createStackNavigator({
        pin: { screen: PinScreen }
      }),
      recommend: createStackNavigator({
        recommend: { screen: RecommendScreen }
      })
    });

    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <View style={styles.container}>
            <MainNavigator />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default App;
