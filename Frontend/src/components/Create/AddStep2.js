import React, { Component } from "react";

import { Container, Row, Col } from "reactstrap";

const ImagePreViewON = (props) => {
  if (props.imagePreviewUrl) {
    return (
      <div className="image-container">
        <img src={props.imagePreviewUrl} />
      </div>
    );
  }
  return <div></div>;
};

const RemoveBtn = (props) => {
  if (props.imagePreviewUrl) {
    return (
      <button type="submit" onClick={props.handleRemove}>
        삭제
      </button>
    );
  }
  return null;
};

class ImageUpload extends Component {
  state = {
    file: "",
    imagePreviewUrl: "",

    // recipeImage: "",
    // recipeName: "",
    // recipeIntro: "",
    // recipeIngre: "",
    // recipeOrder: [],
    // recipeOrderImage: [],
    // recipeContent: [],
    // customRating: 0,
    // recipeRating: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    // console.log("handle uploading-", this.state.file);
  };

  handleImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };

  handleRemove = (e) => {
    const confirmMsg = alert("정말 사진을 삭제하시겠습니까?");
    if (confirmMsg) {
      this.setState({
        file: "",
        imagePreviewUrl: "",
      });
    }
    return null;
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Row>
              <form
                onSubmit={this._handleSubmit}
                style={{ display: "inline-block" }}
              >
                <input type="file" onChange={this.handleImageChange} />

                {/* <button type="submit" onClick={this.handleSubmit}>
                    Upload
                  </button> */}

                <RemoveBtn
                  imagePreviewUrl={this.state.imagePreviewUrl}
                  handleRemove={this.handleRemove}
                />
              </form>
            </Row>
            <Row style={{ width: "100%" }}>
              <div style={{ marginTop: "20px" }}>
                <ImagePreViewON imagePreviewUrl={this.state.imagePreviewUrl} />
              </div>
            </Row>
          </Col>
          <Col>
            <div>안녕하세연</div>
          </Col>
        </Row>

        {/* <Row style={{ marginTop: "20px" }}>
          <button style={{ width: "100%" }}>Add Step</button>
        </Row>
        <Row>
          <input type="submit" value="Submit" />
        </Row> */}
      </Container>
    );
  }
}

class AddStep extends Component {
  render() {
    return (
      <div>
        <h3> 업로드 어카냐 진짜 </h3>
        <ImageUpload />
      </div>
    );
  }
}

export default AddStep;
