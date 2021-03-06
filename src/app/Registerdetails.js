/**
 * Created by Medidi Venkataswamy on 6/21/2017.
 */
import React from "react";
import axios from "axios";
import { browserHistory } from "react-router";
import { isLoggedIn } from "./constants/IsLoggedIn";
const picture = require("./images/avengers.jpg");

export class Registerdetails extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      rePassword: "",
    };

    this.onClickSubmit = this.onClickSubmit.bind(this);
  }

  componentWillMount() {
    if (isLoggedIn()) {
      browserHistory.push("/detail");
    } else {
      browserHistory.push("/register");
    }
  }

  onClickSubmit(e) {
    e.preventDefault();
    let signUpData = {
      username: this.state.username,
      password: this.state.password,
      rePassword: this.state.rePassword,
    };
    console.log("username", signUpData.username);
    console.log("password", signUpData.password);
    console.log("rePassword", signUpData.rePassword);
    axios
      .post("http://localhost:8080/signup", signUpData)
      .then((res) => {
        console.log("Login response", res);
        this.onClickSubmitCallBack(res.data);
      })
      .catch((err) => {
        console.log("server error ", err);
      });
  }

  onClickSubmitCallBack(result) {
    if (result.error) {
      console.log("user name and password doesn't exist");
    } else {
      console.log("signup response", result);
      location.reload();
      browserHistory.push("/login");
    }
  }

  render() {
    return (
      <div className="container-fluid register-bg">
        <br />
        {/*<div className="row"><img src={picture} width="1344px" height="550px"/></div>*/}
        <div className="row register col-md-offset-3">
          <br />
          <div className="col-xs-10 form-group">
            <h3>
              <b>Register To Your Account</b>
            </h3>
            <br />
            <form onSubmit={this.onClickSubmit}>
              <label className="control-label " htmlFor="email">
                Username:
              </label>
              <input
                className="form-control"
                type="text"
                id="user"
                placeholder="Enter Username"
                value={this.state.username}
                onChange={(e) => {
                  this.setState({ username: e.target.value });
                }}
              />
              <br />
              <label className="control-label " htmlFor="email">
                Passcode:
              </label>
              <input
                className="form-control"
                type="passcode"
                id="pass"
                placeholder="Enter Password"
                value={this.state.password}
                onChange={(e) => {
                  this.setState({ password: e.target.value });
                }}
              />
              <br />
              <label className="control-label " htmlFor="email">
                Re-password:
              </label>
              <input
                className="form-control"
                type="ReEnter Password"
                id="pass"
                placeholder="ReEnter Password"
                value={this.state.rePassword}
                onChange={(e) => {
                  this.setState({ rePassword: e.target.value });
                }}
              />
              <br />
              <button
                type="submit"
                className="btn btn-primary btn-block"
                name="login"
                value="Registration"
              >
                Registration
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
