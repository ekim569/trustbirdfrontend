import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import AuthToken from "../../storages/Auth";
import "./Page.css";

//Maintenance Fee
const MaintenanceFee = ({ electronicPaymentNum }) => {
  const token = AuthToken.get();

  const [maintenanceFee, setMaintenanceFee] = useState({
    claimingAgency: "",
    electronicPaymentNum: "",
    startDate: "",
    dueDate: "",
    amountDeadline: "",
    amountDueDate: "",
    payment: "",
    payer: "",
    giro: "",
  });

  useEffect(() => {
    fetch(
      `http://192.168.0.143:3001/api/maintenanceFee/find?electronicPaymentNum=${electronicPaymentNum}`,
      {
        mode: "cors",
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((res) => {
        setMaintenanceFee(res);
      });
  }, [electronicPaymentNum]);

  // props, useEffect, useState
  // useHistroy 라우터로 main
  return (
    <Container>
      <Table bordered={true}>
        <thead>
          <tr>
            <th>관리비 청구 기관</th>
            <td>{maintenanceFee.claimingAgency}</td>
          </tr>
          <tr>
            <th>관리비 전자납부번호</th>
            <td>{maintenanceFee.electronicPaymentNum}</td>
          </tr>
          <tr>
            <th>관리비 납기일</th>
            <td>{maintenanceFee.dueDate}</td>
          </tr>
          <tr>
            <th>관리비 납기 내 금액</th>
            <td>{maintenanceFee.payment}</td>
          </tr>
          <tr>
            <th>관리비 납기 후 금액</th>
            <td>{maintenanceFee.amountDueDate}</td>
          </tr>
          <tr></tr>
        </thead>
        <tbody></tbody>
      </Table>
    </Container>
  );

  // );
};

export default MaintenanceFee;
