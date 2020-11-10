import React from "react"
import { Container, Card } from "react-bootstrap"

//Foundation Introduce
const FoundationIntro = () => {
  return (
    <Container >
      <div className="pageheader" >재단 소개</div>
      <Card className="cardlayout">
        <Card.Img variant="top" className="foundationimage" />
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

export default FoundationIntro
