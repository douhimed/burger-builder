import * as actionTypes from "../actions/actionTypes";
import reducer from "./burgerBuilder";
import { FETCH_ORDERS_START } from "./../actions/actionTypes";

const initialState = {
  loading: false,
  orders: [],
  purchased: false
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false
      };
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId
      };
      return {
        ...state,
        orders: state.orders.concat(newOrder),
        loading: false,
        purchased: true
      };
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: true
      };
    case actionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        loading: false
      };
    case actionTypes.FETCH_ORDERS_FAIL:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

export default orderReducer;
