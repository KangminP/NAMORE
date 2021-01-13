import React, { Component } from "react";

// reactstrap
import { Container } from "reactstrap";

import "./MyHeader.css";

// class Mypage extends Component {
//   render() {
//     return (
//       <div>
//         <MyNavbar />
//         마이페이지
//       </div>
//     );
//   }
// }

// export default Mypage;

let pageHeader = React.createRef();

class Mypage extends Component {
  useEffect = () => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  };
  render() {
    return (
      <>
        <div className="page-header-my">
          <div
            className="page-header-image"
            style={{
              backgroundImage:
                "url(" + require("../../assets/img/myimg.jpg") + ")",
            }}
            ref={pageHeader}
          >
            <div className="back-dark-my"></div>
          </div>
          <div className="content-center">
            <Container>
              <div className="profile-body">
                <div className="profile-title">환영합니다.</div>
                <div className="profile-content">
                  {JSON.parse(sessionStorage.getItem("userData")).username} 님의
                  <br />
                  페이지입니다.
                </div>
              </div>
            </Container>
          </div>
        </div>
      </>
    );
  }
}

export default Mypage;
