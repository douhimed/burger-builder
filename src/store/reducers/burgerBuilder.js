import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "./../Utility";

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

function addIngredient(action, state) {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  return updateObject(state, {
    ingredients: updatedIngredients,
    price: state.price + INGREDIENTS_PRICES[action.ingredientName]
  });
}

function removeIngredient(action, state) {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  return updateObject(state, {
    ingredients: updatedIngredients,
    price: state.price - INGREDIENTS_PRICES[action.ingredientName]
  });
}

const burgerBuilderRducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(action, state);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(action, state);
    case actionTypes.FETCH_INGREDIENTS:
      return updateObject(state, {
        ingredients: action.ingredients,
        error: false,
        price: 9.99
      });
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, { error: true });
    default:
      return state;
  }
};

export default burgerBuilderRducer;
