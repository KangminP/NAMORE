import React, { Component } from "react";

// reactstrap
import { Row, Col, Container } from "reactstrap";
import { Spin } from "antd";

// css
import "./Material.css";

// import component
import FridgeIngre from "../components/TagBox/FridgeIngre";
import Axios from "axios";
import Card from "../components/Card/Card";

class Material extends Component {
  constructor() {
    super();
    this.state = {
      recomRecipe: ["loading"],
    };
    const getData = this.getData();
  }

  componentDidMount() {
    // this.getRecipeList();
    // const token = JSON.parse(sessionStorage.getItem("userToken"));
    // Axios.get("http://j3d102.p.ssafy.io/api/auth/recommend_refri/", {
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json;charset=UTF-8",
    //     Authorization: `Token ${token}`,
    //   },
    // })
    //   .then((res) => {
    //     sessionStorage.setItem("recomRefri", JSON.stringify(res.data));
    //     const recomRecipe = JSON.parse(sessionStorage.getItem("recomRefri"));
    //     this.setState({
    //       recomRecipe: recomRecipe,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  // // 추천 목록 받아오기
  // async getRecipeList() {
  //   const token = JSON.parse(sessionStorage.getItem("userToken"));
  //   try {
  //     const response = await Axios.get(
  //       "http://localhost:8000/api/auth/recommend_refri/",
  //       {
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json;charset=UTF-8",
  //           Authorization: `Token ${token}`,
  //         },
  //       }
  //     );
  //     this.setState({
  //       recomRecipe: response.data,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // 재료 선택 컴포넌트에서 추천목록 받아오기
  getData = (val) => {
    this.setState({
      recomRecipe: val,
    });
  };

  render() {
    // Card rendering Component
    const CardRender = this.state.recomRecipe.map((item) => (
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
        <div className="material-title">내가 가진 재료 레시피</div>
        <Container className="d-flex flex-column flex-start">
          <Row>
            <div className="material-explain">
              현재 가지고 계신 재료를 등록해주시면
              <br />
              취향과 재료에 적합한 레시피를 추천해드립니다 !
            </div>
          </Row>
          <Row>
            <FridgeIngre sendData={this.getData} />
          </Row>
          <Row>
            <div className="material-explain">이런 레시피는 어때요?</div>
          </Row>

          {this.state.recomRecipe[0] === "loading" ? (
            <div className="loadingBox w-100 d-flex justify-content-center align-items-center">
              <Spin tip="추천 목록 불러오는중..." />
            </div>
          ) : this.state.recomRecipe.length < 1 ? (
            <Row>
              <div className="emptyBox w-100 d-flex justify-content-center align-items-center">
                <h5 className="errorMessage">재료를 입력해주세요.</h5>
              </div>
            </Row>
          ) : (
            <>
              <Row>{CardRender}</Row>
            </>
          )}
        </Container>
      </div>
    );
  }
}

export default Material;
