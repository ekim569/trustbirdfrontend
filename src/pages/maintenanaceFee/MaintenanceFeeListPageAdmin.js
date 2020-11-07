import React, { useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import MaintenanceFeeModal from "./MaintenanceFeeModal";
import AuthToken from "../../storages/Auth";

const MaintenanceFeeListPageAdmin = ({
  maintenanceFeeList,
  loc,
  pageLimit,
}) => {
  const history = useHistory();
  const [targetModalNum, setTargetModalNum] = useState(null);

  const onDelete = (electronicPaymentNum, email) => {
    const token = AuthToken.get();

    console.log(electronicPaymentNum, email);

    fetch(`http://192.168.0.143:3001/api/maintenanceFee/delete`, {
      mode: "cors",
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        electronicPaymentNum,
        email,
      }),
    }).then((res) => {
      if (res.status === 200) {
        alert("MaintenanceFee Delete Success");
      } else {
        alert("MaintenanceFee Delete Fail");
      }
      window.location.reload();
    });
  };

  return (
    <Container style={{ marginTop: "150px" }}>
      <div className="maintenanceimage">
        <div className="pageheader" style={{ marginTop: "50px" }}>
          관리비 내역 목록
        </div>
      </div>
      <Table
        bordered={true}
        style={{ marginBottom: "100px", textAlign: "center" }}
      >
        <thead>
          <tr>
            <th style={{ width: "5%" }}>NO.</th>
            <th>이메일</th>
            <th>청구 기관</th>
            <th>전자 납부 번호</th>
            <th>납기일</th>
            <th>납부 내 금액</th>
            <th style={{ width: "140px" }}>상세 보기</th>
            <th>수정</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {maintenanceFeeList
            .slice(pageLimit * (parseInt(loc) - 1), pageLimit * parseInt(loc))
            .map((maintenanceFee) => (
              <tr key={maintenanceFee.electronicPaymentNum}>
                <td>{maintenanceFee.no}</td>
                <td>{maintenanceFee.email}</td>
                <td>{maintenanceFee.claimingAgency}</td>
                <td>{maintenanceFee.electronicPaymentNum}</td>
                <td>{maintenanceFee.dueDate}</td>
                <td>{maintenanceFee.amountDue}</td>
                <td>
                  <Button
                    className="scopeimage"
                    onClick={() =>
                      setTargetModalNum(maintenanceFee.electronicPaymentNum)
                    }
                  />
                </td>
                <td>
                  <Button
                    className="updateimage"
                    onClick={(e) => {
                      e.preventDefault();
                      history.push(
                        `/maintenancefeemodified/admin?electronicPaymentNum=${maintenanceFee.electronicPaymentNum}`
                      );
                    }}
                  />
                </td>
                <td>
                  <Button
                    className="deleteimage"
                    onClick={() =>
                      onDelete(
                        maintenanceFee.electronicPaymentNum,
                        maintenanceFee.email
                      )
                    }
                  />
                </td>
              </tr>
            ))}
          {targetModalNum ? (
            <MaintenanceFeeModal
              electronicPaymentNum={targetModalNum}
              handleClose={() => setTargetModalNum(null)}
            />
          ) : null}
        </tbody>
      </Table>
    </Container>
  );
};

export default MaintenanceFeeListPageAdmin;
