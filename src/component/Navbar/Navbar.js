import React, { useEffect, useState } from "react";
import {
  Navbar as BootStrapNavbar,
  Nav,
  NavDropdown,
  Container,
} from "react-bootstrap";

import Logo from "../icons/LogoIcon";
import "./Navbar.css";

import PageLink from "./pageLink";
import AuthToken from "../../storages/Auth";

export default function Navbar(props) {
  const [token, setToken] = useState();
  const [username, setUsername] = useState();

  useEffect(() => {
    const _token = AuthToken.get();

    if(_token !== ""){
      setToken(_token)
    
      fetch("http://192.168.0.143:3001/api/user/infomation", {
        mode: "cors",
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${_token}`,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then((res) => {
          setUsername(res.user.username);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [token]);

  const onClickSignOut = () => {
    setToken("");
    AuthToken.set("");
  };

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
            {token ? (
              <div >
              <img className="usericon" src='https://www.flaticon.com/svg/static/icons/svg/2948/2948035.svg' /> 
              <NavDropdown
                title={username}
                id="basic-nav-dropdown"
                style={{display:"inline-block", fontWeight:"bold", }}
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
                <NavDropdown.Item href="/" onClick={onClickSignOut}>
                  로그아웃
                </NavDropdown.Item>
              </NavDropdown>
              </div>
            ) : (
              <div style={{display:"inline-block"}}>
              <Nav.Link href="/signin" className="navlink">
                로그인
              </Nav.Link>
              <Nav.Link href="/signup" className="navlink">
                회원가입
                </Nav.Link>
              </div>
            )}
          </Nav>
        </BootStrapNavbar.Collapse>
      </Container>
    </BootStrapNavbar>
  );
}
