import React, { Component } from "react";

// css
import "./Home.css";

// 홈화면 FullPage
import "fullpage.js/vendors/scrolloverflow";
import ReactFullpage from "@fullpage/react-fullpage";
import { Redirect, Link } from "react-router-dom";

import axios from "axios";

class Home extends Component {
  state = {
    username: "",
    password: "",
  };

  inputUsername = (e) => {
    this.setState({
      username: e,
    });
  };

  inputPassword = (e) => {
    this.setState({
      password: e,
    });
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.onLogin();
    }
  };

  onLogin = () => {
    let loginForm = new FormData();

    loginForm.append("username", this.state.username);
    loginForm.append("password", this.state.password);

    axios
      .post("http://j3d102.p.ssafy.io/api/auth/login/", loginForm, {
        // .post("http://localhost:8000/api/auth/login/", loginForm, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data; boundary=---ssafy",
        },
      })
      .then(function (res) {
        alert(`${res.data.user.username}님, 환영합니다.`);
        sessionStorage.setItem("userToken", JSON.stringify(res.data.token));
        sessionStorage.setItem("userData", JSON.stringify(res.data.user));
        window.location.reload();
      })
      .catch(function (error) {
        alert(`${error.message}`);
        // console.log(error.message);
      });
  };

  render() {
    if (sessionStorage.getItem("userToken")) {
      return (
        <>
          <Redirect to="/Main" />
        </>
      );
    } else {
      return (
        <div>
          <ReactFullpage
            scrollOverflow={true}
            render={({ fullpageApi }) => {
              return (
                <div id="fullpage-wrapper">
                  {/* 1번 */}
                  <div className="section section1">
                    <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
                      <div className="container">
                        <div className="row d-flex justify-content-center">
                          <div className="col-12 d-flex flex-column align-items-center justify-content-center text-center w-100">
                            <h1 className="home-title">NAMORE</h1>
                            <h3 className="home-title-subtitle">
                              나의 모든 레시피
                            </h3>
                            <div class="row d-flex justify-content-center">
                              <div class="chevron"></div>
                              <div class="chevron"></div>
                              <div class="chevron"></div>
                              <span class="text">Scroll down</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* 2번 */}
                  {/* <div className="section section2">
                    <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
                      <h1 className="home-content-title">두번째 페이지</h1>
                      <h3 className="home-content-content"></h3>
                    </div>
                  </div> */}
                  {/* 3번 */}
                  <div className="section section3">
                    <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
                      <div className="container">
                        <div className="row d-flex justify-content-center">
                          <div className="col-sm-6 "></div>
                          <div className="col-sm-6 ">
                            <div className="my-5">
                              <h3 className="login-form-title">Sign In</h3>
                            </div>
                          </div>
                        </div>

                        <div className="login-form row d-flex justify-content-center">
                          <div className="col-sm-3 col-md-6"></div>
                          <div className="col-xs-12 col-sm-9 col-md-6 h-100">
                            <form className="h-100 mx-3 d-flex flex-column justify-content-around">
                              <div className="form-group">
                                <label
                                  className="login-form-label"
                                  htmlFor="InputUsername"
                                >
                                  Username
                                </label>
                                <input
                                  type="text"
                                  className="form-control bg-light"
                                  id="InputUsername"
                                  placeholder="Username Here"
                                  onChange={(e) => {
                                    this.inputUsername(e.target.value);
                                  }}
                                />
                              </div>
                              <div className="form-group">
                                <label
                                  className="login-form-label"
                                  htmlFor="InputPassword"
                                >
                                  Password
                                </label>
                                <input
                                  type="password"
                                  className="form-control bg-light"
                                  id="InputPassword"
                                  placeholder="Password Here"
                                  onChange={(e) => {
                                    this.inputPassword(e.target.value);
                                  }}
                                  onKeyPress={this.handleKeyPress}
                                />
                              </div>

                              <div className="mt-3 d-flex justify-content-end">
                                <Link className="mx-2" to="/Signup">
                                  <button
                                    type="button"
                                    className="login-btn btn btn-outline-dark bg-light text-dark"
                                  >
                                    Signup
                                  </button>
                                </Link>

                                <button
                                  type="button"
                                  className="login-btn btn btn-dark"
                                  onClick={(e) => {
                                    // console.log(this.state);
                                    this.onLogin();
                                  }}
                                >
                                  Login
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>

                      {/* <button onClick={() => fullpageApi.moveTo(1, 0)}>
                          Move top
                        </button> */}
                    </div>
                  </div>
                </div>
              );
            }}
          />
        </div>
      );
    }
  }
}

export default Home;
