import React, { Component } from "react";
import Wrapper from "../../hoc/Wrapper/Wrapper";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

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
    price: 2.99,
    purchasable: false,
    purchasing: false
  };

  purchasingHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    console.log("continue");
  };

  purchasableHandler(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }

  incrementIngredientHandler = type => {
    let oldQuantity = this.state.ingredients[type];
    const newQuantity = oldQuantity + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = newQuantity;

    const newPrice = this.state.price + INGREDIENTS_PRICES[type];

    this.setState({ ingredients: updatedIngredients, price: newPrice });
    this.purchasableHandler(updatedIngredients);
  };

  decrementIngredientHadler = type => {
    let oldQuantity = this.state.ingredients[type];
    if (oldQuantity <= 0) return;

    const newQuantity = oldQuantity - 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = newQuantity;

    const newPrice = this.state.price - INGREDIENTS_PRICES[type];

    this.setState({ ingredients: updatedIngredients, price: newPrice });
    this.purchasableHandler(updatedIngredients);
  };

  render() {
    let disabledInfo = { ...this.state.ingredients };
    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Wrapper>
        <Burger ingredients={this.state.ingredients} />
        <Modal
          show={this.state.purchasing}
          cancelPurchase={this.purchaseCancelHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.price}
            cancelPurchase={this.purchaseCancelHandler}
            continuePurchase={this.purchaseContinueHandler}
          />
        </Modal>
        <BuildControls
          onIncrement={this.incrementIngredientHandler}
          onDecrement={this.decrementIngredientHadler}
          disabled={disabledInfo}
          price={this.state.price}
          purchasable={this.state.purchasable}
          ordered={this.purchasingHandler}
        />
      </Wrapper>
    );
  }
}

export default BurgerBuilder;
