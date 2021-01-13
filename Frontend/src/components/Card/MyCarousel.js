import React, { Component } from "react";

// react-multi-carousel
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { Spin } from "antd";
import Card from "./Card";

import "./MyCarousel.css";

import axios from "axios";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

class MyCarousel extends Component {
  constructor() {
    super();
    this.state = {
      myRecipe: ["loading"],
    };
  }

  componentDidMount() {
    // console.log(JSON.parse(sessionStorage.getItem("userData")).username);

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
    const CardRender = this.state.myRecipe.map((item, index) => (
      <Card
        key={item.recipe_id}
        recipeTitle={item.recipe_name}
        recipeImg={item.recipe_image}
        recipeHits={item.recipe_hits}
        recipeSheep={item.recipe_sheep}
        recipeTime={item.recipe_time}
        recipeDifficulty={item.recipe_difficulty}
        recipeId={item.recipe_id}
        style={{ width: "100%" }}
      />
    ));

    return (
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div className="about" style={{ width: "90%" }}>
          {this.state.myRecipe[0] === "loading" ? (
            <div className="loadingBox w-100 d-flex justify-content-center align-items-center">
              <Spin tip="불러오는중..." />
            </div>
          ) : this.state.myRecipe.length < 1 ? (
            <div className="emptyBox w-100 d-flex justify-content-center align-items-center">
              <h5 className="errorMessage">좋아요 누른 레시피가 없습니다.</h5>
            </div>
          ) : (
            <div>
              <Carousel responsive={responsive}>{CardRender}</Carousel>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default MyCarousel;
