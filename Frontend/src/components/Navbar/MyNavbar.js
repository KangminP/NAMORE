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
import { BiHomeAlt, BiPowerOff } from "react-icons/bi";

const MyNavbar = () => {
  return (
    <div>
      <Navbar
        style={{
          backgroundColor: "black",
          margin: 0,
          height: "4vw",
        }}
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
              position: "sticky",
            }}
          >
            <NavItem>
              <NavLink
                tag={Link}
                to="/Main"
                id="mypage-tooltip"
                style={{ padding: "8px 1vw 8px 1vw" }}
              >
                {/* <Link
                  to="/Main"
                  style={{
                    textDecoration: "none",
                  }}
                > */}
                <BiHomeAlt size={23} />
                {/* </Link> */}
              </NavLink>
              <UncontrolledTooltip target="#mypage-tooltip">
                Home
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
};

export default MyNavbar;
