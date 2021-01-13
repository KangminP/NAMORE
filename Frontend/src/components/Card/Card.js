import React from "react";
import { Link } from "react-router-dom";

import "./Card.css";

const Card = (props) => {
  return (
    <div className="recicard__container">
      <div className="recicard recicard--1">
        <div
          className="recicard__img"
          style={{
            backgroundImage: `url(${props.recipeImg})`,
          }}
        ></div>

        <Link to={`/Recipe/${props.recipeId}`}>
          <div
            className="recicard__img--hover"
            style={{
              backgroundImage: `url(${props.recipeImg})`,
            }}
          ></div>
        </Link>

        <div className="recicard__info">
          <span className="recicard__rate"> Hits : {props.recipeHits} </span>
          <p className="recicard__intro">
            <i className="mr-1 fas fa-info-circle"></i>
            {props.recipeSheep}인분, {props.recipeTime}분
          </p>

          <h3 className="recicard__title">{props.recipeTitle}</h3>

          <span className="recicard__by"></span>
        </div>
      </div>
    </div>
  );
};

export default Card;
