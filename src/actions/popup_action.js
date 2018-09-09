import {
  SHOW_POPUP,
  CONFIRM_POPUP
 } from './types';

export const showPopup = (message) => {
  return {
    type: SHOW_POPUP,
    payload: message
  };
};

export const confirmPopup = () => {
  return {
    type: CONFIRM_POPUP,
    payload: null
  }
}
