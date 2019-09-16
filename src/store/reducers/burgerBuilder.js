import * as actionTypes from "../actions/actionTypes";

const initialState = {
  ingredients: null,
  price: 9.99,
  error: false
};

const INGREDIENTS_PRICES = {
  salad: 1,
  bacon: 1.5,
  meat: 2.5,
  cheese: 2,
  tomato: 1.5
};

const burgerBuilderRducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        price: state.price + INGREDIENTS_PRICES[action.ingredientName]
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        price: state.price - INGREDIENTS_PRICES[action.ingredientName]
      };
    case actionTypes.FETCH_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        error: false,
        price: 9.99
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      };
    default:
      return state;
  }
};

export default burgerBuilderRducer;
