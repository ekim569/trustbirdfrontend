import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import AuthToken from "../../storages/Auth";

//Maintenance Fee
const MaintenanceFee = ({ electronicPaymentNum }) => {
  const token = AuthToken.get();

  const [maintenanceFee, setMaintenanceFee] = useState({
    claimingAgency: "",
    email: "",
    electronicPaymentNum: "",
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

  return (
    <Container style={{ textAlign: "center" }}>
      <Table bordered={true}>
        <thead>
          <tr>
            <th>이메일</th>
            <td>{maintenanceFee.email}</td>
          </tr>
          <tr>
            <th style={{ width: "40%" }}> 관리비 청구 기관</th>
            <td> {maintenanceFee.claimingAgency}</td>
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
            <td>{maintenanceFee.amountDeadline}</td>
          </tr>
          <tr>
            <th>관리비 납기 후 금액</th>
            <td>{maintenanceFee.amountDue}</td>
          </tr>
          <tr>
            <th>납부자</th>
            <td>{maintenanceFee.payer}</td>
          </tr>
          <tr>
            <th>납입금액</th>
            <td>{maintenanceFee.payment}</td>
          </tr>
          <tr>
            <th>지로</th>
            <td>
              <a
                href={`http://192.168.0.143:8080/ipfs/${maintenanceFee.giro.filePath}`}
                target="_blank"
              >
                <Button className="scopeimage"></Button>
              </a>
            </td>
          </tr>
        </thead>
        <tbody></tbody>
      </Table>
    </Container>
  );

  // );
};

export default MaintenanceFee;
