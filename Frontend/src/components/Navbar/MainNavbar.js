import React from "react";

// react-router-dom
import { Link } from "react-router-dom";

// reactstrap
import {
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledTooltip,
} from "reactstrap";

// react-icons
import { BiUserCircle, BiPowerOff } from "react-icons/bi";

function MainNavbar() {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 399 ||
        document.body.scrollTop > 399
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 400 ||
        document.body.scrollTop < 400
      ) {
        setNavbarColor("navbar-transparent");
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  return (
    <div>
      <Navbar
        className={"fixed-top " + navbarColor}
        expand="lg"
        style={{ backgroundColor: "black", height: "4vw" }}
      >
        <Container>
          <div className="navbar-translate">
            <div>
              <Link
                to="/Main"
                style={{ textDecoration: "none", fontSize: "1.3rem" }}
              >
                NAMORE
              </Link>
            </div>
          </div>
          <Nav
            className="ml-auto"
            style={{
              height: "100%",
              lineHeight: "100%",
              display: "block-cell",
            }}
          >
            <NavItem>
              <NavLink
                tag={Link}
                to="/Mypage"
                id="mypage-tooltip"
                style={{ padding: "8px 1vw 8px 1vw" }}
              >
                {/* <Link
                  exact
                  to="/Mypage"
                  style={{
                    textDecoration: "none",
                  }}
                > */}
                <BiUserCircle size={23} />
                {/* </Link> */}
              </NavLink>
              <UncontrolledTooltip target="#mypage-tooltip">
                Account
              </UncontrolledTooltip>
            </NavItem>
            <NavItem>
              <NavLink
                tag={Link}
                to="/Home"
                id="logout-tooltip"
                style={{ padding: "8px 1vw 8px 1vw" }}
                onClick={(e) => {
                  sessionStorage.removeItem("userToken");
                  sessionStorage.removeItem("userData");
                  alert("성공적으로 로그아웃했습니다.");
                }}
              >
                {/* <Link
                  to="/Home"
                  style={{ textDecoration: "none" }}
                  onClick={(e) => {
                    sessionStorage.removeItem("userToken");
                    sessionStorage.removeItem("userData");
                    alert("성공적으로 로그아웃했습니다.");
                  }}
                > */}
                <BiPowerOff size={23} />
                {/* </Link> */}
              </NavLink>
              <UncontrolledTooltip target="#logout-tooltip">
                Logout
              </UncontrolledTooltip>
            </NavItem>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
//
export default MainNavbar;
