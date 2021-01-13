import React from "react";

// import component
import IntroArticlePic from "./IntroArticlePic";
import IntroArticlePen from "./IntroArticlePen";

// reactstrap
import { Row, Col } from "reactstrap";

// css
import "./IntroArticle.css";

function IntroArticle() {
  return (
    <div
      style={{
        textAlign: "center",
        marginBottom: "90px",
      }}
    >
      <div className="article-title">MESSAGE</div>
      <Row>
        <Col
          md="6"
          sm="12"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IntroArticlePic />
        </Col>
        <Col
          md="6"
          sm="12"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "30px",
          }}
        >
          <IntroArticlePen />
        </Col>
      </Row>
    </div>
  );
}

export default IntroArticle;
