import React, { Component } from "react";
import { Container, Row } from "reactstrap";

import Addmain from "../components/Create/Addmain";
import Addsub from "../components/Create/Addsub";
import AddSteps from "../components/Create/AddSteps";

import AddStep from "../components/Create/AddStep";
import SubAddStep from "../components/Create/SubAddStep";

import TryForm from "../components/Create/TryForm";
import TryForm2 from "../components/Create/TryForm2";
import TryList from "../components/Create/TryList";
import RecipeForm from "../components/Create/RecipeForm";

class CreateRecipe extends Component {
  // state = {
  //   stepList: [{ id: 0, imgurl: "", content: "" }],
  // };

  // stepCreate = (datas) => {
  //   console.log(datas);
  //   const { stepList } = this.state;
  //   this.setState({
  //     stepList: stepList.concat({
  //       id: this.id++,
  //       imgurl: datas.imagePreviewUrl,
  //       content: datas.content,
  //     }),
  //   });
  // };

  // stepRemove = (id) => {
  //   const { stepList } = this.state;

  //   this.setState({
  //     stepList: stepList.filter((data) => data.id !== id),
  //   });
  // };

  render() {
    // const { stepList } = this.state;
    return (
      <div>
        <Container>
          <RecipeForm />
          {/* <Row>
            <h3 style={{ width: "100%" }}>메인사진과 글을 작성해주세요.</h3>
            <TryForm />
          </Row>
          <Row>
            <h3 style={{ width: "100%" }}>단계별 사진과 글을 작성해주세요.</h3>
            <TryForm2 stepCreate={this.stepCreate} />
            <TryList datas={stepList} stepRemove={this.stepRemove} />
          </Row> */}
        </Container>
      </div>
    );
  }
}

export default CreateRecipe;
