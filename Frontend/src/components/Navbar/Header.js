import React, { useState } from "react";

// router-dom
import { Link } from "react-router-dom";

// reactstrap
import { Container } from "reactstrap";

// react-icons
import { BiSearchAlt } from "react-icons/bi";

// css
import "./Header.css";

function Header() {
  const [keywordState, setKeyword] = useState({
    keyword: "",
    submit: false,
  });

  let pageHeader = React.createRef();

  React.useEffect(() => {
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
  });

  return (
    <>
      <div className="page-header page-header-small">
        <div
          className="page-header-image"
          style={{
            backgroundImage:
              "url(" + require("../../assets/img/headerimg.jpg") + ")",
          }}
          ref={pageHeader}
        >
          <div className="back-dark"></div>
        </div>
        <div className="content-center">
          <Container>
            <div className="search-body">
              <div className="search-title">
                먹고 싶은 음식 레시피를 검색해보세요.
              </div>
              <div className="searchbar">
                <input
                  placeholder="Enter Keyword"
                  type="text"
                  className="search-input"
                  onChange={(e) => {
                    setKeyword({ keyword: e.target.value });
                  }}
                />

                <Link
                  // to={`/Search?=${keywordState.keyword}`}
                  to={`/Search/${keywordState.keyword}`}
                  className="search-btn"
                >
                  <BiSearchAlt
                    size={30}
                    color="black"
                    onClick={(e) => {
                      // console.log(keywordState);
                    }}
                  />
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}

// let pageHeader = React.createRef();

// class Header extends Component {
//   componentDidMount() {
//     if (window.innerWidth > 991) {
//       const updateScroll = () => {
//         let windowScrollTop = window.pageYOffset / 3;
//         pageHeader.current.style.transform =
//           "translate3d(0," + windowScrollTop + "px,0)";
//       };
//       window.addEventListener("scroll", updateScroll);
//       return function cleanup() {
//         window.removeEventListener("scroll", updateScroll);
//       };
//     }
//   }

//   render() {
//     return (
//       <div className="page-header page-header-small">
//         <div
//           className="page-header-image"
//           style={{
//             backgroundImage:
//               "url(" + require("../../assets/img/headerimg.jpg") + ")",
//           }}
//           ref={pageHeader}
//         >
//           <div className="back-dark"></div>
//         </div>
//         <div className="content-center">
//           <Container>
//             <div className="search-body">
//               <div className="search-title">
//                 먹고 싶은 음식 레시피를 검색해보세요.
//               </div>
//               <div className="searchbar">
//                 <input type="text" className="search-input" />
//                 <Link to="/Search" className="search-btn">
//                   <BiSearchAlt size={30} color="black" />
//                 </Link>
//               </div>
//             </div>
//           </Container>
//         </div>
//       </div>
//     );
//   }
// }

export default Header;
