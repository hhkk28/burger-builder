import React from "react";

import classes from "./Toolbar.module.css";
import Logo from "../../ui/Logo/Logo";
import NavigationMenu from "../NavigationMenu/NavigationMenu";
import HamburgerIcon from "../../ui/HamburgerIcon/HamburgerIcon";

const Toolbar = (props) => (
  <header className={classes.Toolbar}>
    <HamburgerIcon clicked={props.toggleSideDrawer} open={props.iconOpen} />
    <Logo height="80%" />
    <nav className={classes.DesktopOnly}>
      <NavigationMenu isAuthenticated={props.isAuth} />
    </nav>
  </header>
);

export default Toolbar;
