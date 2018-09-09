import {
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_FROM_CART,
  ORDER
} from './types';

export const addToCart = (restaurant, menu) => {
  return {
    type: ADD_TO_CART,
    payload: {restaurant, menu}
  };
};

export const removeMenuFromCart = (menu) => {
  return {
    type: REMOVE_FROM_CART,
    payload: { menu }
  };
}

export const clearCart = () => {
  return {
    type: CLEAR_CART,
    payload: null
  };
}


export const order = () => {
  return {
    type: ORDER,
    payload: null
  };
};
