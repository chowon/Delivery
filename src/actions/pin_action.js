import { PIN_ADDED } from './types';

export const addPin = (restaurant) => {
  return {
    type: PIN_ADDED,
    payload: restaurant
  };
};
