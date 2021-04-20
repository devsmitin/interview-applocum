import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import TextInput from "../components/textInput";
import Card from "../components/card";

import { checkNull, sendRequest, setCookie } from "../helper";
import { signin } from "../redux/user/userAction";
import config from "../config";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
    };
  }

  updateValue = (id, value) => {
    this.setState({
      [id]: value,
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();

    let button,
      buttonText = "";
    if (e.nativeEvent && e.nativeEvent.submitter) {
      button = e.nativeEvent.submitter;
      buttonText = button.textContent;
      button.textContent = button.dataset.processing
        ? button.dataset.processing
        : button.textContent;
    }

    let { setUser } = this.props;
    let { email, password } = this.state;

    let userObj = {
      user: {
        email,
        password,
      },
      role: "patient",
      device_detail: {
        device_type: "web",
        player_id: "",
      },
    };

    let res = await sendRequest(
      config.apiUrl + config.apiEndpoints.login,
      userObj
    );
    let { message, status, data } = res.data;

    switch (status) {
      case 200:
        let token = data.user.auth_token;
        setUser(token);
        setCookie("auth_token", token, 1);
        break;

      default:
        setCookie("auth_token", "", 0); // remove cookie in case of failed login
        break;
    }

    this.setState({
      status,
      message,
    });

    if (button && buttonText !== "") {
      button.textContent = buttonText;
    }
  };

  render() {
    let { message, status } = this.state;
    return (
      <div className="container py-5">
        <header className="header">
          <h3 className="text-center mb-3">Login</h3>
        </header>
        <div className="row">
          <div className="col-md-8 col-lg-6 mx-auto">
            <Card cardClasses="shadow border border-primary" cardTitle="Login">
              <form onSubmit={(e) => this.onSubmit(e)}>
                <TextInput
                  type="email"
                  id="email"
                  label="Email address"
                  placeholder="Enter email address"
                  updateValue={this.updateValue}
                  required
                />
                <TextInput
                  type="password"
                  id="password"
                  label="Password"
                  placeholder="Enter password"
                  updateValue={this.updateValue}
                  required
                />
                <div className="d-flex">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    data-processing="Logging in..."
                  >
                    Login
                  </button>
                  <Link to="/signup" className="btn btn-link ml-auto">
                    Click here to signup
                  </Link>
                </div>
              </form>
              {!checkNull(message) && (
                <div
                  className={`font-italic mt-3 ${
                    status !== 200 && "text-danger"
                  }`}
                >
                  {message}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setUser: (token) => dispatch(signin(token)),
});
export default connect(null, mapDispatchToProps)(Login);
