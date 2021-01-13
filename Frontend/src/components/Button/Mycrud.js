import React, { Component } from "react";

// router-dom
import { NavLink } from "react-router-dom";

// reactstrap
import { Row, Col } from "reactstrap";

// css
import "./Mycrud.css";

class Mycrud extends Component {
  render() {
    return (
      <div className="crudbox">
        <Row>
          <Col className="crudbtn catebtn-one">
            <NavLink
              to="/EditProfile"
              style={{
                textDecoration: "none",
                color: "black",
                fontSize: "1.3rem",
              }}
              className="nav-link-crud"
            >
              <span>EditProfile</span>
            </NavLink>
          </Col>
          {/* <Col className="crudbtn catebtn-one">
            <NavLink
              to="/Mypage"
              style={{
                textDecoration: "none",
                color: "black",
                fontSize: "1.3rem",
              }}
              className="nav-link-crud"
            >
              <span>MyArticle</span>
            </NavLink>
          </Col> */}
          <Col className="crudbtn catebtn-one">
            <NavLink
              to="/Mypage"
              style={{
                textDecoration: "none",
                color: "black",
                fontSize: "1.3rem",
              }}
              className="nav-link-crud"
            >
              <span>MyList</span>
            </NavLink>
          </Col>
          {/* <Col className="crudbtn crudbtn-one">
            <NavLink
              to="/CreateRecipe"
              style={{
                textDecoration: "none",
                color: "black",
                fontSize: "1.3rem",
              }}
              className="nav-link-crud"
            >
              <span>CreateRecipe</span>
            </NavLink>
          </Col> */}
        </Row>
      </div>
    );
  }
}

export default Mycrud;
