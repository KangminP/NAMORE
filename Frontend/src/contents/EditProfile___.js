// import React, { Component } from "react";
// import { Redirect, Link } from "react-router-dom";
// import axios from "axios";

// import "./EditProfile.css";
// import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

// axios.defaults.xsrfCookieName = "csrftoken";
// axios.defaults.xsrfHeaderName = "X-CSRFToken";

// class EditProfile extends Component {
//   state = {
//     page: 1,
//     user_name: "",
//     // isNameValid: false, // 여기
//     user_password: "",
//     isPasswordValid: false,
//     user_email: "",
//     isEmailValid: false, // 여기
//     user_gender: "",
//     user_staff: "",
//     user_age: "",
//   };
//   inputClassNameHelper = (boolean) => {
//     switch (boolean) {
//       case true:
//         return "is-valid";
//       case false:
//         return "is-invalid";
//       default:
//         return "";
//     }
//   };

//   //   setId = (e) => {
//   //     this.setState({
//   //       user_id: e,
//   //     });
//   //   };

//   setPassword = (e) => {
//     this.setState({
//       user_password: e,
//     });
//   };

//   setPassword_confirm = (e) => {
//     this.setState({
//       user_password_confirm: e,
//     });
//   };

//   setEmail = (e) => {
//     this.setState({
//       user_email: e,
//     });
//   };

//   setName = (e) => {
//     this.setState({
//       user_name: e,
//     });
//   };

//   setGender = (e) => {
//     this.setState({
//       user_gender: e,
//     });
//   };

//   setStaff = () => {
//     if (this.state.user_staff) {
//       this.setState({
//         user_staff: false,
//       });
//     } else {
//       this.setState({
//         user_staff: true,
//       });
//     }
//   };

//   setAge = (e) => {
//     this.setState({
//       user_age: e,
//     });
//   };

//   //   onSubmit = (e) => {
//   //     let signupForm = new FormData();
//   //     signupForm.append("username", this.state.user_name);
//   //     signupForm.append("password", this.state.user_password);

//   //     sessionStorage.setItem("tmpname", this.state.user_name);
//   //     sessionStorage.setItem("tmppw", this.state.user_password);

//   //     axios
//   //       .post("http://j3d102.p.ssafy.io/api/auth/register/", signupForm, {
//   //         headers: {
//   //           Accept: "application/json",
//   //           "Content-Type": "multipart/form-data; boundary=---ssafy",
//   //         },
//   //       })
//   //       .then(function (res) {
//   //         let loginForm = new FormData();
//   //         loginForm.append("username", sessionStorage.getItem("tmpname"));
//   //         loginForm.append("password", sessionStorage.getItem("tmppw"));

//   //         axios
//   //           .post("http://j3d102.p.ssafy.io/api/auth/login/", loginForm, {
//   //             headers: {
//   //               Accept: "application/json",
//   //               "Content-Type": "multipart/form-data; boundary=---ssafy",
//   //             },
//   //           })
//   //           .then(function (res) {
//   //             alert(`${sessionStorage.getItem("tmpname")}님, 가입을 환영합니다!`);
//   //             sessionStorage.removeItem("tmpname");
//   //             sessionStorage.removeItem("tmppw");
//   //             sessionStorage.setItem("userToken", res.data.token);
//   //             sessionStorage.setItem("userData", res.data.user);
//   //             window.location.reload();
//   //           })
//   //           .catch(function (error) {
//   //             console.log("Login request failed");
//   //           });
//   //       })
//   //       .catch(function (error) {
//   //         alert("입력 정보를 다시 확인해주세요.");
//   //       });
//   //   };

