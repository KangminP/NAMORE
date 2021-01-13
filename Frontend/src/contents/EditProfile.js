import React, { Component } from "react";

// Component
import MyNavbar from "../components/Navbar/MyNavbar";
import MyLikeIngre from "../components/TagBox/MyLikeIngre";
import MyDislikeIngre from "../components/TagBox/MyDislikeIngre";

// axios
import axios from "axios";

// antd
import { InputNumber, Tabs } from "antd";

// CSS
import "./EditProfile.css";

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      page: 1,

      user_name: "",
      isNameValid: true,
      user_password: "",
      isPasswordValid: false,
      user_email: "",
      isEmailValid: false,
      user_gender: "Male",
      user_staff: "",
      user_age: "",
    };
  }

  componentDidMount() {
    const token = JSON.parse(sessionStorage.getItem("userToken"));
    axios
      .get("http://j3d102.p.ssafy.io/api/auth/user/", {
        // .get("http://localhost:8000/api/auth/user/", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        this.setState({
          user_name: res.data.username,
          user_email: res.data.email,
          user_gender: res.data.user_gender,
          user_age: res.data.user_age,
        });
        if (res.data.user_gender === "male") {
          this.setState({
            genderKey: "1",
          });
        } else if (res.data.user_gender === "female") {
          this.setState({
            genderKey: "2",
          });
        } else {
          this.setState({
            genderKey: "3",
          });
        }
      });
  }

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

  setId = (e) => {
    this.setState({
      user_id: e,
    });
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

  onFormSubmit = (e) => {
    let updateForm = new FormData();
    const token = JSON.parse(sessionStorage.getItem("userToken"));
    // updateForm.append("username", this.state.user_name);
    updateForm.append("password", this.state.user_password);
    updateForm.append("email", this.state.user_email);
    updateForm.append("user_gender", this.state.user_gender);
    updateForm.append("user_age", this.state.user_age);

    sessionStorage.setItem("tmpname", this.state.user_name);
    sessionStorage.setItem("tmppw", this.state.user_password);
    axios
      .put("http://j3d102.p.ssafy.io/api/auth/user/profile/", updateForm, {
        // .put("http://localhost:8000/api/auth/user/profile/", updateForm, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data; boundary=---ssafy",
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        // console.log("굿뜨");

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
            alert("성공적으로 수정했습니다.");
            sessionStorage.removeItem("tmpname");
            sessionStorage.removeItem("tmppw");
            sessionStorage.setItem("userToken", JSON.stringify(res.data.token));
            sessionStorage.setItem("userData", JSON.stringify(res.data.user));
          })
          .catch((err) => {
            alert(err);
          });
      })
      .catch((err) => {
        alert(err);
      });
  };

  validateName = (nameEntered) => {
    //ID 검증
    // if (nameEntered.length > 6) {
    //   this.setState({
    //     isNameValid: true,
    //     nameEntered,
    //   });
    // } else {
    //   this.setState({
    //     isNameValid: false,
    //     nameEntered,
    //   });
    // }
    this.setState({
      isNameValid: true,
      nameEntered: true,
    });
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
          }}
        >
          Submit
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
            Submit
          </a>
        </>
      );
    }
  };

  render() {
    const { TabPane } = Tabs;
    return (
      <div className="realBack">
        <MyNavbar />
        <div className="editProfileBackground">
          <div className="editProfileBox container">
            <div className="editProfileNavtab w-100">
              <Tabs defaultActiveKey="1">
                <TabPane tab="재료정보 수정" key="1">
                  <div className="editProfileTabBackground">
                    <div className="editProfileHeader"></div>
                    <div className="editProfileBody">
                      <div className="">
                        <MyLikeIngre />
                        <MyDislikeIngre />
                      </div>
                    </div>
                  </div>
                </TabPane>
                <TabPane className="tabTitle" tab="회원정보 수정" key="2">
                  <div className="editProfileTabBackground">
                    <div className="editProfileHeader">
                      <h4>회원정보 수정</h4>
                    </div>
                    <div className="editProfileBody">
                      <div className="container h-100 px-5 py-5 bg-transparent d-flex flex-column justify-content-between">
                        <div className="d-flex flex-column justify-content-around">
                          <div className="form-box d-flex flex-column justify-content-between">
                            <span className="labelText">* 필수</span>
                            <div className="form-group">
                              <label
                                className="signup-form-label reqField"
                                htmlFor="InputName"
                              >
                                * Username
                              </label>
                              <input
                                type="text"
                                disabled
                                className={`form-control is-valid ${this.inputClassNameHelper(
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
                                  this.handleOnConfirmPasswordInput(
                                    e.target.value
                                  );
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
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
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
                                  {/* <input
                              type="integer"
                              className="form-control"
                              id="InputAge"
                              defaultValue={this.state.user_age}
                              onChange={(e) => {
                                this.setAge(e.target.value);
                              }}
                              /> */}
                                </div>
                              </div>
                            </div>
                            <div className="d-flex justify-content-center">
                              <div className="signupform-footer d-flex justify-content-end align-items-center w-100">
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
                      </div>
                    </div>
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditProfile;
