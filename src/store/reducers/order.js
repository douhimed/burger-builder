import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/Utility";

const initialState = {
  loading: false,
  orders: [],
  purchased: false
};

function purchaseBurgerSuccess(action, state) {
  const newOrder = updateObject(action.orderData, { id: action.orderId });
  return updateObject(state, {
    orders: state.orders.concat(newOrder),
    loading: false,
    purchased: true
  });
}

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return updateObject(state, { purchased: false });
    case actionTypes.PURCHASE_BURGER_START:
      return updateObject(state, { loading: true });
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(action, state);
    case actionTypes.PURCHASE_BURGER_FAIL:
      return updateObject(state, { loading: true });
    case actionTypes.FETCH_ORDERS_START:
      return updateObject(state, { loading: true });
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return updateObject(state, { orders: action.orders, loading: false });
    case actionTypes.FETCH_ORDERS_FAIL:
      return updateObject(state, { loading: true });
    default:
      return state;
  }
};

export default orderReducer;
