import React from "react";
import classes from "./Order.css";

const order = props => {
  let ingredients = [];
  for (const ingredientName in props.ingredients) {
    if (props.ingredients[ingredientName] !== 0)
      ingredients.push({
        name: ingredientName,
        amount: props.ingredients[ingredientName]
      });
  }

  const ingredientsOutput = ingredients.map(ig => (
    <span key={ig.name}>
      {ig.name} ({ig.amount})
    </span>
  ));
  return (
    <div className={classes.Order}>
      <p>Ingredients : {ingredientsOutput}</p>
      <p>
        Price : <strong>{props.price} DH</strong>
      </p>
    </div>
  );
};

export default order;
