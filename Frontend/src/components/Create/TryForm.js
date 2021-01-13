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

class TryForm extends Component {
  constructor(props) {
    super();
    this.state = {
      // main: { file: "", imagePreviewUrl: "", title: "" },
      file: "",
      imagePreviewUrl: "",
      title: "",
    };
  }

  photoUpload = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = (e) => {
      this.setState({
        // main: { file: file, imagePreviewUrl: reader.result },
        file: file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  titleUpload = (e) => {
    const title = e.target.value;
    this.setState({ title: title });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    // console.log("handle uploading-", this.state.file);
    // console.log("handle uploading-", this.state.title);
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
                <Label for="mainTitle">Titile</Label>
                <Input
                  type="text"
                  name="title"
                  id="mainTitle"
                  value={this.state.title}
                  onChange={this.titleUpload}
                  placeholder="제목을 입력해주세요."
                />
              </FormGroup>
              <Button
                type="submit"
                size="sm"
                onClick={this.handleSubmit}
                style={{ float: "right" }}
              >
                Save
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    );
  }
}

export default TryForm;
