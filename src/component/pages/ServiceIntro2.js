import React from "react";
import { Container, Card } from "react-bootstrap";
import serviceimage from "../icons/부동산2.svg"
import "./Page.css"

//Service Introduce
const ServiceIntro = () => {
  return (
    <Container >
      <Card className="cardlayout2">
      <Card.Img variant="top" src={serviceimage} className="imagesize" />
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

export default ServiceIntro;
