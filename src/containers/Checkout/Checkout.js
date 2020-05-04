import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Checkout/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 0,
      meat: 0,
      cheese: 0,
      bacon: 0,
    },
    totalPrice: 0,
  };
  continueCheckoutHandler = () => {
    this.props.history.push("/checkout/contact");
  };
  cancelCheckoutHandler = () => {
    this.props.history.goBack();
  };
  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted && this.props.location.data) {
      this.setState({
        ingredients: this.props.location.data.ingredients,
        totalPrice: this.props.location.data.totalPrice,
      });
    }
  }
  render() {
    let summary = <Redirect to="/" />;
    const purchaseRedirect = this.props.purchased ? <Redirect to="/" /> : null;
    if (this.props.ings) {
      summary = (
        <div>
          {purchaseRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            continueCheckout={this.continueCheckoutHandler}
            cancelCheckout={this.cancelCheckoutHandler}
          />
          <Route
            path={this.props.match.path + "/contact"}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStatetoProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased,
  };
};

export default connect(mapStatetoProps)(Checkout);
