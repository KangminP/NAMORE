import React, { Component } from "react";

import axios from "axios";

import MyListCard from "../components/Card/MyListCard";
import MyCarousel from "../components/Card/MyCarousel";

import { Container, Row, Col } from "reactstrap";
import { Spin } from "antd";

import "./Mylist.css";

class Mylist extends Component {
  constructor() {
    super();
    this.state = {
      myRecipe: ["loading"],
    };
  }
  componentDidMount() {
    const token = JSON.parse(sessionStorage.getItem("userToken"));
    axios
      .get("http://j3d102.p.ssafy.io/api/auth/user/recipe/kangmin/", {
        // .get("http://localhost:8000/api/auth/user/recipe/kangmin/", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        sessionStorage.setItem("myRecipe", JSON.stringify(res.data));
        const myRecipe = JSON.parse(sessionStorage.getItem("myRecipe"));
        this.setState({
          myRecipe: myRecipe,
        });
      })
      .catch((err) => {
        // console.log(err);
      });
  }
  render() {
    const CardRender = this.state.myRecipe.map((item) => (
      <Col key={item.recipe_id} xl={4} style={{ padding: "0" }}>
        <MyListCard
          recipeTitle={item.recipe_name}
          recipeImg={item.recipe_image}
          recipeId={item.recipe_id}
        />
      </Col>
    ));
    return (
      <div>
        <div className="myListTitle" style={{ marginBottom: 0 }}>
          {JSON.parse(sessionStorage.getItem("userData")).username} 님이
          좋아요한 레시피
        </div>
        <MyCarousel />

        <div
          className="my-title"
          style={{ marginTop: "50px", marginBottom: 0 }}
        >
          평점 매기기
        </div>

        <Container>
          <Row>
            <div className="forme-explain">
              방구석 미슐랭이 되어 평점을 매겨봅시다!
            </div>
          </Row>
        </Container>

        {this.state.myRecipe[0] === "loading" ? (
          <div className="loadingBox w-100 d-flex justify-content-center align-items-center">
            <Spin tip="평가 목록 불러오는중..." />
          </div>
        ) : this.state.myRecipe.length < 1 ? (
          <Row>
            <div className="emptyBox w-100 d-flex justify-content-center align-items-center">
              <h5 className="errorMessage">평가할 레시피가 없습니다.</h5>
            </div>
          </Row>
        ) : (
          <>
            <Row>{CardRender}</Row>
          </>
        )}
      </div>
    );
  }
}

export default Mylist;
