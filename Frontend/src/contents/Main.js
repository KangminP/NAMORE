import React, { Component } from "react";

// router-dom
import { Route, Switch } from "react-router-dom";

// axios
import axios from "axios";

// import Component
import MainNavbar from "../components/Navbar/MainNavbar";
import Header from "../components/Navbar/Header";
import Search from "./Search";
import Category from "../components/Button/Category";
import ForMe from "./ForMe";
import Material from "./Material";
import Top from "./Top";
import Favorite from "./Favorite";
import All from "./All";

class Main extends Component {
  componentDidMount() {
    // 전체 재료 목록 받아서 저장
    axios.get("http://j3d102.p.ssafy.io/api/ingre/").then((res) => {
      // axios.get("http://localhost:8000/api/ingre/").then((res) => {
      localStorage.setItem("ingre", JSON.stringify(res.data));
    });
  }

  render() {
    return (
      <div>
        <MainNavbar />
        <Header />
        <Category />
        <Switch>
          <Route path="/Search/:keyword" component={Search}></Route>
          <Route path="/Main" component={ForMe}></Route>
          <Route path="/Favorite" component={Favorite}></Route>
          <Route path="/Material" component={Material}></Route>
          <Route path="/Top" component={Top}></Route>
          <Route path="/All" component={All}></Route>
        </Switch>
      </div>
    );
  }
}

export default Main;
