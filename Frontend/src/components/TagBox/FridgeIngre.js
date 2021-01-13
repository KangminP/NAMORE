import React, { Component } from "react";

import { notification, Select, Tag } from "antd";

import axios from "axios";

import "./FridgeIngre.css";

import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";

class FridgeIngre extends Component {
  constructor() {
    super();
    this.state = {
      options: [],
      selectedItem: [],
      status: "view",
    };
  }

  sendData = (value) => {
    this.props.sendData(value);
  };

  // 등록한 재료 정보 받아오기 + 재료 정보 바탕으로 추천목록 받아오기
  async getMatList() {
    //전체 재료 데이터 목록 불러오기(ingre)
    const ingre = JSON.parse(localStorage.getItem("ingre"));
    // id, value 묶어서 저장(ingreData (Select 컴포넌트에서 사용되는 형식))
    let j = 0;
    let data = [];
    for (j = 0; j < ingre.length; j++) {
      let datum = {};
      datum.value = `${ingre[j].id} ${ingre[j].ingre_name}`;
      data.push(datum);
    }

    localStorage.setItem("newIngreData", JSON.stringify(data));
    const ingreData = JSON.parse(localStorage.getItem("newIngreData"));
    //ingreData를 state에 저장
    this.setState({
      options: ingreData,
    });
    //유저 냉장고 재료 정보 요청(재료 이름만 받음)
    const token = JSON.parse(sessionStorage.getItem("userToken"));
    try {
      const response = await axios.get(
        // "http://localhost:8000/api/auth/refri/",
        "http://j3d102.p.ssafy.io/api/auth/refri/",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: `Token ${token}`,
          },
        }
      );
      sessionStorage.setItem("userIngre", JSON.stringify(response.data));
      const userIngre = JSON.parse(sessionStorage.getItem("userIngre"));
      const ingre = JSON.parse(localStorage.getItem("ingre"));
      //유저가 보유한 재료 이름을 전체 데이터와 대조해서 보유한 재료 id값 찾아오는 로직
      var userSelected = [];
      for (var k of userIngre.values()) {
        for (var listIngre of ingre.values()) {
          if (k.ingre_name === listIngre.ingre_name) {
            userSelected.push(listIngre);
          }
        }
      }
      // 유저 재료id와 재료이름을 Select 컴포넌트에서 활용할 수 있는 형식으로 가공 후 state에 저장
      var toState = [];
      for (var userSelectedItem of userSelected) {
        toState.push(`${userSelectedItem.id} ${userSelectedItem.ingre_name}`);
      }
      this.setState({
        selectedItem: toState,
      });

