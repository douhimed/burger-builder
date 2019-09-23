import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";

import classes from "./NavigationItems.css";

const navigationItems = props => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact>
        My Burger
      </NavigationItem>
      <NavigationItem link="/orders">Orders</NavigationItem>
      <NavigationItem link="/login">Login</NavigationItem>
    </ul>
  );
};

export default navigationItems;
