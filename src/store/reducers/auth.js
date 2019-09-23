import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../Utility";
import { createUnzip } from "zlib";

const initialState = {
  token: null,
  userId: null,
  loading: null,
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return updateObject(state, { error: null, loading: true });
    case actionTypes.AUTH_SUCCESS:
      return updateObject(state, {
        token: action.token,
        userId: action.userId,
        error: null,
        loading: false
      });
    case actionTypes.AUTH_FAIL:
      return updateObject(state, {
        error: action.error,
        loading: false
      });
    default:
      return state;
  }
};

export default authReducer;
