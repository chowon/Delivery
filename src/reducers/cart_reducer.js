// import _ from 'lodash';
import { REHYDRATE } from 'redux-persist';
import {
  ADD_TO_CART,
  CLEAR_CART,
  ORDER,
  REMOVE_FROM_CART,
  SHOW_POPUP
 } from '../actions/types';

const initialState = { menus: [], restaurant: null }

export default function(state = initialState, action) {
  console.log('cart.state', state, action);
  switch (action.type) {
    // case REHYDRATE:
    //   return action.payload.category || [];
    case ADD_TO_CART:
      if (state.restaurant && action.payload.restaurant.id !== state.restaurant.id) {
        action.asyncDispatch({ type: SHOW_POPUP, payload: "다른 가게의 메뉴를 추가할 수 없습니다. 장바구니를 비우고 다시 시도해주세요." });
        return state;
      }
      return { restaurant: action.payload.restaurant, menus: [...state.menus, action.payload.menu] };
    case ORDER:
      console.log("ORDER!!!");
      action.asyncDispatch({ type: SHOW_POPUP, payload: "주문이 완료되었습니다." });
      return initialState;
    case REMOVE_FROM_CART:
      return { restaurant: state.restaurant, menus: state.menus.filter( menu => menu.id !== action.payload.menu.id) }
    case CLEAR_CART:
      return initialState;
    default:
      return state;
  }
}
