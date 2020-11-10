import React from "react";
import {
  Navbar as BootStrapNavbar,
  Nav,
  NavDropdown,
  Container,
} from "react-bootstrap";
import Logo from "../../icons/LogoIcon";
import PageLink from "./pageLink";

import "./Navbar.css";

export default function NavbarAccountng(props) {
  return (
    <BootStrapNavbar
      fixed="top"
      expand="lg"
      style={{
        borderBottomWidth: 1,
        borderColor: "#c2c2c2",
        borderBottomStyle: "solid",
        background: "#ffffff",
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
        </BootStrapNavbar.Brand>
        <BootStrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootStrapNavbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
            <Nav.Link className="navlink">
              <PageLink to="/fundationintro">재단소개</PageLink>
            </Nav.Link>

            <Nav.Link className="navlink">
              <PageLink to="/trustsub">신탁 계약</PageLink>
            </Nav.Link>

            <Nav.Link className="navlink">
              <PageLink to="/serviceintro">정보소개</PageLink>
            </Nav.Link>
              <div>
                <img
                  className="usericon"
                  src="https://www.flaticon.com/svg/static/icons/svg/2948/2948035.svg"
                />
                <NavDropdown
                  title={props.username}
                  id="basic-nav-dropdown"
                  style={{ display: "inline-block", fontWeight: "bold" }}
                  className="navlink nav"
                >
                  <NavDropdown.Item href="/membership">
                  멤버십 신청
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/trustlist">
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
                  <NavDropdown.Item href="/" onClick={props.onClickSignOut}>
                  로그아웃
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
          </Nav>
        </BootStrapNavbar.Collapse>
      </Container>
    </BootStrapNavbar>
  );
}
