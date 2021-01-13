import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

// import components
import Home from "./contents/Home";
import Main from "./contents/Main";
import Signup from "./contents/Signup";
import Mypage from "./contents/Mypage";

import Intro from "./contents/Intro";
import RecipeDetail from "./contents/RecipeDetail";

import Mylist from "./contents/Mylist";
import CreateRecipe from "./contents/CreateRecipe";
import EditProfile from "./contents/EditProfile";

// now-ui-kit
import "./assets/css/bootstrap.min.css";
import "./assets/css/now-ui-kit.css";
import "./assets/demo/demo.css";

// router-dom
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <Route path="/Home" component={Home}></Route>
        <Route path="/Signup" component={Signup}></Route>
        <Route path="/Search/:keyword" component={Main}></Route>
        <Route path="/Main" component={Main}></Route>
        <Route path="/Material" component={Main}></Route>
        <Route path="/Top" component={Main}></Route>
        <Route path="/Favorite" component={Main}></Route>
        <Route path="/Intro" component={Intro}></Route>
        <Route exact path="/" component={Home}></Route>
        <Route path="/Recipe/:id" component={RecipeDetail}></Route>
        <Route path="/Mypage" component={Mypage}></Route>
        <Route path="/Mylist" component={Mypage}></Route>
        <Route path="/CreateRecipe" component={CreateRecipe}></Route>
        <Route path="/EditProfile" component={EditProfile}></Route>
        <Route path="/All" component={Main}></Route>
      </div>
    );
  }
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
