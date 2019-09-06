import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";

class ContactData extends Component {
  state = {
    name: "",
    phone: "",
    address: {
      street: "",
      number: ""
    }
  };
  render() {
    return (
      <div className={classes.ContactData}>
        <h3>Enter your contact data</h3>
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
        <Button btnType="Success">ORDER</Button>
      </div>
    );
  }
}

export default ContactData;
