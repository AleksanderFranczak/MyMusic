import React, { useEffect } from "react";
import queryString from "query-string";

import { connect } from "react-redux";
import { setToken } from "../redux/actions";
const Callback = (props) => {
  let { access_token } = queryString.parse(window.location.hash);

  useEffect(() => {
    if (access_token) {
      //console.log("sending to app");

      localStorage.setItem("token", access_token);
      props.history.replace("/app");
    } else {
      //console.log("sending to login");
      props.history.replace("/");
    }
  });
  // props.history.replace("/");
  return <div>loading...</div>;
};

const mapDispatchToProps = {
  setToken,
};

export default connect(null, mapDispatchToProps)(Callback);