//   // Signup Validation
//   //   validateName = (nameEntered) => {
//   //     //ID 검증
//   //     if (nameEntered.length > 6) {
//   //       this.setState({
//   //         isNameValid: true,
//   //         nameEntered,
//   //       });
//   //     } else {
//   //       this.setState({
//   //         isNameValid: false,
//   //         nameEntered,
//   //       });
//   //     }
//   //   };
//   //   isEnteredNameValid = () => {
//   //     const { nameEntered, isNameValid } = this.state;
//   //     if (nameEntered) return isNameValid;
//   //   };
//   //   renderNameFeedbackMessage() {
//   //     const { isNameValid } = this.state;
//   //     if (!isNameValid) {
//   //       return (
//   //         <div className="invalid-feedback">ID를 7자 이상 입력해주세요.</div>
//   //       );
//   //     }
//   //   }

//   validatePassword = (passwordEntered) => {
//     //Password 검증
//     if (passwordEntered.length > 7) {
//       this.setState({
//         isPasswordValid: true,
//         passwordEntered,
//       });
//     } else {
//       this.setState({
//         isPasswordValid: false,
//         passwordEntered,
//       });
//     }
//   };
//   isEnteredPasswordValid = () => {
//     const { passwordEntered, isPasswordValid } = this.state;
//     if (passwordEntered) return isPasswordValid;
//   };

//   handleOnPasswordInput(InputPassword) {
//     // password, passwordConfirm 비교
//     this.setState({ password: InputPassword });
//   }
//   handleOnConfirmPasswordInput(InputPasswordConfirm) {
//     this.setState({ confirmPassword: InputPasswordConfirm });
//   }
//   doesPasswordMatch() {
//     const { password, confirmPassword } = this.state;
//     return password === confirmPassword;
//   }

//   confirmPasswordClassName() {
//     const { confirmPassword } = this.state;

//     console.log(confirmPassword);
//     if (confirmPassword) {
//       return this.doesPasswordMatch() ? "is-valid" : "is-invalid";
//     }
//   }
//   renderPasswordFeedbackMessage() {
//     const { isPasswordValid } = this.state;
//     if (!isPasswordValid) {
//       return (
//         <div className="invalid-feedback">
//           패스워드를 8자 이상 입력해주세요.
//         </div>
//       );
//     }
//   }
//   renderPasswordConfirmFeedbackMessage() {
//     const { confirmPassword } = this.state;

//     if (confirmPassword) {
//       if (!this.doesPasswordMatch()) {
//         return (
//           <div className="invalid-feedback">패스워드가 일치하지 않습니다.</div>
//         );
//       }
//     }
//   }

//   validateEmail = (emailEntered) => {
//     //email 검증
//     const emailRegExp = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;

//     if (emailEntered.match(emailRegExp)) {
//       this.setState({
//         isEmailValid: true,
//         emailEntered,
//       });
//     } else {
//       this.setState({
//         isEmailValid: false,
//         emailEntered,
//       });
//     }
//   };
//   isEnteredEmailValid = () => {
//     const { emailEntered, isEmailValid } = this.state;
//     if (emailEntered) return isEmailValid;
//   };
//   renderEmailFeedbackMessage() {
//     const { isEmailValid } = this.state;
//     if (!isEmailValid) {
//       return (
//         <div className="invalid-feedback">E-mail 양식에 맞게 입력해주세요.</div>
//       );
//     }
//   }

//   isEveryBasicFieldValid = () => {
//     // id, password, passwordconfirm, email 다 맞아야 Next버튼 활성화
//     const { isEmailValid, isPasswordValid } = this.state;

//     return isEmailValid && isPasswordValid && this.doesPasswordMatch();
//   };

//   renderSubmitBasicBtn = () => {
//     if (this.isEveryBasicFieldValid()) {
//       return (
//         <button
//           type="submit"
//           className="editprofile-form-btn btn btn-outline-dark bg-light text-dark"
//           onClick={() => {
//             this.setState({
//               page: 2,
//             });
//           }}
//         >
//           Next
//         </button>
//       );
//     }
//     return (
//       <button
//         type="submit"
//         className="editprofile-form-btn btn btn-outline-dark bg-light text-dark"
//         disabled
//       >
//         Next
//       </button>
//     );
//   };

