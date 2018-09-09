import { AsyncStorage } from 'react-native';
import {
  RESTAURANT_LOADED,
  CATEGORY_LOADED
 } from './types';
import { category, restaurants } from '../../restaurant_datas';

export const loadRestaurant = () => dispatch => {
  dispatch({ type: RESTAURANT_LOADED, payload: restaurants });
};

export const loadCategory = () => dispatch => {
  dispatch({ type: CATEGORY_LOADED, payload: category });
};
