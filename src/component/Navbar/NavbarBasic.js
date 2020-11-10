import React from "react"
import { Navbar as BootStrapNavbar, Nav, Container } from "react-bootstrap"

import PageLink from "./pageLink"
import Logo from "../../icons/LogoIcon"

import "./Navbar.css"

export default function NavbarBasic(props) {
  return (
    <BootStrapNavbar fixed="top" expand="lg" style={{ borderBottomWidth: 1, borderColor: "#c2c2c2", borderBottomStyle: "solid", background: "#ffffff" }}>
      <Container style={{ margin: "auto", maxWidth: "1500px" }}>
        <BootStrapNavbar.Brand href="/">
          <div>
            <div style={{ display: "inline-block" }}>
              <Logo />
            </div>
            <h3 style={{ fontSize: 24, display: "inline-block", marginLeft: "16px", marginBottom: "0", color: " #3B72F2", fontWeight: "bold" }}> TrustBird </h3>
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

            <div style={{ display: "inline-block" }}>
              <Nav.Link href="/signin" className="navlink">
              로그인
              </Nav.Link>
              <Nav.Link href="/signup" className="navlink">
              회원가입
              </Nav.Link>
            </div>
          </Nav>
        </BootStrapNavbar.Collapse>
      </Container>
    </BootStrapNavbar>
  )
}
