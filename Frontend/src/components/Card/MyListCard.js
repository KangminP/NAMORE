import React, { Component } from "react";
import { Link } from "react-router-dom";
import { notification } from "antd";

import axios from "axios";
import "./MyListCard.css";

import StarRatingComponent from "react-star-rating-component";

// const MyListCard = (props) => {
class MyListCard extends Component {
  constructor() {
    super();
    this.state = {
      rateDifficulty: 0,
      rateFlavor: 0,
      rateClean: 0,
      rateReuse: 0,
      ratelist: [],
    };
  }

  componentDidMount() {
    const token = JSON.parse(sessionStorage.getItem("userToken"));
    const recipeId = this.props.recipeId;
    axios
      .get(`http://j3d102.p.ssafy.io/api/rank/kangmin/${recipeId}/`, {
        // .get(`http://localhost:8000/api/rank/kangmin/${recipeId}/`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        // console.log(res.data[0].rank_difficulty);
        this.setState({
          rateDifficulty: res.data[0].rank_difficulty,
          rateFlavor: res.data[0].rank_flavor,
          rateClean: res.data[0].rank_clean,
          rateReuse: res.data[0].rank_reuse,
        });
      });
  }

  onStar1Click(nextValue, prevValue, name) {
    this.setState({ rateDifficulty: nextValue });
  }

  onStar2Click(nextValue, prevValue, name) {
    this.setState({ rateFlavor: nextValue });
  }

  onStar3Click(nextValue, prevValue, name) {
    this.setState({ rateClean: nextValue });
  }

  onStar4Click(nextValue, prevValue, name) {
    this.setState({ rateReuse: nextValue });
  }

  openNotificationWithIcon = (type) => {
    notification[type]({
      message: "저장 성공!",
      description: "",
      duration: 2,
      placement: "bottomRight",
      top: 30,
    });
  };

  openNotificationWithIcon2 = (type) => {
    notification[type]({
      message: "삭제 성공!",
      description: "",
      duration: 2,
      placement: "bottomRight",
      top: 30,
    });
  };

  onSave = () => {
    const token = JSON.parse(sessionStorage.getItem("userToken"));
    const recipeId = this.props.recipeId;

    const a = this.state.rateDifficulty;
    const b = this.state.rateFlavor;
    const c = this.state.rateClean;
    const d = this.state.rateReuse;
    // console.log(a);
    // console.log(b);

    let ranklist = [];
    ranklist.push(a);
    ranklist.push(b);
    ranklist.push(c);
    ranklist.push(d);
    // console.log(ranklist);

    this.setState({ ratelist: ranklist }, function () {
      // console.log(this.state.ratelist);

      const recipeRank = this.state.ratelist;
      // console.log(recipeRank);

      const rankForm = {
        recipe: recipeId,
        ranks: recipeRank,
      };

      axios
        .post("http://j3d102.p.ssafy.io/api/rank/", rankForm, {
          // .post("http://localhost:8000/api/rank/", rankForm, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: `Token ${token}`,
          },
        })
        .then((res) => {
          // console.log("성공");
          // console.log(rankForm.ranks[0]);
          // console.log(rankForm.ranks[1]);
          // console.log(rankForm.ranks[2]);
          // console.log(rankForm.ranks[3]);
          // this.setState({
          //   rateDifficulty: rankForm.ranks[0],
          //   rateFlavor: rankForm.ranks[1],
          //   rateClean: rankForm.ranks[2],
          //   rateReuse: rankForm.ranks[3],
          // });
        })
        .catch((err) => {
          // console.log("err");
        });
      // console.log("저장완료");
    });

    // const recipeRank = this.state.ratelist;
    // console.log(recipeRank);

    // const rankForm = {
    //   recipe: recipeId,
    //   ranks: recipeRank,
    // };

