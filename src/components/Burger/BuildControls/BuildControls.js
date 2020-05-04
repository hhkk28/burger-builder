import React from "react";
import classes from "./BuildControls.module.css";
import BuildControlOption from "./BuildControlOption/BuildControlOption";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Meat", type: "meat" },
  { label: "Cheese", type: "cheese" },
];

const BuildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price : <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map((control) => (
        <BuildControlOption
          type={control.type}
          key={control.label}
          label={control.label}
          ingredientAdded={() => props.ingredientAdded(control.type)}
          ingredientRemoved={() => props.ingredientRemoved(control.type)}
          disabledButton={props.disabledButtons[control.type]}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.purchaseModalShow}
      >
        ORDER NOW
      </button>
    </div>
  );
};

export default BuildControls;