      // 선택 재료 기반으로 추천 목록 받기
      try {
        const response = await axios.get(
          // "http://localhost:8000/api/auth/recommend_refri/",
          "http://j3d102.p.ssafy.io/api/auth/recommend_refri/",

          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json;charset=UTF-8",
              Authorization: `Token ${token}`,
            },
          }
        );
        // 받아온 목록을 Material 컴포넌트로 전달
        this.sendData(response.data);
      } catch (err) {
        // console.log(err);
      }
    } catch (err) {
      // console.log(err);
    }
  }

  componentDidMount() {
    this.getMatList();
    // //전체 재료 데이터 목록 불러오기(ingre)
    // const ingre = JSON.parse(localStorage.getItem("ingre"));

    // // id, value 묶어서 저장(ingreData (Select 컴포넌트에서 사용되는 형식))
    // let j = 0;
    // let data = [];
    // for (j = 0; j < ingre.length; j++) {
    //   let datum = {};
    //   datum.value = `${ingre[j].id} ${ingre[j].ingre_name}`;
    //   data.push(datum);
    // }
    // localStorage.setItem("newIngreData", JSON.stringify(data));
    // const ingreData = JSON.parse(localStorage.getItem("newIngreData"));

    // //ingreData를 state에 저장
    // this.setState({
    //   options: ingreData,
    // });

    // //유저 냉장고 재료 정보 요청(재료 이름만 받음)
    // const token = JSON.parse(sessionStorage.getItem("userToken"));
    // axios
    //   .get("http://localhost:8000/api/auth/refri/", {
    //     // .get("http://j3d102.p.ssafy.io/api/auth/refri/", {
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json;charset=UTF-8",
    //       Authorization: `Token ${token}`,
    //     },
    //   })
    //   .then((res) => {
    //     sessionStorage.setItem("userIngre", JSON.stringify(res.data));
    //     const userIngre = JSON.parse(sessionStorage.getItem("userIngre"));
    //     const ingre = JSON.parse(localStorage.getItem("ingre"));

    //     //유저가 보유한 재료 이름을 전체 데이터와 대조해서 보유한 재료 id값 찾아오는 로직
    //     var userSelected = [];
    //     for (var k of userIngre.values()) {
    //       for (var listIngre of ingre.values()) {
    //         if (k.ingre_name === listIngre.ingre_name) {
    //           userSelected.push(listIngre);
    //         }
    //       }
    //     }

    //     // 유저 재료id와 재료이름을 Select 컴포넌트에서 활용할 수 있는 형식으로 가공 후 state에 저장
    //     var toState = [];
    //     for (var userSelectedItem of userSelected) {
    //       toState.push(`${userSelectedItem.id} ${userSelectedItem.ingre_name}`);
    //     }
    //     this.setState({
    //       selectedItem: toState,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  tagRender(props) {
    const { label, onClose } = props;
    return (
      <Tag closable={true} onClose={onClose} style={{ marginRight: 3 }}>
        {label}
      </Tag>
    );
  }

  onCancel = () => {
    this.setState({ selectedItem: this.state.prev });
    this.setState({ status: "view" });
  };

  onEdit = () => {
    this.setState({ prev: this.state.selectedItem });
    this.setState({ status: "edit" });
  };

  onDelete = () => {
    this.setState({ prev: this.state.selectedItem });
    this.setState({ status: "delete" });
  };

  updateChoice = (e) => {
    this.setState({
      selectedItem: e,
    });
  };

  handleDelete = (data) => {
    const newData = this.state.selectedItem.filter((value) => value !== data);
    this.setState({
      selectedItem: newData,
    });
  };

  onSubmit = () => {
    const token = JSON.parse(sessionStorage.getItem("userToken"));
    const ingreForm = {
      my_ingre: [],
    };

    for (var my of this.state.selectedItem) {
      ingreForm.my_ingre.push(Number(my.split(" ")[0]));
    }

    axios
      // .post("http://localhost:8000/api/auth/refri/", ingreForm, {
      .post("http://j3d102.p.ssafy.io/api/auth/refri/", ingreForm, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        // window.location.reload();
        this.getMatList();
      })
      .catch((err) => {
        // alert("오류가 발생했습니다.");
        console.log(err);
      });

    this.setState({
      status: "view",
    });
  };

  openNotificationWithIcon = (type) => {
    notification[type]({
      message: "저장 성공!",
      description: "",
      duration: 2,
      placement: "bottomRight",
      top: 30,
    });
  };

  render() {
    //tag chips rendering component
    const chipRender = this.state.selectedItem.map((data) => {
      return (
        <>
          {this.state.status === "delete" ? (
            <li
              style={{
                listStyle: "none",
                margin: "0.5rem 0.3rem 0.5rem 0.3rem",
              }}
            >
              <Chip
                label={data}
                variant="outlined"
                onDelete={() => this.handleDelete(data)}
              />
            </li>
          ) : (
            <li
              style={{
                listStyle: "none",
                margin: "0.5rem 0.3rem 0.5rem 0.3rem",
              }}
            >
              <Chip label={data} variant="outlined" />
            </li>
          )}
        </>
      );
    });

    return (
      <>
        {/* <div className="container text-center mb-5 paperBg"> */}
        <div className="text-center w-100">
          <div className="chipBox row w-100 text-center mb-5">
            <Paper className="m-3 mt-5 ml-5 chipPaper d-flex flex-column justify-content-between">
              <div className="d-flex flex-column">
                <div className="chipPaperHeader d-flex">
                  <div className="container d-flex justify-content-between px-0">
                    <div className="row d-flex mr-0 justify-content-between align-items-center tag-bar">
                      <div className="col-sm-12 col-md-9 h-100 d-flex flex-start">
                        <h5 className="chipPaperHeaderTitle">
                          <i className="mx-2 fas fa-shopping-cart"></i> 내가
                          보유한 재료 ({this.state.selectedItem.length})
                        </h5>
                      </div>
                      <div className="col-sm-12 col-md-3 h-100 d-flex justify-content-around align-items-center">
                        {this.state.status === "edit" ? (
                          <></>
                        ) : this.state.status === "delete" ? (
                          <>
                            <i
                              className="fas fa-undo submitIcon chipPaperHeaderSub"
                              onClick={(e) => {
                                this.onCancel();
                              }}
                              data-toggle="tooltip"
                              data-placement="bottom"
                              title="취소하기"
                            ></i>
                            <i
                              className="far fa-save submitIcon chipPaperHeaderSub"
                              onClick={(e) => {
                                this.onSubmit();
                                this.openNotificationWithIcon("success");
                              }}
                              data-toggle="tooltip"
                              data-placement="bottom"
                              title="저장하기"
                            ></i>
                          </>
                        ) : (
                          <>
                            <i
                              className="far fa-edit submitIcon chipPaperHeaderSub"
                              onClick={(e) => {
                                this.onEdit();
                              }}
                              data-toggle="tooltip"
                              data-placement="bottom"
                              title="재료 수정하기"
                            ></i>
                            <i
                              className="far fa-trash-alt submitIcon chipPaperHeaderSub"
                              onClick={(e) => {
                                this.onDelete();
                              }}
                              data-toggle="tooltip"
                              data-placement="bottom"
                              title="재료 삭제하기"
                            ></i>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {this.state.status === "edit" ? (
                  <div className="chipInput h-100 mt-1 mb-3">
                    <div className="container my-3 px-0 h-100 text-center">
                      <div className="row d-flex justify-content-center align-items-center tag-bar mr-0">
                        <div className="col-sm-12 col-md-8 h-100">
                          <Select
                            style={{ width: "100%" }}
                            placeholder="재료를 선택해주세요."
                            mode="multiple"
                            showArrow
                            tagRender={this.tagRender}
                            options={this.state.options}
                            onChange={(e) => {
                              this.updateChoice(e);
                            }}
                          />
                        </div>
                        <div className="col-sm-12 col-md-4 h-100 my-3 text-center">
                          <div className="buttonTray h-100 d-flex justify-content-around align-items-center">
                            <i
                              className="fas fa-undo submitIcon chipPaperHeaderSub"
                              onClick={(e) => {
                                this.onCancel();
                              }}
                              data-toggle="tooltip"
                              data-placement="bottom"
                              title="취소하기"
                            ></i>
                            <i
                              className="far fa-save submitIcon chipPaperHeaderSub"
                              onClick={(e) => {
                                this.onSubmit();
                                this.openNotificationWithIcon("success");
                              }}
                              data-toggle="tooltip"
                              data-placement="bottom"
                              title="저장하기"
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="chipInput h-100 mt-1 mb-3">
                    <div className="container my-3">
                      <div className="row d-flex justify-content-around align-items-center tag-bar">
                        <div className="col-10 h-100"></div>
                        <div className="col-2 h-100"></div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="chipPaperBody container d-flex w-100">
                  {this.state.selectedItem.length > 0 ? (
                    <div className="row w-100 ml-1 mb-4">{chipRender}</div>
                  ) : (
                    <div className="row w-100 ml-1 mb-4 textcomment">
                      <span>보유중인 재료가 없습니다.</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="chipPaperFooter d-flex justify-content-end"></div>
            </Paper>
          </div>
        </div>
      </>
    );
  }
}

export default FridgeIngre;
