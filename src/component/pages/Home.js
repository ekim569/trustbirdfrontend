import React from "react";
import homeimage from "../icons/부동산 1.jpg"
import { Card, Button, Container, Row, Col, Form } from "react-bootstrap";
import ReactFullpage from '@fullpage/react-fullpage'
import "./Page.css"
import ServiceIntro from "./ServiceIntro"
import FoundationIntro from "./FoundationIntro"

//Home
const Home = () => {
  return(
 
  <ReactFullpage
  //fullpage options
  scrollingSpeed = {1000} /* Options here */

  render={({ state, fullpageApi }) => {
    return (
      <ReactFullpage.Wrapper>
        <div className={"section"}  >
          <div className="homeimage"  onClick={() => fullpageApi.moveSectionDown()} />
        </div>
        <div className="section">
          <ServiceIntro />
          
        </div>
        <div className="section">
          <FoundationIntro />
        </div>
      </ReactFullpage.Wrapper>
    );
  }}
/>
  );
};

export default Home;
