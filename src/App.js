import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import LoginView from "./views/LoginView";
import AppView from "./views/AppView";
import GlobalStyle from "./styles/GlobalStyle";
import theme from "./styles/theme";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import store from "./redux";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import CallBack from "./views/Callback";
import { Helmet } from "react-helmet";
import axios from "axios";
import queryString from "query-string";
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    console.log(error.response);
    if (error.response) {
      if (error.response.status === 401) {
        const params = queryString.stringify({
          client_id: "51db6b55ce174150928313d0b2d56190",
          response_type: "token",
          redirect_uri: "http://localhost:3000/callback",
          scope: "user-top-read",
        });
        window.location = `https://accounts.spotify.com/authorize?${params}`;
      }
    }

    return Promise.reject(error);
  }
);
class App extends Component {
  state = {
    accesToken: "",
  };

  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Helmet>
            <link
              href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap"
              rel="stylesheet"
            />
          </Helmet>
          <GlobalStyle />
          <Switch>
            <Route exact path="/" component={LoginView} />
            <Route exact path="/callback" component={CallBack} />

            <PrivateRoute path="/app">
              <AppView />
            </PrivateRoute>
          </Switch>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;
