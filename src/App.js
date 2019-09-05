import React, { Component } from "react";
import "./App.css";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/burgerBuilder/BurgerBuilder";

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <BurgerBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;
