import React, { useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import MaintenanceFeeModal from './MaintenanceFeeModal';


const MaintenanceFeeListPage = ({ maintenanceFeeList, loc, pageLimit }) => {
  const [targetModalNum, setTargetModalNum] = useState(null);
  
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
            <th>관리비 청구 기관</th>
            <th>납부 날짜</th>
            <th>관리비</th>
            <th>납부 여부</th>
            <th style={{ width: "140px" }}>영수증 보기</th>
          </tr>
        </thead>
        <tbody>
          {maintenanceFeeList
            .slice(pageLimit * (parseInt(loc) - 1), pageLimit * parseInt(loc))
            .map((maintenanceFee) => (
              <tr key={maintenanceFee.token}>
                <td>{maintenanceFee.no}</td>
                <td>{maintenanceFee.amountDue}</td>
                <td>{maintenanceFee.claimingAgency}</td>
                <td>{maintenanceFee.dueDate}</td>
                <td>{maintenanceFee.electronicPaymentNum}</td>
                <td>
                  <Button className="scopeimage" onClick={() => setTargetModalNum(maintenanceFee.electronicPaymentNum)}/>
                </td>
              </tr>
            ))}
            {targetModalNum ? <MaintenanceFeeModal electronicPaymentNum={targetModalNum} handleClose={() => setTargetModalNum(null)} /> : null}
        </tbody>
      </Table>
    </Container>
  );
};


export default MaintenanceFeeListPage;
