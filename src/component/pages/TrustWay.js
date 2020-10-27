import React from "react";
import "./Page.css"

import { Container, Card } from "react-bootstrap";

//Turst Way
const TrustWay = () => {
  return ( 
    <Container  >
    <div className="pageheader">신탁 방법</div>
      <Card>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Text>
          신탁을 하기 위해서는 원하는 매물과 중개인의 정보를 신탁 신청서에 작성해 주시면 됩니다.
        </Card.Text>
      </Card.Body>
    </Card>
   </Container>
    );
};

export default TrustWay;
