import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import { logMeOut, setCookie } from "../helper";
import { signout } from "../redux/user/userAction";
import config from "../config";
import { emptyCart } from "../redux/cart/cartAction";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  logOut = async () => {
    let { userData, signout, emptyCart } = this.props;
    let res = await logMeOut(
      config.apiUrl + config.apiEndpoints.logout,
      userData.auth_token
    );
    if (res.data.status === 200) {
      setCookie("auth_token", "", 0); // remove cookie at logout
      signout(); // signout user
      emptyCart(); // empty the cart as well
    }
  };

  render() {
    let { title, links, user, cartData } = this.props;
    let cartCount = cartData.length;

    return (
      <header className="header">
        <nav className="navbar navbar-expand navbar-light bg-light border-bottom sticky-top">
          <NavLink className="navbar-brand p-0" exact to="/">
            {title}
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={"navbar-collapse collapse"}>
            <ul className="navbar-nav ml-auto">
              {links &&
                links.map((link, index) => {
                  return (
                    <li className="nav-item" key={index}>
                      <NavLink className="nav-link" exact to={link.to}>
                        {link.title}
                      </NavLink>
                    </li>
                  );
                })}

              {user ? (
                <>
                  <li className="nav-item">
                    <span className="nav-link">
                      Cart{" "}
                      <span className="badge badge-secondary">{cartCount}</span>
                    </span>
                  </li>
                  <li className="nav-item">
                    <span className="nav-link" onClick={this.logOut}>
                      Logout
                    </span>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <NavLink className="nav-link" exact to={"/login"}>
                    Login
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  signout: () => dispatch(signout()),
  emptyCart: () => dispatch(emptyCart()),
});
const mapStateToProps = (state) => ({
  userData: state.user,
  cartData: state.cart,
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
