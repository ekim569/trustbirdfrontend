import React, { useEffect, useState } from "react";
import { Container, Table, Pagination, Col } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import "./Page.css";

//Maintenance Fee
const MaintenanceFee = () => {
  const history = useHistory();
  const [maintenaceFee, setMaintenanceFee] = useState({
    claimingAgency: "",
    electronicPaymentNum: "",
    dueDate: "",
    deadline: "",
    amountDeadline: "",
    payment: "",
    payer:"",
    giro:"",
  });

  useEffect(() => {
    fetch("/api/maintenacefee/find").then((maintenaceFee) => {
      setMaintenanceFee(maintenaceFee);
    });
  });

  // props, useEffect, useState
  // useHistroy 라우터로 main
  return(
    <Container>
    <div className="maintenanceimage" >
    <div className="pageheader" style={{marginTop:"50px"}} >관리비 내역</div>
    </div>
    <Table bordered={true}>
      <thead>
        <tr >
          <th>관리비 청구 기관</th>
          <th>관리비 전자납부번호</th>
          <th>관리비 납기 내 기한</th>
          <th>관리비 납기 후 기한</th>
          <th>관리비 납부금액</th>
          <th>관리비 납부금액</th>
        </tr>
        <tr><td>df</td><td>df</td><td>df</td><td>df</td><td>df</td><td>df</td></tr>
      </thead>
      <tbody>
      </tbody>
    </Table>

   
  </Container>
  );
  return (
    <Container>
      <div className="pageheader">관리비 내역</div>
      <Table bordered={true} style={{ marginBottom: "100px" }}>
        
          <tr>
            <Col className="collayout4" sm={4}>
              관리비 청구기관
            </Col>
            <td>{maintenaceFee.claimingAgency}</td>
          </tr>
          <tr>
            <td>관리비 전자납부번호</td>
            <td>{maintenaceFee.electronicPaymentNum}</td>
          </tr>
          <tr>
            <td>관리비 납기 내 기한</td>
            <td>{maintenaceFee.dueDate}</td>
          </tr>
          <tr>
            <td>관리비 납기 후 기한</td>
            <td>{maintenaceFee.deadLine}</td>
          </tr>
          <tr>
            <td>관리비 납기 후 금액</td>
            <td>{maintenaceFee.amountDeadline}</td>
          </tr>
          <tr>
            <td>관리비 납부금액</td>
            <td>{maintenaceFee.payment}</td>
          </tr>
      </Table>
    </Container>
  );
};

export default MaintenanceFee;
