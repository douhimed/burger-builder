import * as actionTypes from "./actions";

const initialState = {
  ingredients: {
    salad: 1,
    bacon: 0,
    cheese: 1,
    tomato: 1,
    meat: 1
  },
  price: 9.99
};

const INGREDIENTS_PRICES = {
  salad: 1,
  bacon: 1.5,
  meat: 2.5,
  cheese: 2,
  tomato: 1.5
};

const reducer = (state = initialState, action) => {
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

    default:
      return state;
  }
};

export default reducer;
