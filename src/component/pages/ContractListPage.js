import React from "react";
import { Container, Table, Button } from "react-bootstrap";

const ContractListPage = ({ contractList, loc, pageLimit }) => {
  return (
    <Container style={{ marginTop: "150px" }}>
      <div className="maintenanceimage">
        <div className="pageheader" style={{ marginTop: "50px" }}>
          계약서 리스트
        </div>
      </div>
      <Table
        bordered={true}
        style={{ marginBottom: "100px", textAlign: "center" }}
      >
        <thead>
          <tr>
            <th style={{ width: "5%" }}>NO.</th>
            <th>계약 소재지</th>
            <th>지목</th>
            <th>토지 면적</th>
            <th>용도</th>
            <th>건물 면적</th>
            <th>임대 부분</th>
            <th>부분 면적</th>
            <th>임대 형태</th>
            <th>임대 기간</th>
            <th>보증금</th>
            <th>계약금</th>
            <th>중도금</th>
            <th>잔금</th>
            <th>차임</th>
            <th>특약사항</th>
            <th>
              <th>임대인</th>
            </th>
            <th>
              <th>임차인</th>
            </th>
            <th>
              <th>중계인</th>
            </th>
            <th style={{ width: "140px" }}>상세 보기</th>
          </tr>
        </thead>
        <tbody>
          {contractList
            .slice(pageLimit * (parseInt(loc) - 1), pageLimit * parseInt(loc))
            .map((contract) => (
              <tr key={contract.token}>
                <td>{contract.no}</td>
                <td>{contract.type}</td>
                <td>{contract.securityDeposit}</td>
                <td>{contract.rent}</td>
                <td>{contract.periodStart}</td>
                <td>{contract.periodEnd}</td>
                <td>{contract.status}</td>
                <td>
                  <Button variant="" className="scopeimage"></Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ContractListPage;
