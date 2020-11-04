import React from "react";
import { Card, Button, Container, Row, Col, Form } from "react-bootstrap";
import ReactFullpage from "@fullpage/react-fullpage";
import "./Page.css";
import ServiceIntro from "./ServiceIntro2";
import FoundationIntro from "./FoundationIntro2";
import { Link } from "react-router-dom";

//Home
const Home = () => {
  return(
 
  <ReactFullpage
  //fullpage options
  scrollingSpeed = {1000} /* Options here */

  render={({ state, fullpageApi }) => {
    return (
      <ReactFullpage.Wrapper>
        <div class="section"  >
          <div className="homeimage"  onClick={() => fullpageApi.moveSectionDown()} />
        </div>
        <div class="section" onClick={() => fullpageApi.moveSectionDown()}>
    <div className="sectionheader" >서비스 소개</div>
          <ServiceIntro />      
        </div>
        <div class="section">
      <div className="sectionheader" >재단 소개</div>
          <FoundationIntro />
        </div>
      </ReactFullpage.Wrapper>
    );
  }}
/>
  );
};

export default Home;
