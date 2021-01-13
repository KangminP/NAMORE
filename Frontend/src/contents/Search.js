// import React, { Component } from "react";
import React, { Component } from "react";
import axios from "axios";

// reactstrap
import { Row, Col, Container } from "reactstrap";
import { Spin } from "antd";

// css
import "./Search.css";

// import component
import Card from "../components/Card/Card";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchRecipe: ["loading"],
    };
  }

  async getSearchResult() {
    // const keyword = this.props.location.search.slice(
    //   2,
    //   this.props.location.search.length
    // );

    const keyword = this.props.match.params.keyword;
    let searchForm = new FormData();
    searchForm.append("wantName", keyword);

    try {
      const response = await axios.post(
        // "http://localhost:8000/api/recipe/search/",
        "http://j3d102.p.ssafy.io/api/recipe/search/",
        searchForm,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      );
      // console.log(response.data);
      this.setState({
        searchRecipe: response.data,
      });
    } catch (err) {
      console.log(err);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getSearchResult();
    }
  }

  componentDidMount() {
    this.getSearchResult();
    // if (!this.props.match.params.keyword) {
    //   this.setState({
    //     searchRecipe: [],
    //   });
    // }
    // const keyword = this.props.location.search.slice(
    //   2,
    //   this.props.location.search.length
    // );
    // let searchForm = new FormData();
    // searchForm.append("wantName", keyword);
    // axios
    //   .post("http://localhost:8000/api/recipe/search/", searchForm, {
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json;charset=UTF-8",
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //     this.setState({ searchRecipe: res.data });
    //   });

    // axios
    //   .get("http://localhost:8000/api/recipe/", {
    //     // .get("http://j3d102.p.ssafy.io/api/recipe/", {
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json;charset=UTF-8",
    //       Authorization: `Token ${token}`,
    //     },
    //   })
    //   .then((res) => {
    //     sessionStorage.setItem("searchRecipe", JSON.stringify(res.data));
    //     const searchRecipe = JSON.parse(sessionStorage.getItem("searchRecipe"));

    //     // console.log(searchRecipe);
    //     var result = [];
    //     for (var recipe of searchRecipe) {
    //       if (recipe.recipe_name.includes(keyword)) {
    //         result.push(recipe);
    //       }
    //     }
    //     this.setState({
    //       searchRecipe: result,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  // componentDidUpdate() {
  //   const keyword = this.props.location.search.slice(
  //     2,
  //     this.props.location.search.length
  //   );
  //   let searchForm = new FormData();
  //   searchForm.append("wantName", keyword);
  //   axios
  //     .post("http://localhost:8000/api/recipe/search/", searchForm, {
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json;charset=UTF-8",
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //     });
  // }

  render() {
    // const keyword = this.props.location.search.slice(
    //   2,
    //   this.props.location.search.length
    // );
    const keyword = this.props.match.params.keyword;
    // Card rendering Component
    const CardRender = this.state.searchRecipe.map((item) => (
      <Col sm={12} md={6} lg={4} xl={3}>
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
        <div className="forme-title">검색결과</div>
        <Container>
          <Row>
            <div className="forme-explain">"{keyword}" 검색결과에요</div>
          </Row>

          {this.state.searchRecipe[0] === "loading" ? (
            <div className="loadingBox w-100 d-flex justify-content-center align-items-center">
              <Spin tip="추천 목록 불러오는중..." />
            </div>
          ) : this.state.searchRecipe.length < 1 ? (
            <Row>
              <div className="emptyBox w-100 d-flex justify-content-center align-items-center">
                <h5 className="errorMessage">검색 결과가 없습니다.</h5>
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

export default Search;
