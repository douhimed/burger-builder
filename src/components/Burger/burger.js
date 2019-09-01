import React from "react";

import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const Burger = props => {
  let _ingredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, index) => {
        return <BurgerIngredient key={igKey + index} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (_ingredients.length === 0)
    _ingredients = <p>Please add some ingredients</p>;

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {_ingredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
