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
import { BiHomeAlt, BiListOl, BiUserCircle, BiPowerOff } from "react-icons/bi";

function TempNavbar() {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 449 ||
        document.body.scrollTop > 449
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 450 ||
        document.body.scrollTop < 450
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
          <Nav
            className="mr-auto"
            style={{
              height: "100%",
              lineHeight: "100%",
              display: "block-cell",
            }}
          >
            <NavItem>
              <NavLink target="_blank" id="main-tooltip">
                <Link exact to="/Intro" style={{ textDecoration: "none" }}>
                  <BiHomeAlt size={23} />
                </Link>
              </NavLink>
              <UncontrolledTooltip target="#main-tooltip">
                Home
              </UncontrolledTooltip>
            </NavItem>
            <NavItem>
              <NavLink target="_blank" id="recipe-tooltip">
                <Link exact to="/Main" style={{ textDecoration: "none" }}>
                  <BiListOl size={23} />
                </Link>
              </NavLink>
              <UncontrolledTooltip target="#recipe-tooltip">
                Recipe
              </UncontrolledTooltip>
            </NavItem>
          </Nav>
          <div className="navbar-translate">
            <div>
              <Link
                exact
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
              <NavLink target="_blank" id="mypage-tooltip">
                <Link
                  exact
                  to="/Mypage"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <BiUserCircle size={23} />
                </Link>
              </NavLink>
              <UncontrolledTooltip target="#mypage-tooltip">
                Account
              </UncontrolledTooltip>
            </NavItem>
            <NavItem>
              <NavLink
                target="_blank"
                id="logout-tooltip"
                onClick={(e) => {
                  sessionStorage.removeItem("userToken");
                  alert("성공적으로 로그아웃했습니다.");
                }}
              >
                <Link exact to="/Home" style={{ textDecoration: "none" }}>
                  <BiPowerOff size={23} />
                </Link>
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
export default TempNavbar;
