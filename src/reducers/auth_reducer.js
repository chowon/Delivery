import { REHYDRATE } from 'redux-persist';
import {
  LOGGED_IN,
  SHOW_POPUP
} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case LOGGED_IN:
      if (!action.payload) {
        action.asyncDispatch({ type: SHOW_POPUP, payload: "인증 실패, 다시 시도해주세요." });
      }
      return action.payload;
    default:
      return state;
  }
}
