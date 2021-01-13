// Recipe detail
import React, { Component } from "react";
import MyNavbar from "../components/Navbar/MyNavbar";
import axios from "axios";
import { Link } from "react-router-dom";

import "./RecipeDetail.css";

import StarRatingComponent from "react-star-rating-component";

class RecipeDetail extends Component {
  constructor() {
    super();
    this.state = {
      recipeImage: "",
      recipeName: "",
      recipeSheep: "",
      recipeTime: "",
      recipeDifficulty: "",
      recipeIngre: "",
      recipeContent: [],
      customRating: 0,
      recipeRating: "",
      recipeComment: [],
      commentInput: "",
      deleteId: "",
      editId: "",
      commentStatus: "read",
      commentEditInput: "",
      // like axios 구현시 status: "" 변경해야함
      status: "",
    };
  }

  // onStarClick(nextValue, prevValue, name) {
  //   this.setState({ customRating: nextValue });
  // }

  async getCommentList() {
    const recipeId = Number(this.props.match.params.id);
    try {
      const response = await axios.get(
        // `http://localhost:8000/api/recipe/${recipeId}/comment/`
        `http://j3d102.p.ssafy.io/api/recipe/${recipeId}/comment/`
      );
      this.setState({
        recipeComment: response.data,
      });
    } catch (err) {
      // console.log(err);
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const recipeId = this.props.match.params.id;
    axios
      .get(`http://j3d102.p.ssafy.io/api/recipe/${recipeId}/`)
      // .get(`http://localhost:8000/api/recipe/${recipeId}/`)
      .then((res) => {
        sessionStorage.setItem("recipeDetail", JSON.stringify(res.data));
        const recipeDetail = JSON.parse(sessionStorage.getItem("recipeDetail"));

        //순서 이미지+텍스트는 같이 묶어서 저장
        let order = [];
        let a = 0;
        for (a = 0; a < recipeDetail.order_content.length; a++) {
          order[a] = {
            img: recipeDetail.order_image[a],
            txt: recipeDetail.order_content[a],
          };
        }
        this.setState({
          recipeContent: order,
          recipeImage: recipeDetail.recipe_image,
          recipeName: recipeDetail.recipe_name,
          recipeSheep: recipeDetail.recipe_sheep,
          recipeTime: recipeDetail.recipe_time,
          recipeDifficulty: recipeDetail.recipe_difficulty,
          recipeIngre: recipeDetail.order_ingre.join(", "),
          recipeRating: 3.2,
        });

        // 해당레시피의 유저 like 확인 axios
        const token = JSON.parse(sessionStorage.getItem("userToken"));
        axios
          .get("http://j3d102.p.ssafy.io/api/auth/user/recipe/", {
            // .get("http://localhost:8000/api/auth/user/recipe/", {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json;charset=UTF-8",
              Authorization: `Token ${token}`,
            },
          })

          .then((res) => {
            if (res.data.includes(Number(recipeId))) {
              this.setState({ status: "like" });
            } else {
              this.setState({ status: "unlike" });
            }
          })
          .catch((err) => {
            // console.log(err);
          });
      })
      .catch(function (err) {
        // console.log(err);
      });

    // 댓글 불러오기
    this.getCommentList();
  }

