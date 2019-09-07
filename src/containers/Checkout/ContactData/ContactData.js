import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
  state = {
    name: "",
    phone: "",
    address: {
      street: "",
      number: ""
    },
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Med",
        tel: "0654782153",
        address: {
          street: "Street 120",
          Number: 24,
          city: "Casa"
        },
        deliveryMethod: "festest"
      }
    };

    axios
      .post("/orders.json", order)
      .then(resp => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(err => console.log(err));
  };

  render() {
    let form = (
      <form>
        <input
          type="text"
          className={classes.Input}
          name="name"
          placeholder="Your Name"
        />
        <input
          type="phone"
          className={classes.Input}
          name="phone"
          placeholder="Your Phone"
        />
        <input
          type="text"
          className={classes.Input}
          name="street"
          placeholder="Street Name"
        />
        <input
          type="text"
          className={classes.Input}
          name="number"
          placeholder="House Number"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) form = <Spinner />;

    return (
      <div className={classes.ContactData}>
        <h3>Enter your contact data</h3>
        {form}
      </div>
    );
  }
}

export default ContactData;
