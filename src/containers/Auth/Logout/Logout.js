import React from "react";
import { Redirect } from "react-router-dom";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";

class Logout extends React.Component {
  componentDidMount() {
    this.props.onLogout();
  }
  render() {
    return <Redirect too="/" />;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Logout);
