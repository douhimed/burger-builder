import React, { Component } from "react";
import Wrapper from "../../hoc/Wrapper";
import Burger from "../../components/Burger/Burger";

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      meat: 0,
      bacon: 0,
      cheese: 0
    }
  };

  render() {
    return (
      <Wrapper>
        <Burger ingredients={this.state.ingredients} />
        <div>Controls</div>
      </Wrapper>
    );
  }
}

export default BurgerBuilder;
