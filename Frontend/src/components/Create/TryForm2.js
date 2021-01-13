import React, { Component } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";

const ImagePreViewON = (props) => {
  if (props.imagePreviewUrl) {
    return (
      <div style={{ width: "200px", height: "200px" }}>
        <img src={props.imagePreviewUrl} />
      </div>
    );
  }
  return <div></div>;
};

class TryForm2 extends Component {
  constructor(props) {
    super();
    this.state = {
      file: "",
      imagePreviewUrl: "",
      content: "",
    };
  }

  photoUpload = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        // main: { file: file, imagePreviewUrl: reader.result },
        file: file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  contentUpload = (e) => {
    const content = e.target.value;
    this.setState({ content: content });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    // console.log(this.state.file);
    // console.log(this.state.content);

    this.props.stepCreate(this.state);
    this.setState({
      file: "",
      imagePreviewUrl: "",
      content: "",
    });
  };

  render() {
    return (
      // <div>
      //   <form onSubmit={this.handleSubmit}>
      //     <input type="file" onChange={this.photoUpload} />
      //     <input type="text" />
      //   </form>
      //   <ImagePreViewON imagePreviewUrl={this.state.main.imagePreviewUrl} />
      // </div>
      <Container>
        <Form>
          <Row>
            <Col>
              <FormGroup>
                <Label for="mainFile">File</Label>
                <Input
                  type="file"
                  name="file"
                  id="mainFile"
                  onChange={this.photoUpload}
                />
                <FormText color="muted">
                  여기를 클릭하여 사진을 추가해주세요.
                </FormText>
                <ImagePreViewON imagePreviewUrl={this.state.imagePreviewUrl} />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="stepSeq">Content</Label>
                <Input
                  type="textarea"
                  name="content"
                  id="stepSeq"
                  value={this.state.content}
                  onChange={this.contentUpload}
                  placeholder="과정요약을 입력해주세요."
                />
              </FormGroup>
              <Button
                type="submit"
                size="sm"
                onClick={this.handleSubmit}
                style={{ float: "right" }}
              >
                ADD
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    );
  }
}

export default TryForm2;
