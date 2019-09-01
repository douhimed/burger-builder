import React, { Component } from "react";
import Wrapper from "../../hoc/Wrapper";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENTS_PRICES = {
  salad: 1,
  bacon: 1.5,
  meat: 2.5,
  cheese: 1.99,
  tomato: 1.5
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      meat: 0,
      bacon: 0,
      cheese: 0,
      tomato: 0
    },
    price: 2.99
  };

  incrementIngredientHandler = type => {
    let oldQuantity = this.state.ingredients[type];
    const newQuantity = oldQuantity + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = newQuantity;

    const newPrice = this.state.price + INGREDIENTS_PRICES[type];

    this.setState({ ingredients: updatedIngredients, price: newPrice });
  };

  decrementIngredientHadler = type => {
    let oldQuantity = this.state.ingredients[type];
    if (oldQuantity <= 0) return;

    const newQuantity = oldQuantity - 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = newQuantity;

    const newPrice = this.state.price - INGREDIENTS_PRICES[type];

    this.setState({ ingredients: updatedIngredients, price: newPrice });
  };

  render() {
    let disabledInfo = { ...this.state.ingredients };
    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Wrapper>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          onIncrement={this.incrementIngredientHandler}
          onDecrement={this.decrementIngredientHadler}
          disabled={disabledInfo}
          price={this.state.price}
        />
      </Wrapper>
    );
  }
}

export default BurgerBuilder;
