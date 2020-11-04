import React from "react";
import { Container, Table, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const TrustListPage = ({ trustList, loc, pageLimit }) => {
const history = useHistory()

    return (
      <Container style={{ marginTop: "150px" }}>
        <div className="maintenanceimage">
          <div className="pageheader" style={{ marginTop: "50px" }}>
            신탁 계약 내역 목록
          </div>
        </div>
        <Table
          bordered={true}
          style={{ marginBottom: "100px", textAlign: "center" }}
        >
          <thead>
            <tr>
              <th>NO.</th>
              <th>종류</th>
              <th>보증금</th>
              <th>전월세</th>
              <th>신탁 시작일</th>
              <th>신탁 종류일</th>
              <th>신탁 상태</th>
              <th style={{ width: "140px" }}>상세 보기</th>
            </tr>
          </thead>
          <tbody>
            {trustList
              .slice(pageLimit * (parseInt(loc) - 1), pageLimit * parseInt(loc))
              .map((trust) => (
                <tr key={trust.token}>
                  <td>{trust.no}</td>
                  <td>{trust.type}</td>
                  <td>{trust.securityDeposit}</td>
                  <td>{trust.rent}</td>
                  <td>{trust.periodStart}</td>
                  <td>{trust.periodEnd}</td>
                  <td>{trust.status}</td>
                  <td>
                    <Button variant="" className="scopeimage" onClick={(e)=>{
                        e.preventDefault();
                        history.push(`/trust?token=${trust.token}`)
                    }} />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
    );
  };

export default TrustListPage;