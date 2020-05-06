import React from "react";

import classes from "./NavigationMenu.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = (props) => {
  return (
    <ul className={classes.NavigationMenu}>
      <NavigationItem link="/" exact>
        Burger Builder
      </NavigationItem>
      <NavigationItem link="/my-orders" exact>
        My Orders
      </NavigationItem>
      {props.isAuthenticated ? (
        <NavigationItem link="/logout" exact>
          Logout
        </NavigationItem>
      ) : (
        <NavigationItem link="/authenticate" exact>
          Login / Signup
        </NavigationItem>
      )}
    </ul>
  );
};

export default NavigationItems;
