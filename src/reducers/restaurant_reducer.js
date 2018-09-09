// import _ from 'lodash';
import { REHYDRATE } from 'redux-persist';
import {
  RESTAURANT_LOADED
 } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    // case REHYDRATE:
    //   return action.payload.restaurants || {};
    case RESTAURANT_LOADED:
      return action.payload;
    default:
      return state;
  }
}
