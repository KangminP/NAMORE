import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";

import "./Signup.css";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { InputNumber } from "antd";

import MyLikeIngre from "../components/TagBox/MyLikeIngre";
import MyDislikeIngre from "../components/TagBox/MyDislikeIngre";

class SignUp extends Component {
  state = {
    page: 1,
    user_name: "",
    isNameValid: false, // 여기
    user_password: "",
    isPasswordValid: false,
    user_email: "",
    isEmailValid: false, // 여기
    user_gender: "male",
    user_staff: "",
    user_age: "",
  };
  inputClassNameHelper = (boolean) => {
    switch (boolean) {
      case true:
        return "is-valid";
      case false:
        return "is-invalid";
      default:
        return "";
    }
  };

  setPassword = (e) => {
    this.setState({
      user_password: e,
    });
  };

  setPassword_confirm = (e) => {
    this.setState({
      user_password_confirm: e,
    });
  };

  setEmail = (e) => {
    this.setState({
      user_email: e,
    });
  };

  setName = (e) => {
    this.setState({
      user_name: e,
    });
  };

  setGender = (e) => {
    this.setState({
      user_gender: e,
    });
  };

  setStaff = () => {
    if (this.state.user_staff) {
      this.setState({
        user_staff: false,
      });
    } else {
      this.setState({
        user_staff: true,
      });
    }
  };

  setAge = (e) => {
    this.setState({
      user_age: e,
    });
  };

  onIngreSubmit = (e) => {
    alert("가입을 축하드립니다!");
    this.setState({
      page: 1,
    });
  };

