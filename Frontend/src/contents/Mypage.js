import React, { Component } from "react";

// router-dom
import { Route, Switch } from "react-router-dom";

// component
import MyNavbar from "../components/Navbar/MyNavbar";
import MyHeader from "../components/Navbar/MyHeader";
import Mycrud from "../components/Button/Mycrud";
import Myhistory from "./Myhistory";
import Mylist from "./Mylist";

//
class Mypage extends Component {
  render() {
    return (
      <div>
        <MyNavbar />
        <MyHeader />
        <Mycrud />
        <Switch>
          {/* <Route path="/Mylist" component={Mylist}></Route> */}
          <Route path="/Mypage" component={Mylist}></Route>
          {/* <Route path="/Mylist" component={Mylist}></Route> */}
        </Switch>
      </div>
    );
  }
}

export default Mypage;
