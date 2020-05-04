import React, { Component } from "react";
import { connect } from "react-redux";

import SingleOrder from "../../components/Orders/SingleOrder/SingleOrder";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler";
import * as actions from "../../stores/actions/index";
import LoaderAnimation from "../../components/ui/LoaderAnimation/LoaderAnimation";

class MyOrders extends Component {
  componentDidMount() {
    // console.log("did mount");
    this.props.onFetchOrder();
  }
  render() {
    let ordersDisplay = <LoaderAnimation />;
    if (!this.props.loading) {
      if (this.props.orders) {
        ordersDisplay = this.props.orders.map((order) => (
          <SingleOrder
            key={order.id}
            ingredients={order.ingredients}
            totalPrice={+order.totalPrice}
          />
        ));
      } else {
        ordersDisplay = (
          <p
            style={{ textAlign: "center", margin: "15px", fontWeight: "bold" }}
          >
            You have not place any order yet
          </p>
        );
      }
    }
    return <div>{ordersDisplay}</div>;
  }
}

const mapStatetoProps = (state) => {
  return {
    orders: state.order.order,
    loading: state.order.loading,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    onFetchOrder: () => dispatch(actions.fetchOrders()),
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(withErrorHandler(MyOrders, axios));
