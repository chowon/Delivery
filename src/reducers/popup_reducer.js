import {
  SHOW_POPUP,
  CONFIRM_POPUP
} from '../actions/types';

const initialState = {
  msg: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SHOW_POPUP:
    console.log(SHOW_POPUP, action.payload);
      return { msg: action.payload }
    case CONFIRM_POPUP:
      return initialState;
    default:
      return state;
  }
}
