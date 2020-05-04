import React from "react";

import Aux from "../../../hoc/_Aux";
import Button from "../../ui/Button/Button";

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span
          style={{
            textTransform: "capitalize",
            fontWeight: "bold",
          }}
        >
          {igKey}
        </span>{" "}
        : {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your Orders</h3>
      <p>Delicious burger with the following ingredients :</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <b>Total Price : {props.price.toFixed(2)}</b>
      </p>
      <p>Continue to checkout?</p>
      <Button clicked={props.purchaseContinued} buttonType="Success">
        CONTINUE
      </Button>
      <Button clicked={props.purchaseCanceled} buttonType="Danger">
        CANCEL
      </Button>
    </Aux>
  );
};

export default OrderSummary;