    // axios
    //   // .post("http://j3d102.p.ssafy.io/api/auth/user/recipe/", likerecipeForm, {
    //   .post("http://localhost:8000/api/rank/", {
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json;charset=UTF-8",
    //       Authorization: `Token ${token}`,
    //     },
    //   })
    //   .then((res) => {
    //     console.log("성공");
    //   })
    //   .catch((err) => {
    //     console.log("err");
    //   });
    // console.log("저장완료");
  };

  onDelete = () => {
    const token = JSON.parse(sessionStorage.getItem("userToken"));
    const recipeId = this.props.recipeId;

    let ranklist = [];
    this.setState({ ratelist: ranklist }, function () {
      // console.log(this.state.ratelist);

      const recipeRank = this.state.ratelist;
      // console.log(recipeRank);

      const rankForm = {
        recipe: recipeId,
        ranks: recipeRank,
      };

      axios
        .post("http://j3d102.p.ssafy.io/api/rank/", rankForm, {
          // .post("http://localhost:8000/api/rank/", rankForm, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: `Token ${token}`,
          },
        })
        .then((res) => {})
        .catch((err) => {
          // console.log("err");
        });
      // console.log("저장완료");
    });

    const likerecipeForm = {
      recipe_pk: recipeId,
    };
    axios.post(
      "http://j3d102.p.ssafy.io/api/auth/user/recipe/",
      likerecipeForm,
      {
        // .post("http://localhost:8000/api/auth/user/recipe/", likerecipeForm, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Token ${token}`,
        },
      }
    );
    window.location.reload();
  };

  render() {
    const { rateDifficulty, rateFlavor, rateClean, rateReuse } = this.state;
    const recipeId = this.props.recipeId;
    const recipeImg = this.props.recipeImg;
    return (
      <div className="mycontainer">
        <div className="mycard">
          <div className="imgBx">
            <img className="myimg" src={recipeImg} alt="" />
          </div>

          <div className="contentBx">
            <div className="content w-100">
              <div className="d-flex flex-column align-items-center justify-content-between w-100">
                <div className="d-flex align-items-center">
                  <p>난이도</p>
                </div>
                <div
                  className="d-flex align-items-center"
                  style={{ fontSize: 40, height: "50px" }}
                >
                  <StarRatingComponent
                    name="rate1"
                    starCount={5}
                    value={rateDifficulty}
                    onStarClick={this.onStar1Click.bind(this)}
                    style={{ fontSize: 40, margin: 0 }}
                    renderStarIcon={(index, value) => (
                      <span className="ratingStarSize">
                        <i
                          className={
                            index <= value
                              ? "ratingStar fas fa-star"
                              : "ratingStarEmpty far fa-star"
                          }
                        />
                      </span>
                    )}
                  />
                </div>
              </div>
              <div className="d-flex flex-column align-items-center justify-content-between w-100">
                <div className="d-flex align-items-center">
                  <p>맛</p>
                </div>
                <div
                  className="d-flex align-items-center"
                  style={{ fontSize: 40, height: "50px" }}
                >
                  <StarRatingComponent
                    name="rate2"
                    starCount={5}
                    value={rateFlavor}
                    onStarClick={this.onStar2Click.bind(this)}
                    style={{ fontSize: 40, margin: 0 }}
                    renderStarIcon={(index, value) => (
                      <span className="ratingStarSize">
                        <i
                          className={
                            index <= value
                              ? "ratingStar fas fa-star"
                              : "ratingStarEmpty far fa-star"
                          }
                        />
                      </span>
                    )}
                  />
                </div>
              </div>
              <div className="d-flex flex-column align-items-center justify-content-between w-100">
                <div className="d-flex align-items-center">
                  <p>뒷정리</p>
                </div>
                <div
                  className="d-flex align-items-center"
                  style={{ fontSize: 40, height: "50px" }}
                >
                  <StarRatingComponent
                    name="rate3"
                    starCount={5}
                    value={rateClean}
                    onStarClick={this.onStar3Click.bind(this)}
                    style={{ fontSize: 40, margin: 0 }}
                    renderStarIcon={(index, value) => (
                      <span className="ratingStarSize">
                        <i
                          className={
                            index <= value
                              ? "ratingStar fas fa-star"
                              : "ratingStarEmpty far fa-star"
                          }
                        />
                      </span>
                    )}
                  />
                </div>
              </div>
              <div className="d-flex flex-column align-items-center justify-content-between w-100">
                <div className="d-flex align-items-center">
                  <p>한번더</p>
                </div>
                <div
                  className="d-flex align-items-center"
                  style={{ fontSize: 40, height: "50px" }}
                >
                  <StarRatingComponent
                    name="rate4"
                    starCount={5}
                    value={rateReuse}
                    onStarClick={this.onStar4Click.bind(this)}
                    style={{ fontSize: 40, margin: 0 }}
                    renderStarIcon={(index, value) => (
                      <span className="ratingStarSize">
                        <i
                          className={
                            index <= value
                              ? "ratingStar fas fa-star"
                              : "ratingStarEmpty far fa-star"
                          }
                        />
                      </span>
                    )}
                  />
                </div>
              </div>

              <div className="d-flex w-100 align-items-center justify-content-between">
                <Link to={`/Recipe/${recipeId}`}>Detail</Link>
                <button
                  className="ratebutton"
                  onClick={(e) => {
                    this.onSave();
                    this.openNotificationWithIcon("success");
                  }}
                >
                  Save
                </button>
                <button
                  className="ratebutton"
                  onClick={(e) => {
                    this.onDelete();
                    this.openNotificationWithIcon2("success");
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MyListCard;
