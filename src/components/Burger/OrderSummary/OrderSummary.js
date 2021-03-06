import React, { Component } from "react";
import Wrapper from "../../../hoc/Wrapper/Wrapper";
import Button from "../../UI/Button/Button";

const OrderSummary = props => {
  const ingredients = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:
        {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Wrapper>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients :</p>
      <ul>{ingredients}</ul>
      <p>
        <strong>TOTAL PRICE : {props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to Ckeckout ?</p>
      <Button btnType="Success" clicked={props.continuePurchase}>
        CONTINUE
      </Button>
      <Button btnType="Danger" clicked={props.cancelPurchase}>
        CANCEL
      </Button>
    </Wrapper>
  );
};

export default OrderSummary;