  // 댓글 작성
  onCommentSubmit = () => {
    const recipeId = this.props.match.params.id;
    const token = JSON.parse(sessionStorage.getItem("userToken"));
    let commentForm = new FormData();
    commentForm.append("recipe", Number(recipeId));
    commentForm.append("comment_content", this.state.commentInput);
    axios
      // .post(`http://localhost:8000/api/comment/`, commentForm, {
      .post(`http://j3d102.p.ssafy.io/api/comment/`, commentForm, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data; boundary=---ssafy",
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        this.getCommentList();
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  onCommentEdit = () => {
    this.setState({
      commentStatus: "write",
    });
  };

  onCommentEditSubmit = () => {
    const recipeId = this.props.match.params.id;
    const token = JSON.parse(sessionStorage.getItem("userToken"));
    let commentForm = new FormData();
    commentForm.append("recipe", Number(recipeId));
    commentForm.append("comment_id", this.state.editId);
    commentForm.append("comment_content", this.state.commentEditInput);

    axios
      // .put(`http://localhost:8000/api/comment/`, commentForm, {
      .put(`http://j3d102.p.ssafy.io/api/comment/`, commentForm, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data; boundary=---ssafy",
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        this.getCommentList();
      })
      .catch((err) => {
        // console.log(err);
      });

    this.setState({
      commentStatus: "read",
    });
  };

  onCommentDelete = () => {
    const recipeId = Number(this.props.match.params.id);
    const token = JSON.parse(sessionStorage.getItem("userToken"));
    const deleteId = Number(this.state.deleteId);

    axios
      .delete(
        // `http://localhost:8000/api/recipe/${recipeId}/comment/${deleteId}/`,
        `http://j3d102.p.ssafy.io/api/recipe/${recipeId}/comment/${deleteId}/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {
        this.getCommentList();
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  // 해당 레시피 좋아요 api 구현시 사용하는 함수.
  onUnlike = () => {
    const token = JSON.parse(sessionStorage.getItem("userToken"));
    const recipeId = this.props.match.params.id;
    const likerecipeForm = {
      recipe_pk: recipeId,
    };
    axios
      .post("http://j3d102.p.ssafy.io/api/auth/user/recipe/", likerecipeForm, {
        // .post("http://localhost:8000/api/auth/user/recipe/", likerecipeForm, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        this.setState({ status: "like" });
      })
      .catch((err) => {
        // console.log("err");
      });
  };

  onLike = () => {
    const token = JSON.parse(sessionStorage.getItem("userToken"));
    const recipeId = this.props.match.params.id;
    const likerecipeForm = {
      recipe_pk: recipeId,
    };
    axios
      .post("http://j3d102.p.ssafy.io/api/auth/user/recipe/", likerecipeForm, {
        // .post("http://localhost:8000/api/auth/user/recipe/", likerecipeForm, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        this.setState({ status: "unlike" });
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  goComment = () => {
    document.getElementById("goComment").scrollIntoView();
  };

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    // 조리법 Mapping Component
    const methods = this.state.recipeContent.map((value, id) => (
      <div
        key={id}
        className="recipeBodyStep row mx-0 d-flex justify-content-center"
      >
        <div className="col-sm-12 col-md-4 w-100 p-1">
          <div key={id} className="recipeBodyImg">
            {value.img ? (
              <img
                className="recipeOrderImage"
                src={value.img}
                alt="recipeOrderImage"
              />
            ) : (
              // <span>No Image</span>
              <img
                className="recipeOrderImage"
                src="../assets/img/NoImg.png"
                alt="recipeOrderImage"
              />
            )}
          </div>
        </div>
        <div className="col-sm-12 col-md-8 px-1">
          <div key={id} className="recipeBodyNotes">
            <h4 className="recipeOrderStep">Step {id + 1}.</h4>
            <p className="recipeOrderText">{value.txt}</p>
          </div>
        </div>
      </div>
    ));

    // 댓글 Mapping Component
    const comments = this.state.recipeComment.map((value, id) => (
      <>
        {this.state.commentStatus === "write" &&
        this.state.editId === value.id ? (
          <>
            <div key={id} className="recipeCommentCard row">
              <div key={id} className="my-2 col-sm-6 col-md-8">
                <input
                  className="w-100"
                  type="text"
                  defaultValue={value.comment_content}
                  onChange={(e) => {
                    this.setState({
                      commentEditInput: e.target.value,
                    });
                    // console.log(this.state.commentEditInput);
                  }}
                ></input>
              </div>

              {/* <div
                key={id}
                className="my-2 col-xs-0 col-sm-3 col-md-2 d-flex flex-row-reverse font-weight-bold"
              >
                {value.user}
              </div> */}
              <div
                key={id}
                className="my-2 col-xs-6 col-sm-6 col-md-4 text-center d-flex justify-content-around"
              >
                <i
                  role="button"
                  // type="button"
                  className="far fa-window-close"
                  onClick={(e) => {
                    this.setState({
                      commentStatus: "read",
                    });
                  }}
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="취소하기"
                ></i>
                <i
                  role="button"
                  className="far fa-save"
                  onClick={(e) => {
                    // console.log(value.id);
                    this.onCommentEditSubmit();
                  }}
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="저장하기"
                ></i>
              </div>
            </div>
          </>
        ) : (
          <>
            <div key={id} className="recipeCommentCard row">
              {this.state.commentStatus === "write" ? (
                <>
                  {" "}
                  <div key={id} className="my-2 col-sm-6 col-md-8">
                    {value.comment_content}
                  </div>
                </>
              ) : (
                <div key={id} className="my-2 col-sm-6 col-md-8">
                  {value.comment_content}
                </div>
              )}

              {JSON.parse(sessionStorage.getItem("userData")).username ===
              value.user ? (
                <>
                  <div
                    key={id}
                    className="my-2 col-xs-0 col-sm-3 col-md-2 d-flex flex-row-reverse font-weight-bold"
                  >
                    {value.user}
                  </div>
                  <div
                    key={id}
                    className="my-2 col-xs-6 col-sm-3 col-md-2 text-center d-flex justify-content-around"
                  >
                    <i
                      type="button"
                      className="far fa-edit"
                      onClick={(e) => {
                        this.setState({
                          editId: value.id,
                          commentStatus: "write",
                        });
                      }}
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="수정하기"
                    ></i>
                    <i
                      type="button"
                      className="far fa-trash-alt"
                      onMouseOver={(e) => {
                        this.setState({
                          deleteId: value.id,
                        });
                      }}
                      onClick={(e) => {
                        this.onCommentDelete();
                      }}
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="삭제하기"
                    ></i>
                  </div>
                </>
              ) : (
                <>
                  <div
                    key={id}
                    className="my-1 col-xs-6 col-sm-4 col-md-2 d-flex flex-row-reverse font-weight-bold"
                  >
                    {value.user}
                  </div>
                  <div
                    key={id}
                    className="my-1 col-xs-0 col-sm-2 col-md-2 text-center"
                  ></div>
                </>
              )}
            </div>
          </>
        )}
      </>
    ));

    return (
      <div>
        <MyNavbar />
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mt-4 mb-0">
            <button
              className="btn btn-outline-dark mb-0 navButn"
              onClick={this.goBack}
            >
              뒤로가기
            </button>
            <button
              className="btn btn-outline-dark mb-0 navButn"
              onClick={this.goComment}
            >
              댓글보기
            </button>
          </div>
          <hr />
          {/* Header: 레시피 기본정보, 소개 */}
          <div className="recipeHeader">
            <div className="recipeHeaderImg text-center">
              {this.state.recipeImage ? (
                <img
                  className="recipeHeaderImgStretch"
                  src={this.state.recipeImage}
                  alt="recipeImg"
                />
              ) : (
                <span>No Image</span>
              )}
            </div>
            <div className="recipeHeaderTitle">
              <div className="recipeHeaderOverview d-flex justify-content-between">
                <div className="recipeTitle">
                  <h3 className="recipeTitleName">{this.state.recipeName}</h3>
                </div>
                <div className="recipeOverviewRating ml-5">
                  {/* <span>
                    <i className="fas fa-star ratingStar" />
                    {this.state.recipeRating}
                  </span> */}
                </div>
              </div>
              <hr />
              <div className="recipeOverviewDetailText">
                <h5>
                  <i className="mx-1 fas fa-users"></i> {this.state.recipeSheep}
                  인분
                </h5>
                <h5>
                  <i className="mx-2 far fa-clock"></i>
                  {this.state.recipeTime}분
                </h5>
                <h5>
                  <i className="mx-2 far fa-grin-beam-sweat"></i>
                  {this.state.recipeDifficulty}
                </h5>
                <h5>
                  <i className="mx-2 fas fa-shopping-cart"></i>
                  {this.state.recipeIngre}
                </h5>
              </div>
            </div>
          </div>

          {/* Body: 조리법 */}
          <div className="recipeBody">
            <div className="container">{methods}</div>
          </div>

          {/* Footer: 평점부여, 댓글 */}
          <div className="recipeFooter">
            {/* 좋아요 */}
            <>
              <div className="recipeLike container text-center">
                <div className="row w-100 d-flex justify-content-center">
                  <div className="px-0 col-sm-12 col-md-6 d-flex justify-content-between">
                    <div className="heartBtn w-100 d-flex flex-column justify-content-between text-center">
                      <div className="recipeLike d-flex justify-content-center align-items-center text-center">
                        {this.state.status === "unlike" ? (
                          <i
                            className="recipeLikeUnheart mx-4 far fa-heart"
                            onClick={(e) => {
                              this.onUnlike();
                            }}
                          ></i>
                        ) : (
                          <i
                            className="recipeLikeHeart mx-4 fas fa-heart"
                            onClick={(e) => {
                              this.onLike();
                            }}
                          ></i>
                        )}
                      </div>
                      <div className="recipeLikeComment">
                        {this.state.status === "unlike" ? (
                          <p>내 리스트에 저장</p>
                        ) : (
                          <p>리스트에 저장됨</p>
                        )}
                      </div>
                    </div>

                    <div className="listButton w-100 d-flex flex-column justify-content-between text-center">
                      <Link className="recipeLink" to="/Mypage">
                        <div className="recipeLike">
                          <i
                            className="mx-4 fas fa-list"
                            title="My like list~"
                          ></i>
                        </div>
                      </Link>
                      <div className="recipeLikeComment">
                        <p>찜 목록</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
            {/* 평점부여 */}
            {/* <div className="recipeUserRating text-center">
              <h2 className="mb-2">이 레시피 어때요?</h2>
              <div className="recipeUserRatingStars d-flex justify-content-center align-items-center">
                <StarRatingComponent
                  name="customRatingStars"
                  starCount={5}
                  value={this.state.customRating}
                  renderStarIcon={(index, value) => (
                    <span>
                      <i
                        className={
                          index <= value
                            ? "ratingStar fas fa-star"
                            : "ratingStarEmpty far fa-star"
                        }
                      />
                    </span>
                  )}
                  onStarClick={this.onStarClick.bind(this)}
                />
              </div>

              {this.state.customRating === 1 ? (
                <h3>
                  <i class="far fa-tired"></i> 최악이에요
                </h3>
              ) : this.state.customRating === 2 ? (
                <h3>
                  <i class="far fa-angry"></i> 별로에요
                </h3>
              ) : this.state.customRating === 3 ? (
                <h3>
                  <i class="far fa-meh"></i> 그냥 그래요..
                </h3>
              ) : this.state.customRating === 4 ? (
                <h3>
                  <i class="far fa-laugh-beam"></i> 맛있어요!
                </h3>
              ) : this.state.customRating === 5 ? (
                <h3>
                  <i class="far fa-grin-hearts"></i> 강력추천해요!!
                </h3>
              ) : (
                <h3></h3>
              )}
            </div> */}
            <hr />
            {/* 댓글 */}
            <div className="recipeComments" id="goComment">
              <h3 className="commentTitle">Comments</h3>
              {/* 댓글 form */}
              <div className="recipeCommentForm">
                <div className="form-group container">
                  <div className="row">
                    <div className="col-9">
                      <textarea
                        className="form-control"
                        id="CommentForm"
                        placeholder="Write Comments"
                        rows="1"
                        onChange={(e) => {
                          this.setState({
                            commentInput: e.target.value,
                          });
                        }}
                      ></textarea>
                    </div>
                    <div className="col-3 d-flex justify-content-center align-items-center">
                      <button
                        type="submit"
                        className="w-100 px-2 py-2 btn btn-outline-dark"
                        onClick={(e) => {
                          this.onCommentSubmit();
                        }}
                      >
                        <i className="far fa-comment-dots"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* 댓글 list */}
              <div className="container">{comments}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RecipeDetail;
