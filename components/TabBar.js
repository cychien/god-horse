import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import HomeIcon from "../assets/icons/home.svg";
import UserIcon from "../assets/icons/user.svg";
import BikeIcon from "../assets/icons/bike.svg";

function TabBar() {
  const router = useRouter();
  const pathname = router.pathname;
  const [currentTab, setCurrentTab] = useState("");

  useEffect(() => {
    if (pathname.includes("home")) {
      setCurrentTab("home");
    } else if (pathname.includes("user")) {
      setCurrentTab("user");
    } else if (pathname.includes("bike")) {
      setCurrentTab("bike");
    }
  }, [pathname, setCurrentTab]);

  return (
    <Container>
      <Tab
        selected={currentTab === "home"}
        onClick={() => {
          Router.push("/home");
        }}
      >
        <IconWrapper selected={currentTab === "home"}>
          <HomeIcon />
        </IconWrapper>
        {currentTab === "home" && (
          <span style={{ marginLeft: "4px", fontSize: "14px" }}>首頁</span>
        )}
      </Tab>
      <Tab
        selected={currentTab === "user"}
        onClick={() => {
          Router.push("/user");
        }}
      >
        <IconWrapper selected={currentTab === "user"}>
          <UserIcon />
        </IconWrapper>
        {currentTab === "user" && (
          <span style={{ marginLeft: "4px", fontSize: "14px" }}>個人資訊</span>
        )}
      </Tab>
      <Tab
        selected={currentTab === "bike"}
        special
        onClick={() => {
          Router.push("/bike");
        }}
      >
        {/* TODO */}
        <IconWrapper selected={currentTab === "bike"} special>
          <BikeIcon />
        </IconWrapper>
        {currentTab === "bike" && (
          <span style={{ marginLeft: "4px", fontSize: "14px" }}>神駒團</span>
        )}
      </Tab>
    </Container>
  );
}

export default TabBar;

const Container = styled.div`
  background: #f8f9fa;
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  height: 64px;
  right: 0;
  left: 0;
  padding: 0 20px;
`;

const Tab = styled.div`
  flex-basis: 0;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) =>
    props.selected ? (props.special ? "#FFCD00" : "#21A4F4") : "#CED4DA"};
`;

const IconWrapper = styled.div`
  position: relative;
  ${(props) =>
    props.selected
      ? css`
          &::after {
            content: "";
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background-color: ${props.special ? "#ffcd00" : "#21A4F4"};
            position: absolute;
            bottom: -3px;
            left: 50%;
            transform: translateX(-50%);
          }
        `
      : ""}
`;
