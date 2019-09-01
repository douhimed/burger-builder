import React from "react";
import Wrapper from "../../hoc/Wrapper";
import classes from "./Layout.css";

const layout = porps => {
  return (
    <Wrapper>
      <div>Toolbar, NavBar</div>
      <main className={classes.Content}>{porps.children}</main>
    </Wrapper>
  );
};

export default layout;
