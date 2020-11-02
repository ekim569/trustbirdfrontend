import React, { useEffect, useState } from "react";
import { Container, Table, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./Page.css";

//Maintenance Fee
const MaintenanceFee = () => {
  const history = useHistory();
  const [maintenanceFee, setMaintenanceFee] = useState({
    claimingAgency: "",
    electronicPaymentNum: "",
    dueDate: "",
    deadline: "",
    amountDeadline: "",
    amountDueDate:"",
    payment: "",
    payer: "",
    giro: "",
  });

  useEffect(() => {
    const body = {
      email : "page1111@naver.com"
    }

    fetch("http://192.168.0.22:3001/api/user/maintenancefee/find").then((maintenanceFee) => {
      method:"GET"
      setMaintenanceFee(maintenanceFee);
    });
  });

  // props, useEffect, useState
  // useHistroy 라우터로 main
  return(
    <Container>
    <Table bordered={true}>
      <thead>
        <tr >
          <th>관리비 청구 기관</th>
          <th>관리비 전자납부번호</th>
          <th>관리비 납기 내 기한</th>
          <th>관리비 납기 후 기한</th>
          <th>관리비 납기 내 금액</th>
          <th>관리비 납기 후 금액</th>
        </tr>
        <tr><td>{maintenanceFee.claimingAgency}</td><td>{maintenanceFee.electronicPaymentNum}</td><td>{maintenanceFee.dueDate}</td><td>{maintenanceFee.deadline}</td><td>{maintenanceFee.amountDueDate}</td><td>{maintenanceFee.amountDeadline}</td></tr>
      </thead>
      <tbody>
      </tbody>
    </Table>

   
  </Container>
  );
 
  // );
};

export default MaintenanceFee;
