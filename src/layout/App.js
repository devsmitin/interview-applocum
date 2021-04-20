import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "../styles/app.scss";

// components
import Header from "../components/header";

// pages
import Home from "../pages/home";
import Login from "../pages/login";
import Signup from "../pages/signup";
import ErrorPage from "../pages/errorpage";

import { checkNull, getCookie } from "../helper";
import { signin } from "../redux/user/userAction";

import config from "../config";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let token = getCookie("auth_token");
    let { setUser } = this.props;
    if (!checkNull(token)) {
      setUser(token);
    }
  }

  render() {
    let { appTitle, navLinks } = config;
    let { signed_in } = this.props.userData;

    return (
      <BrowserRouter>
        <Header title={appTitle} links={navLinks} user={signed_in} />
        <main className="main">
          {!signed_in ? (
            <Switch>
              <Route exact path="/signup" component={Signup} />
              <Route path="/" component={Login} />
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/" component={Home} />
              <Route component={ErrorPage} />
            </Switch>
          )}
        </main>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setUser: (token) => dispatch(signin(token)),
});
const mapStateToProps = (state) => ({
  userData: state.user,
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
