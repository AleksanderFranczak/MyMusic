import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ token, children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() =>
        localStorage.getItem("token") ? children : <Redirect to="/" />
      }
    />
  );
};

const mapStateToProps = (state) => ({
  token: state.token,
});

export default connect(mapStateToProps)(PrivateRoute);
