// import React from "react";

// const Form = React.createClass({
//   render: () => {
//     return (
//       <form action="/" method="post">
//         <div className="form-group">
//           <label for="exampleInputEmail1">Email address</label>
//           <input
//             type="email"
//             className="form-control"
//             id="exampleInputEmail1"
//             placeholder="Email"
//           />
//         </div>
//         <div className="form-group">
//           <label for="exampleInputPassword1">Password</label>
//           <input
//             type="password"
//             className="form-control"
//             id="exampleInputPassword1"
//             placeholder="Password"
//           />
//         </div>
//         <div className="form-group">
//           <label for="exampleInputFile">File input</label>
//           <input type="file" id="exampleInputFile" />
//           <p className="help-block">Example block-level help text here.</p>
//         </div>
//         <div className="checkbox">
//           <label>
//             <input type="checkbox" />
//             Check me out
//           </label>
//         </div>
//         {/* render the button component! */}
//         <Button />
//         <hr />
//       </form>
//     );
//   },
// });

// const Button = React.createClass({
//   handleClick: function (e) {
//     e.preventDefault();
//     alert("your form was submitted!");
//   },

//   render: function () {
//     return (
//       <button
//         type="submit"
//         className="btn btn-default"
//         onClick={this.handleClick}
//       >
//         Submit
//       </button>
//     );
//   },
// });

// ReactDOM.render(<Form />, document.getElementById("form"));

// ////////////////////////////////////////////////////////////////////
// const Input = React.createClass({
//   getInitialState: function () {
//     return { userInput: "" };
//   },

//   handleUserInput: function (e) {
//     this.setState({ userInput: e.target.value });
//   },

//   render: function () {
//     return (
//       <div className="form-group">
//         <label>Type yo comments in heeya!</label>
//         <br />
//         <input
//           type="text"
//           className="form-control"
//           onChange={this.handleUserInput}
//           value={this.state.userInput}
//         />
//         <h3>{this.state.userInput}</h3>
//       </div>
//     );
//   },
// });

// ReactDOM.render(<Input />, document.getElementById("app"));

import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

class Addsub extends Component {
  constructor(props) {
    super(props);
    this.defaultOption = { id: "-1", value: "" };
    this.state = {
      question: "",
      options: [this.defaultOption],
    };
  }

  handleChange = (e) => {
    let { id, value } = e.target;
    this.setState({ [id]: value });
  };

  handleOptionsChange = (index, e) => {
    let { value } = e.target;
    let stateOptionsClone = JSON.parse(JSON.stringify(this.state.options));
    stateOptionsClone[index].value = value;
    this.setState({ options: stateOptionsClone });
  };

  handleSave = (e) => {
    e.preventDefault();
    // console.log(this.state);
  };

  resetQuestion = () => {
    let emptyQuestion = "";
    return emptyQuestion;
  };

  resetOptions = (options) => {
    let emptyOptions = options.map((data) => {
      data.value = "";
      return data;
    });
    return emptyOptions;
  };

  handleReset = (e) => {
    let stateClone = JSON.parse(JSON.stringify(this.state));
    let emptyQuestion = this.resetQuestion();
    let emptyOptions = this.resetOptions(stateClone.options);
    this.setState({ question: emptyQuestion, options: emptyOptions });
    e.preventDefault();
  };

  handleDelete = (index, e) => {
    let stateClone = JSON.parse(JSON.stringify(this.state.options));
    stateClone.splice(index, 1);
    this.setState({ options: stateClone });
    e.preventDefault();
  };

  handleClick = (e) => {
    let stateClone = JSON.parse(JSON.stringify(this.state));
    stateClone.options.push(this.defaultOption);
    this.setState({ options: stateClone.options });
    e.preventDefault();
  };

  customRow = (options) => {
    const listItems = options.map((cusRow, index) => (
      <FormGroup row key={index}>
        <Label for="options" sm={3} className="text-right">
          Steps {index + 1}
        </Label>
        <Col sm={7}>
          <Input
            type="text"
            name="options"
            id="options"
            value={cusRow.value}
            onChange={(e) => this.handleOptionsChange(index, e)}
          />
        </Col>
        <Col sm={1}>
          <Button color="primary" onClick={(e) => this.handleDelete(index, e)}>
            X
          </Button>
        </Col>
      </FormGroup>
    ));
    return listItems;
  };

  render() {
    let { question, options } = this.state;
    return (
      <Container>
        <Row>
          <Col sm="10">
            <Card>
              <CardBody>
                <CardTitle className="text-center">Question Bank</CardTitle>
              </CardBody>
              <CardBody>
                <Form>
                  <FormGroup row>
                    <Label for="question" sm={3} className="text-right">
                      Question
                    </Label>
                    <Col sm={7}>
                      <Input
                        type="text"
                        name="question"
                        id="question"
                        value={question}
                        onChange={this.handleChange}
                      />
                    </Col>
                  </FormGroup>

                  {this.customRow(options)}

                  <FormGroup row>
                    <Col sm={{ size: 10 }}>
                      <Button
                        color="primary"
                        className="float-right"
                        onClick={this.handleClick}
                      >
                        Add
                      </Button>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="options" sm={3}></Label>
                    <Col sm={7}>
                      <Button color="primary" onClick={this.handleSave}>
                        Save
                      </Button>{" "}
                      &nbsp;
                      <Button color="primary" onClick={this.handleReset}>
                        Reset
                      </Button>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Addsub;
