import React, { Component } from "react";
import Wrapper from "../../../hoc/Wrapper/Wrapper";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  componentDidUpdate() {
    console.log("Order Summary] : did Update");
  }

  render() {
    const ingredients = Object.keys(this.props.ingredients).map(igKey => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: "capitalize" }}>{igKey}</span>:
          {this.props.ingredients[igKey]}
        </li>
      );
    });

    return (
      <Wrapper>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients :</p>
        <ul>{ingredients}</ul>
        <p>
          <strong>TOTAL PRICE : {this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to Ckeckout ?</p>
        <Button btnType="Success" clicked={this.props.continuePurchase}>
          CONTINUE
        </Button>
        <Button btnType="Danger" clicked={this.props.cancelPurchase}>
          CANCEL
        </Button>
      </Wrapper>
    );
  }
}

export default OrderSummary;
