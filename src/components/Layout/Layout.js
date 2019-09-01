import React from "react";
import Wrapper from "../../hoc/Wrapper";

const layout = porps => {
  return (
    <Wrapper>
      <div>Toolbar, NavBar</div>
      <main>{porps.children}</main>
    </Wrapper>
  );
};

export default layout;