//   render() {
//     if (sessionStorage.getItem("userToken")) {
//       return (
//         <>
//           {this.state.page === 1 ? (
//             <div className="signup-background">
//               <div className="container vh-100 px-5 py-5 bg-transparent d-flex flex-column justify-content-between">
//                 <div className="d-flex flex-column justify-content-around">
//                   <h1 className="editprofile-form-title">Signup</h1>
//                   <div className="signup-pagination-div my-3 d-flex justify-content-center align-items-center">
//                     <nav aria-label="signup-pagination">
//                       <Pagination size="lg">
//                         <PaginationItem className="active">
//                           <PaginationLink>
//                             <span className="editprofile-form-pagination">
//                               기본 정보 입력
//                             </span>
//                           </PaginationLink>
//                         </PaginationItem>
//                         <PaginationItem>
//                           <PaginationLink>
//                             <span className="editprofile-form-pagination">
//                               재료 정보 입력
//                             </span>
//                           </PaginationLink>
//                         </PaginationItem>
//                       </Pagination>
//                     </nav>
//                   </div>
//                   <div className="form-box d-flex flex-column justify-content-between">
//                     <div className="form-group">
//                       <label
//                         className="editprofile-form-label"
//                         htmlFor="InputName"
//                       >
//                         Username
//                       </label>
//                       <input
//                         type="text"
//                         className={`form-control ${this.inputClassNameHelper(
//                           this.isEnteredNameValid()
//                         )}`}
//                         id="InputName"
//                         defaultValue={this.state.user_name}
//                         onChange={(e) => {
//                           this.setName(e.target.value);
//                           this.validateName(e.target.value); //여기
//                         }}
//                         readOnly
//                       />
//                       {this.renderNameFeedbackMessage()}
//                     </div>

//                     <div className="form-group">
//                       <label
//                         className="editprofile-form-label"
//                         htmlFor="InputPassword"
//                       >
//                         Password
//                       </label>
//                       <input
//                         type="password"
//                         className={`form-control ${this.inputClassNameHelper(
//                           this.isEnteredPasswordValid()
//                         )}`}
//                         id="InputPassword"
//                         defaultValue={this.state.user_password}
//                         onChange={(e) => {
//                           this.setPassword(e.target.value);
//                           this.validatePassword(e.target.value);
//                           this.handleOnPasswordInput(e.target.value); //요고
//                         }}
//                       />
//                       {this.renderPasswordFeedbackMessage()}
//                     </div>

//                     <div className="form-group">
//                       <label
//                         className="editprofile-form-label"
//                         htmlFor="InputPasswordConfirm"
//                       >
//                         Password Confirm
//                       </label>
//                       <input
//                         type="password"
//                         className={`form-control ${this.confirmPasswordClassName()}`}
//                         id="InputPasswordConfirm"
//                         defaultValue={this.state.confirmPassword}
//                         onChange={(e) => {
//                           this.handleOnConfirmPasswordInput(e.target.value);
//                         }}
//                       />
//                       {this.renderPasswordConfirmFeedbackMessage()}
//                     </div>

//                     <div className="form-group">
//                       <label
//                         className="editprofile-form-label"
//                         htmlFor="InputEmail"
//                       >
//                         Email
//                       </label>
//                       <input
//                         type="email"
//                         className={`form-control ${this.inputClassNameHelper(
//                           this.isEnteredEmailValid()
//                         )}`}
//                         id="InputEmail"
//                         defaultValue={this.state.user_email}
//                         onChange={(e) => {
//                           this.setEmail(e.target.value);
//                           this.validateEmail(e.target.value);
//                         }}
//                       />
//                       {this.renderEmailFeedbackMessage()}
//                     </div>

