import React from "react";
import homeimage from "../icons/부동산 1.jpg"
import { Card, Button, Container, Row, Col, Form } from "react-bootstrap";
import ReactFullpage from '@fullpage/react-fullpage'
import "./Page.css"
import ServiceIntro from "./ServiceIntro2"
import FoundationIntro from "./FoundationIntro2"

//Home
const Home = () => {
  return(
 
  <ReactFullpage
  //fullpage options
  scrollingSpeed = {1000} /* Options here */

  render={({ state, fullpageApi }) => {
    return (
      <ReactFullpage.Wrapper>
        <div className="section"  >
          <div className="homeimage"  onClick={() => fullpageApi.moveSectionDown()} />
        </div>
        <div className="section">
    <div className="sectionheader">서비스 소개</div>
          <ServiceIntro />      
        </div>
        <div className="section">
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
