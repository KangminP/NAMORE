import React, { Component } from "react";

// router-dom
import { NavLink } from "react-router-dom";

// reactstrap
import { Row, Col } from "reactstrap";

// css
import "./Category.css";

class Category extends Component {
  render() {
    return (
      <div className="catebox">
        <Row>
          <Col className="catebtn catebtn-one">
            <NavLink
              exact
              to="/Main"
              style={{
                textDecoration: "none",
                color: "black",
                fontSize: "1.3rem",
              }}
              className="nav-link-cate"
            >
              <span>ForYou</span>
            </NavLink>
          </Col>
          <Col className="catebtn catebtn-one">
            <NavLink
              exact
              to="/Favorite"
              style={{
                textDecoration: "none",
                color: "black",
              }}
              className="nav-link-cate"
            >
              <span>Favorite</span>
            </NavLink>
          </Col>
          <Col className="catebtn catebtn-one">
            <NavLink
              exact
              to="/Material"
              style={{
                textDecoration: "none",
                color: "black",
                // fontSize: "1.3rem",
              }}
              className="nav-link-cate"
            >
              <span>Refrigerator</span>
            </NavLink>
          </Col>
          <Col className="catebtn catebtn-one">
            <NavLink
              exact
              to="/Top"
              style={{
                textDecoration: "none",
                color: "black",
                // fontSize: "1.3rem",
              }}
              className="nav-link-cate"
            >
              <span>Popularity</span>
            </NavLink>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Category;
