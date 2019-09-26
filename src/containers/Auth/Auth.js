import React, { Component } from "react";
import Button from "./../../components/UI/Button/Button";
import Input from "./../../components/UI/Input/Input";
import classes from "./Auth.css";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";
import { updateObject, checkValidity } from "./../../shared/Utility";

class Auth extends Component {
  state = {
    constrols: {
      email: {
        label: "Mail Address",
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Mail Address"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        label: "Password",
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Your password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5
        },
        valid: false,
        touched: false
      }
    },
    isSignup: true
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.redirectAuthPath !== "/") {
      this.props.onSetAuthRedirectPath();
    }
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controles, {
      [controlName]: updateObject(this.state.constrols[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.constrols[controlName].validation
        ),
        touched: true
      })
    });

    this.setState({ constrols: updatedControls });
  };

  submitHandler = event => {
    event.preventDefault();

    this.props.onAuth(
      this.state.constrols.email.value,
      this.state.constrols.password.value,
      this.state.isSignup
    );
  };

  swithAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup };
    });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.constrols) {
      formElementsArray.push({
        id: key,
        config: this.state.constrols[key]
      });
    }
    let form = (
      <form onSubmit={this.submitHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            label={formElement.config.label}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button btnType="Success">SUBMIT</Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    let redirectAuth = null;
    if (this.props.isAuthenticated)
      redirectAuth = <Redirect to={this.props.redirectAuthPath} />;
    return (
      <div className={classes.Auth}>
        {redirectAuth}
        <h2>Authenticate</h2>
        {errorMessage}
        {form}
        <Button btnType="Danger" clicked={this.swithAuthModeHandler}>
          SWITCH TO {this.state.isSignup ? "SIGN IN" : "SIGN UP"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    redirectAuthPath: state.auth.redirectAuthPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.authRedirectPath("/"))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
