import React from "react";

import introimage from "../icons/KakaoTalk_20201021_142548256_02.png"
import { Container, Card } from "react-bootstrap";
import "./Page.css"

//Foundation Introduce
const FoundationIntro = () => {
  return (
    <Container >
      <div className="pageheader" >재단 소개</div>
      <Card className="cardlayout">
      <Card.Img variant="top" src={introimage} className="imagesize" />
      <Card.Body>
        <Card.Text>
          Some quick example text to build on the card title and make up the bulk
          of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
    </Container>
  );
};

//Foundation Introduce
export default FoundationIntro;
