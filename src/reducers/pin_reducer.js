import _ from 'lodash';
import { REHYDRATE } from 'redux-persist';
import { PIN_ADDED, SHOW_POPUP } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    // case REHYDRATE:
    //   console.log("REHYDRATE", action);
    //   return action.payload.pin || [];
    case PIN_ADDED:
      action.asyncDispatch({ type: SHOW_POPUP, payload: "즐겨찾기에 등록되었습니다." });
      return _.uniqBy([
        action.payload, ...state
      ], 'id');
    default:
      return state;
  }
}
