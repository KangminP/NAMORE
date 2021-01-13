import React from "react";

// reactstrap
import {
  NavItem,
  NavLink,
  Nav,
  Card,
  CardHeader,
  CardBody,
  TabContent,
  TabPane,
} from "reactstrap";

function IntroCategory() {
  const [iconTabs, setIconTabs] = React.useState("1");
  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <div className="rec-title">RECIPE CATEGORY</div>
      <Card>
        <CardHeader>
          <Nav
            className="justify-content-center"
            role="tablist"
            tabs
            style={{ padding: "20px 20px 0 20px" }}
          >
            <NavItem className="rec-item">
              <NavLink
                className={iconTabs === "1" ? "active" : ""}
                href="#pablo"
                onClick={(e) => {
                  e.preventDefault();
                  setIconTabs("1");
                }}
                style={{ fontSize: "16px" }}
              >
                나를 위한
              </NavLink>
            </NavItem>
            <NavItem className="rec-item">
              <NavLink
                className={iconTabs === "2" ? "active" : ""}
                href="#pablo"
                onClick={(e) => {
                  e.preventDefault();
                  setIconTabs("2");
                }}
                style={{ fontSize: "16px" }}
              >
                가진 재료로
              </NavLink>
            </NavItem>
            <NavItem className="rec-item">
              <NavLink
                className={iconTabs === "3" ? "active" : ""}
                href="#pablo"
                onClick={(e) => {
                  e.preventDefault();
                  setIconTabs("3");
                }}
                style={{ fontSize: "16px" }}
              >
                인기 많은
              </NavLink>
            </NavItem>
          </Nav>
        </CardHeader>
        <CardBody>
          <TabContent className="text-center" activeTab={"iconTabs" + iconTabs}>
            <TabPane tabId="iconTabs1">
              <p>
                I think that’s a responsibility that I have, to push
                possibilities, to show people, this is the level that things
                could be at. So when you get something that has the name Kanye
                West on it, it’s supposed to be pushing the furthest
                possibilities. I will be the leader of a company that ends up
                being worth billions of dollars, because I got the answers. I
                understand culture. I am the nucleus.
              </p>
            </TabPane>
            <TabPane tabId="iconTabs2">
              <p>
                I will be the leader of a company that ends up being worth
                billions of dollars, because I got the answers. I understand
                culture. I am the nucleus. I think that’s a responsibility that
                I have, to push possibilities, to show people, this is the level
                that things could be at. I think that’s a responsibility that I
                have, to push possibilities, to show people, this is the level
                that things could be at.
              </p>
            </TabPane>
            <TabPane tabId="iconTabs3">
              <p>
                I think that’s a responsibility that I have, to push
                possibilities, to show people, this is the level that things
                could be at. So when you get something that has the name Kanye
                West on it, it’s supposed to be pushing the furthest
                possibilities. I will be the leader of a company that ends up
                being worth billions of dollars, because I got the answers. I
                understand culture. I am the nucleus.
              </p>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </div>
  );
}

export default IntroCategory;
