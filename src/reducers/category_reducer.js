// import _ from 'lodash';
import { REHYDRATE } from 'redux-persist';
import {
  CATEGORY_LOADED
 } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    // case REHYDRATE:
    //   return action.payload.category || [];
    case CATEGORY_LOADED:
      return action.payload;
    default:
      return state;
  }
}
