import React from "react"
import { Container, Card } from "react-bootstrap"

//Service Introduce
const ServiceIntro = () => {
  return (
    <Container >
      <Card className="cardlayout2">
        <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/img/service_img.svg`} className="imagesize" />
        <Card.Body>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk
            of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
   </Container>
  )
}

export default ServiceIntro
