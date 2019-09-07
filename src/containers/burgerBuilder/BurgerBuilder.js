import React, { Component } from "react";
import Wrapper from "../../hoc/Wrapper/Wrapper";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorhandler from "../../hoc/WithErrorHandler/WithErrorHandler";

const INGREDIENTS_PRICES = {
  salad: 1,
  bacon: 1.5,
  meat: 2.5,
  cheese: 2,
  tomato: 1.5
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    price: 9.99,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    axios
      .get("/ingredients.json")
      .then(resp => {
        const ingredients = resp.data;
        console.log(ingredients);

        this.setState({ ingredients: ingredients });
        this.purchasableHandler(ingredients);
      })
      .catch(error => this.setState({ error: true }));
  }

  purchasingHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    const queryParams = [];
    for (let key in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(key) +
          "=" +
          encodeURIComponent(this.state.ingredients[key])
      );
    }
    queryParams.push("price=" + this.state.price);
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString
    });
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

    let orderSummary = null;
    let burger = this.state.error ? (
      <p style={{ color: "red", textAlign: "center" }}>
        The Burger Builder can't be loaded
      </p>
    ) : (
      <Spinner />
    );

    if (this.state.ingredients) {
      burger = (
        <Wrapper>
          <Burger ingredients={this.state.ingredients} />
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
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          price={this.state.price}
          cancelPurchase={this.purchaseCancelHandler}
          continuePurchase={this.purchaseContinueHandler}
        />
      );
    }

    if (this.state.loading) orderSummary = <Spinner />;

    return (
      <Wrapper>
        <Modal
          show={this.state.purchasing}
          cancelPurchase={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Wrapper>
    );
  }
}

export default withErrorhandler(BurgerBuilder, axios);
