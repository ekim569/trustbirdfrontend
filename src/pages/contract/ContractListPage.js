import React from "react"
import { useHistory } from 'react-router-dom'
import { Container, Table, Button } from "react-bootstrap"

const ContractListPage = ({ contractList, loc, pageLimit }) => {
  const history = useHistory()

  return (
    <Container style={{ marginTop: "150px" }}>
      <div className="maintenanceimage">
        <div className="pageheader" style={{ marginTop: "50px" }}> 계약서 리스트 </div>
      </div>
      <Table bordered={true} style={{ marginBottom: "100px", textAlign: "center" }}>
        <thead>
          <tr>
            <th style={{ width: "5%" }}>NO.</th>
            <th>계약 소재지</th>
            <th>임대 형태</th>
            <th>임대 시작일</th>
            <th>임대 만료일</th>
            <th style={{ width: "140px" }}>상세 보기</th>
          </tr>
        </thead>
        <tbody>
          {contractList
            .slice(pageLimit * (parseInt(loc) - 1), pageLimit * parseInt(loc))
            .map((contract) => (
              <tr key={contract.token}>
                <td>{contract.no}</td>
                <td>{contract.location}</td>
                <td>{contract.rentType}</td>
                <td>{contract.periodStart}</td>
                <td>{contract.periodEnd}</td>
                <td>
                  <Button variant="" className="scopeimage" onClick={(e) => {
                      e.preventDefault();
                      history.push(`/contract?token=${contract.token}`)
                    }}></Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default ContractListPage