  onFormSubmit = (e) => {
    let signupForm = new FormData();
    signupForm.append("username", this.state.user_name);
    signupForm.append("password", this.state.user_password);
    signupForm.append("email", this.state.user_email);
    signupForm.append("user_age", this.state.user_age);
    signupForm.append("user_gender", this.state.user_gender);

    sessionStorage.setItem("tmpname", this.state.user_name);
    sessionStorage.setItem("tmppw", this.state.user_password);

    axios
      .post("http://j3d102.p.ssafy.io/api/auth/register/", signupForm, {
        // .post("http://localhost:8000/api/auth/register/", signupForm, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data; boundary=---ssafy",
        },
      })
      .then((res) => {
        // console.log(res.data);
        let loginForm = new FormData();
        loginForm.append("username", sessionStorage.getItem("tmpname"));
        loginForm.append("password", sessionStorage.getItem("tmppw"));

        axios
          .post("http://j3d102.p.ssafy.io/api/auth/login/", loginForm, {
            // .post("http://localhost:8000/api/auth/login/", loginForm, {
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data; boundary=---ssafy",
            },
          })
          .then((res) => {
            alert(
              `${sessionStorage.getItem(
                "tmpname"
              )} 님, 환영합니다. 재료 정보를 입력해주세요.`
            );
            sessionStorage.removeItem("tmpname");
            sessionStorage.removeItem("tmppw");
            sessionStorage.setItem("userToken", JSON.stringify(res.data.token));
            sessionStorage.setItem("userData", JSON.stringify(res.data.user));

            this.setState({
              page: 2,
            });
          })
          .catch((err) => {
            alert(err);
          });
      })
      .catch((err) => {
        alert(err);
      });
  };

  // Signup Validation
  validateName = (nameEntered) => {
    //ID 검증
    if (nameEntered.length > 6) {
      this.setState({
        isNameValid: true,
        nameEntered,
      });
    } else {
      this.setState({
        isNameValid: false,
        nameEntered,
      });
    }
  };
  isEnteredNameValid = () => {
    const { nameEntered, isNameValid } = this.state;
    if (nameEntered) return isNameValid;
  };
  renderNameFeedbackMessage() {
    const { isNameValid } = this.state;
    if (!isNameValid) {
      return (
        <div className="invalid-feedback">ID를 7자 이상 입력해주세요.</div>
      );
    }
  }

  validatePassword = (passwordEntered) => {
    //Password 검증
    if (passwordEntered.length > 7) {
      this.setState({
        isPasswordValid: true,
        passwordEntered,
      });
    } else {
      this.setState({
        isPasswordValid: false,
        passwordEntered,
      });
    }
  };
  isEnteredPasswordValid = () => {
    const { passwordEntered, isPasswordValid } = this.state;
    if (passwordEntered) return isPasswordValid;
  };

  handleOnPasswordInput(InputPassword) {
    // password, passwordConfirm 비교
    this.setState({ password: InputPassword });
  }
  handleOnConfirmPasswordInput(InputPasswordConfirm) {
    this.setState({ confirmPassword: InputPasswordConfirm });
  }
  doesPasswordMatch() {
    const { password, confirmPassword } = this.state;
    return password === confirmPassword;
  }

  confirmPasswordClassName() {
    const { confirmPassword } = this.state;

    if (confirmPassword) {
      return this.doesPasswordMatch() ? "is-valid" : "is-invalid";
    }
  }
  renderPasswordFeedbackMessage() {
    const { isPasswordValid } = this.state;
    if (!isPasswordValid) {
      return (
        <div className="invalid-feedback">
          패스워드를 8자 이상 입력해주세요.
        </div>
      );
    }
  }
  renderPasswordConfirmFeedbackMessage() {
    const { confirmPassword } = this.state;

    if (confirmPassword) {
      if (!this.doesPasswordMatch()) {
        return (
          <div className="invalid-feedback">패스워드가 일치하지 않습니다.</div>
        );
      }
    }
  }

  validateEmail = (emailEntered) => {
    //email 검증
    const emailRegExp = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;

    if (emailEntered.match(emailRegExp)) {
      this.setState({
        isEmailValid: true,
        emailEntered,
      });
    } else {
      this.setState({
        isEmailValid: false,
        emailEntered,
      });
    }
  };
  isEnteredEmailValid = () => {
    const { emailEntered, isEmailValid } = this.state;
    if (emailEntered) return isEmailValid;
  };
  renderEmailFeedbackMessage() {
    const { isEmailValid } = this.state;
    if (!isEmailValid) {
      return (
        <div className="invalid-feedback">E-mail 양식에 맞게 입력해주세요.</div>
      );
    }
  }

  isEveryBasicFieldValid = () => {
    // id, password, passwordconfirm, email 다 맞아야 Next버튼 활성화
    const { isNameValid, isEmailValid, isPasswordValid } = this.state;

    return (
      isNameValid && isEmailValid && isPasswordValid && this.doesPasswordMatch()
    );
  };

  renderSubmitBasicBtn = () => {
    if (this.isEveryBasicFieldValid()) {
      return (
        <button
          type="submit"
          className="signup-form-btn btn btn-outline-dark bg-light text-dark"
          onClick={(e) => {
            this.onFormSubmit();
            // console.log(this.state);
          }}
        >
          Next
        </button>
      );
    } else {
      return (
        <>
          <a
            role="button"
            type="submit"
            className="signup-form-btn-disabled btn btn-outline-dark bg-light text-black-50"
            disabled
          >
            Next
          </a>
        </>
      );
    }
  };

  render() {
    if (sessionStorage.getItem("userToken") && this.state.page === 1) {
      return (
        <>
          <Redirect to="/" />
        </>
      );
    } else {
      return (
        <>
          {this.state.page === 1 ? (
            <div className="signup-background h-100">
              <div className="container h-100 px-5 py-5 bg-transparent d-flex flex-column justify-content-between">
                <div className="d-flex flex-column justify-content-around">
                  <h1 className="signup-form-title">Signup</h1>
                  <div className="signup-pagination-div my-3 d-flex justify-content-center align-items-center">
                    <nav aria-label="signup-pagination">
                      <Pagination size="lg">
                        <PaginationItem className="active">
                          <PaginationLink>
                            <span className="signup-form-pagination">
                              기본 정보 입력
                            </span>
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink>
                            <span className="signup-form-pagination">
                              재료 정보 입력
                            </span>
                          </PaginationLink>
                        </PaginationItem>
                      </Pagination>
                    </nav>
                  </div>
                  <div className="form-box d-flex flex-column justify-content-between">
                    * 필수
                    <div className="form-group">
                      <label
                        className="signup-form-label reqField"
                        htmlFor="InputName"
                      >
                        * Username
                      </label>
                      <input
                        type="text"
                        className={`form-control ${this.inputClassNameHelper(
                          this.isEnteredNameValid()
                        )}`}
                        id="InputName"
                        defaultValue={this.state.user_name}
                        onChange={(e) => {
                          this.setName(e.target.value);
                          this.validateName(e.target.value); //여기
                        }}
                      />
                      {this.renderNameFeedbackMessage()}
                    </div>
                    <div className="form-group">
                      <label
                        className="signup-form-label reqField"
                        htmlFor="InputPassword"
                      >
                        * Password
                      </label>
                      <input
                        type="password"
                        className={`form-control ${this.inputClassNameHelper(
                          this.isEnteredPasswordValid()
                        )}`}
                        id="InputPassword"
                        defaultValue={this.state.user_password}
                        onChange={(e) => {
                          this.setPassword(e.target.value);
                          this.validatePassword(e.target.value);
                          this.handleOnPasswordInput(e.target.value); //요고
                        }}
                      />
                      {this.renderPasswordFeedbackMessage()}
                    </div>
                    <div className="form-group">
                      <label
                        className="signup-form-label reqField"
                        htmlFor="InputPasswordConfirm"
                      >
                        * Password Confirm
                      </label>
                      <input
                        type="password"
                        className={`form-control ${this.confirmPasswordClassName()}`}
                        id="InputPasswordConfirm"
                        defaultValue={this.state.confirmPassword}
                        onChange={(e) => {
                          this.handleOnConfirmPasswordInput(e.target.value);
                        }}
                      />
                      {this.renderPasswordConfirmFeedbackMessage()}
                    </div>
                    <div className="form-group">
                      <label
                        className="signup-form-label reqField"
                        htmlFor="InputEmail"
                      >
                        * Email
                      </label>
                      <input
                        type="email"
                        className={`form-control ${this.inputClassNameHelper(
                          this.isEnteredEmailValid()
                        )}`}
                        id="InputEmail"
                        defaultValue={this.state.user_email}
                        onChange={(e) => {
                          this.setEmail(e.target.value);
                          this.validateEmail(e.target.value);
                        }}
                      />
                      {this.renderEmailFeedbackMessage()}
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="container">
                        <div className="row">
                          <div className="col-6 pl-0">
                            <div className="form-group w-100">
                              <label
                                className="signup-form-label"
                                htmlFor="InputGender"
                              >
                                Gender
                              </label>
                              <select
                                className="form-control w-100"
                                id="InputGender"
                                onChange={(e) => {
                                  this.setGender(e.target.value);
                                }}
                                value={this.state.user_gender}
                              >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                              </select>
                            </div>
                          </div>

                          <div className="col-6 pr-0">
                            <div className="form-group w-100 d-flex flex-row-reverse">
                              <div className="d-flex flex-column">
                                <label
                                  className="signup-form-label"
                                  htmlFor="InputAge"
                                >
                                  Age
                                </label>
                                <InputNumber
                                  className="InputAge w-100"
                                  size="large"
                                  min={1}
                                  max={100}
                                  defaultValue={this.state.user_age}
                                  onChange={(e) => {
                                    this.setState({
                                      user_age: e,
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-center">
                  <div className="signupform-footer d-flex justify-content-between align-items-center w-100">
                    <Link className="link-btn-text mt-3" to="/">
                      <h2 className="text-dark">
                        <i className="fas fa-arrow-circle-left"></i>
                      </h2>
                    </Link>

                    {/* <button
                      type="submit"
                      className="signup-form-btn btn btn-outline-dark bg-light text-dark"
                      onClick={() => {
                        this.setState({
                          page: 2,
                        });
                      }}
                    >
                      Next
                    </button> */}
                    {this.renderSubmitBasicBtn()}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="signup-background h-100">
              <div className="container h-100 px-5 py-5 bg-transparent d-flex flex-column justify-content-between">
                <div className="d-flex flex-column justify-content-around">
                  <h1 className="signup-form-title">Signup</h1>
                  <div className="signup-pagination-div my-3 d-flex justify-content-center align-items-center">
                    <nav aria-label="signup-pagination">
                      <Pagination size="lg">
                        <PaginationItem>
                          <PaginationLink>
                            <span className="signup-form-pagination">
                              기본 정보 입력
                            </span>
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem className="active">
                          <PaginationLink>
                            <span className="signup-form-pagination">
                              재료 정보 입력
                            </span>
                          </PaginationLink>
                        </PaginationItem>
                      </Pagination>
                    </nav>
                  </div>
                </div>
                <div className="d-flex flex-column justify-content-end">
                  <div className="d-flex flex-column">
                    <MyLikeIngre />
                    <MyDislikeIngre />
                  </div>

                  <div className="d-flex justify-content-center">
                    <div className="signupform-footer d-flex justify-content-end align-items-center w-100">
                      {/* <button
                        type="submit"
                        className="signup-form-btn btn btn-outline-dark bg-light text-dark"
                        onClick={() => {
                          this.setState({
                            page: 1,
                          });
                        }}
                      >
                        Previous
                      </button> */}
                      <button
                        type="submit"
                        className="signup-form-btn btn btn-dark"
                        onClick={() => {
                          this.onIngreSubmit();
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      );
    }
  }
}

export default SignUp;
