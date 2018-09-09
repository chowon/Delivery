import _ from 'lodash';
import { REHYDRATE } from 'redux-persist';
import { PIN_ADDED } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    // case REHYDRATE:
    //   console.log("REHYDRATE", action);
    //   return action.payload.pin || [];
    case PIN_ADDED:
      return _.uniqBy([
        action.payload, ...state
      ], 'id');
    default:
      return state;
  }
}