//                     <div className="form-group">
//                       <label
//                         className="editprofile-form-label"
//                         htmlFor="InputAge"
//                       >
//                         Age
//                       </label>
//                       <input
//                         type="integer"
//                         className="form-control"
//                         id="InputAge"
//                         defaultValue={this.state.user_age}
//                         onChange={(e) => {
//                           this.setAge(e.target.value);
//                         }}
//                       />
//                     </div>

//                     <div className="d-flex justify-content-between align-items-center">
//                       <div className="form-group w-50">
//                         <label
//                           className="editprofile-form-label"
//                           htmlFor="InputGender"
//                         >
//                           Gender
//                         </label>
//                         <select
//                           className="form-control vw-50"
//                           id="InputGender"
//                           onChange={(e) => {
//                             this.setGender(e.target.value);
//                           }}
//                           value={this.state.user_gender}
//                         >
//                           <option value="Male">Male</option>
//                           <option value="Female">Female</option>
//                           <option value="Other">Other</option>
//                         </select>
//                       </div>

//                       <div className="form-group w-25">
//                         <div className="custom-control custom-checkbox">
//                           {this.state.user_staff ? (
//                             <input
//                               type="checkbox"
//                               className="custom-control-input"
//                               id="InputStaff"
//                               defaultChecked
//                               onChange={() => {
//                                 this.setStaff();
//                               }}
//                             />
//                           ) : (
//                             <input
//                               type="checkbox"
//                               className="custom-control-input"
//                               id="InputStaff"
//                               onChange={() => {
//                                 this.setStaff();
//                               }}
//                             />
//                           )}
//                           <label
//                             className="editprofile-form-label custom-control-label"
//                             htmlFor="InputStaff"
//                           >
//                             Is Staff
//                           </label>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="d-flex justify-content-center">
//                   <div className="editprofileform-footer d-flex justify-content-between align-items-center w-100">
//                     <Link className="link-btn-text mt-3" to="/">
//                       <h2 className="text-dark">
//                         <i className="fas fa-arrow-circle-left"></i>
//                       </h2>
//                     </Link>

//                     {/* <button
//                       type="submit"
//                       className="editprofile-form-btn btn btn-outline-dark bg-light text-dark"
//                       onClick={() => {
//                         this.setState({
//                           page: 2,
//                         });
//                       }}
//                     >
//                       Next
//                     </button> */}
//                     {this.renderSubmitBasicBtn()}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="signup-background">
//               <div className="container vh-100 px-5 py-5 bg-transparent d-flex flex-column justify-content-between">
//                 <div className="d-flex flex-column justify-content-around">
//                   <h1 className="editprofile-form-title">Signup</h1>
//                   <div className="signup-pagination-div my-3 d-flex justify-content-center align-items-center">
//                     <nav aria-label="signup-pagination">
//                       <Pagination size="lg">
//                         <PaginationItem>
//                           <PaginationLink>
//                             <span className="editprofile-form-pagination">
//                               기본 정보 입력
//                             </span>
//                           </PaginationLink>
//                         </PaginationItem>
//                         <PaginationItem className="active">
//                           <PaginationLink>
//                             <span className="editprofile-form-pagination">
//                               재료 정보 입력
//                             </span>
//                           </PaginationLink>
//                         </PaginationItem>
//                       </Pagination>
//                     </nav>
//                   </div>

//                   <div className="form-box d-flex flex-column justify-content-between"></div>
//                 </div>

//                 <div className="d-flex justify-content-center">
//                   <div className="editprofileform-footer d-flex justify-content-between align-items-center w-100">
//                     <button
//                       type="submit"
//                       className="editprofile-form-btn btn btn-outline-dark bg-light text-dark"
//                       onClick={() => {
//                         this.setState({
//                           page: 1,
//                         });
//                       }}
//                     >
//                       Previous
//                     </button>
//                     <button
//                       type="submit"
//                       className="editprofile-form-btn btn btn-dark"
//                       onClick={() => {
//                         this.onSubmit();
//                       }}
//                     >
//                       Submit
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </>
//       );
//     }
//   }
// }

// export default EditProfile;
