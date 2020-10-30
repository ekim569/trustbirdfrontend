import React, { useEffect, useState } from "react";
import {
  Navbar as BootStrapNavbar,
  Nav,
  NavDropdown,
  Container,
} from "react-bootstrap";
import { useParams } from "react-router-dom";

import Logo from "../icons/LogoIcon";
import "./Navbar.css";

import PageLink from "./pageLink";

export default function Navbar(props) {
  const [isLogined, setIsLogined] = useState(false);
  useEffect(() => {
    setIsLogined(true);
    // setIsLogined(Auth.isLogined());
  }, []);

  return (
    <BootStrapNavbar
      fixed="top"
      bg="#ffffff"
      expand="lg"
      style={{
        borderBottomWidth: 1,
        borderColor: "#c2c2c2",
        borderBottomStyle: "solid",
        background: "white",
      }}
    >
      <Container style={{ margin: "auto", maxWidth: "1500px" }}>
        <BootStrapNavbar.Brand href="/main">
          <div>
            <div style={{ display: "inline-block" }}>
              <Logo />
            </div>
            <h3
              style={{
                fontSize: 24,
                display: "inline-block",
                marginLeft: "16px",
                marginBottom: "0",
                color: " #3B72F2",
                fontWeight: "bold",
              }}
            >
              TrustBird
            </h3>
          </div>
          {/* <img
            alt=""
            src={require("../images/bird.svg")}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "} */}
        </BootStrapNavbar.Brand>
        <BootStrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootStrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link className="navlink">
              <PageLink to="/fundationintro">재단소개</PageLink>
            </Nav.Link>

            <Nav.Link className="navlink">
              <PageLink to="/trust">신탁 계약</PageLink>
            </Nav.Link>

            <Nav.Link className="navlink">
              <PageLink to="/serviceintro">정보소개</PageLink>
            </Nav.Link>
            {isLogined ? (
              <NavDropdown
                title="개인정보"
                id="basic-nav-dropdown"
                className="navlink"
              >
                <NavDropdown.Item href="#action/3.1">
                  멤버십 신청
                </NavDropdown.Item>
                <NavDropdown.Item href="/contract">
                  신탁 내역 확인
                </NavDropdown.Item>
                <NavDropdown.Item href="/maintenancefeelist">
                  관리비 납부내역
                </NavDropdown.Item>
                <NavDropdown.Item href="/signModified">
                  회원 정보 수정
                </NavDropdown.Item>
                <NavDropdown.Item href="/withdrawal">
                  회원 탈퇴
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link href="/signin" className="navlink">
                로그인
              </Nav.Link>
            )}
          </Nav>
        </BootStrapNavbar.Collapse>
      </Container>
    </BootStrapNavbar>
  );
}
