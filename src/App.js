import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import MyOrders from "./containers/MyOrders/MyOrders";
import Authenticate from "./containers/Authentication/Authentication";
import Logout from "./containers/Authentication/Logout/Logout";
import * as actions from "./stores/actions/index";

class App extends Component {
  componentDidMount() {
    this.props.authenticationCheckHandler();
  }
  render() {
    let appRoutes = (
      <Switch>
        <Route path="/authenticate" component={Authenticate} />
        <Route path="/" component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      appRoutes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/authenticate" component={Authenticate} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/my-orders" component={MyOrders} />
          <Route path="/" component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>{appRoutes}</Layout>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    isAuthenticated: state.authentication.token !== null,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    authenticationCheckHandler: () => dispatch(actions.authStateCheck()),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(App);
