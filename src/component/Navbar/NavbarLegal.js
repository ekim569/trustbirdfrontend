import React, { useEffect, useState } from "react";
import {
  Navbar as BootStrapNavbar,
  Nav,
  NavDropdown,
  Container,
} from "react-bootstrap";
// import Logo from "../../icons/LogoIcon";
import Logo from "../../icons/LogoIcon";
import "./Navbar.css";
import PageLink from "./pageLink";
import AuthToken from "../../storages/Auth";

export default function NavbarLegal(props) {
  const [token, setToken] = useState();
  const [user, setUser] = useState({
    username: "",
    email: "",
    permission: "",
  });

  useEffect(() => {
    const _token = AuthToken.get();

    if (_token !== "") {
      setToken(_token);

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
          setUser(res.user);
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
                    <NavDropdown.Item href="/createuser/admin">
                    사용자 생성
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/userlist/admin">
                    사용자 목록
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/trustlist/admin">
                    신탁 내역 확인
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/contractlist/admin">
                    계약 내역 확인
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/maintenancefeelist/admin">
                    관리비 납부내역
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/maintenancefeeinput/admin">
                    관리비 입력
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
