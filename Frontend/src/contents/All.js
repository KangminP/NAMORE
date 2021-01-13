import React, { Component } from "react";
import axios from "axios";

// reactstrap
import { Row, Col, Container } from "reactstrap";
import { Spin } from "antd";

// css
import "./ForMe.css";

// import component
import Card from "../components/Card/Card";

class All extends Component {
  constructor() {
    super();
    this.state = {
      recomRecipe: ["loading"],
    };
  }

  componentDidMount() {
    const token = JSON.parse(sessionStorage.getItem("userToken"));
    axios
      .get("http://j3d102.p.ssafy.io/api/recipe/card/", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        sessionStorage.setItem("recomRecipe", JSON.stringify(res.data));
        const recomRecipe = JSON.parse(sessionStorage.getItem("recomRecipe"));
        this.setState({
          recomRecipe: recomRecipe,
        });
      })
      .catch((err) => {
        // console.log(err);
      });
  }

  render() {
    // Card rendering Component
    const CardRender = this.state.recomRecipe.map((item) => (
      <Col key={item.id} sm={12} md={6} lg={4} xl={3}>
        <Card
          recipeTitle={item.recipe_name}
          recipeImg={item.recipe_image}
          recipeSheep={item.recipe_sheep}
          recipeTime={item.recipe_time}
          recipeId={item.id}
        />
      </Col>
    ));

    return (
      <div>
        <div className="forme-title">나를 위한 레시피</div>
        <Container>
          <Row>
            <div className="forme-explain">
              저희만의 추천 알고리즘을 기반으로 레시피를 추천해드려요!
            </div>
          </Row>
          {this.state.recomRecipe[0] !== "loading" ? (
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

export default All;
