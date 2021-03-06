import React from "react";
import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
  { label: "Tomato", type: "tomato" }
];

const BuildControls = props => {
  return (
    <div className={classes.BuildControls}>
      <p>
        <strong>TOTAL PRICE : {props.price.toFixed(2)}</strong>
      </p>
      {controls.map(control => (
        <BuildControl
          key={control.label}
          label={control.label}
          onIncrement={() => props.onIncrement(control.type)}
          onDecrement={() => props.onDecrement(control.type)}
          disabled={props.disabled[control.type]}
        />
      ))}
      <button
        disabled={!props.purchasable}
        className={classes.OrderButton}
        onClick={props.ordered}
      >
        {props.isAuth ? "ORDER NOW" : "SIGN IN TO ORDER"}
      </button>
    </div>
  );
};

export default BuildControls;
