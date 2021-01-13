import React, { Component } from "react";
import axios from "axios";

// reactstrap
import { Row, Col, Container } from "reactstrap";
import { Spin } from "antd";

// css
import "./Top.css";

// import component
import Card from "../components/Card/Card";

class Top extends Component {
  constructor() {
    super();
    this.state = {
      hitRecipe: ["loading"],
    };
  }

  componentDidMount() {
    const token = JSON.parse(sessionStorage.getItem("userToken"));
    axios
      .get("http://j3d102.p.ssafy.io/api/auth/recommend_hit/", {
        // .get("http://localhost:8000/api/auth/recommend_hit/", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        sessionStorage.setItem("hitRecipe", JSON.stringify(res.data));
        const hitRecipe = JSON.parse(sessionStorage.getItem("hitRecipe"));
        this.setState({
          hitRecipe: hitRecipe,
        });
      })
      .catch((err) => {
        // console.log(err);
      });
    // axios
    //   .get("http://j3d102.p.ssafy.io/api/recipe/card/")
    //   .then((res) => {
    //     localStorage.setItem("recipeData", JSON.stringify(res.data));
    //     const recipeData = JSON.parse(localStorage.getItem("recipeData"));
    //     this.setState({
    //       recipeData: recipeData,
    //     });
    //   })
    //   .catch((err) => {
    //     alert(err.response);
    //   });
  }

  render() {
    // Card rendering Component
    const CardRender = this.state.hitRecipe.map((item) => (
      <Col key={item.id} sm={12} md={6} lg={4} xl={3}>
        <Card
          recipeTitle={item.recipe_name}
          recipeImg={item.recipe_image}
          recipeSheep={item.recipe_sheep}
          recipeTime={item.recipe_time}
          recipeHits={item.recipe_hits}
          recipeId={item.id}
        />
      </Col>
    ));

    return (
      <div>
        <div className="top-title">인기 많은 레시피</div>
        <Container>
          <Row>
            <div className="forme-explain">
              지금 나모레에서 가장 핫한 레시피들!
            </div>
          </Row>
          {this.state.hitRecipe[0] !== "loading" ? (
            <Row>{CardRender}</Row>
          ) : (
            <>
              <div className="loadingBox w-100 d-flex justify-content-center align-items-center">
                <Spin tip="추천 목록 불러오는중..." />
              </div>
            </>
          )}
        </Container>
      </div>
    );
  }
}

export default Top;
