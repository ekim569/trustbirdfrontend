import React from "react"
import { Container, Table } from "react-bootstrap"
import { Link } from 'react-router-dom'

const RecentTrustListPage = ({ presentTrustList, loc, pageLimit }) => {
  return (
    <Container style={{ marginTop: "150px"}}>
        <div className="pageheader" style={{ marginTop: "50px" }}>
          유저 현황
        </div>
      <Table responsive={"lg"} bordered={true} style={{ marginBottom: "100px", textAlign: " center",}} className="listshort">
        <thead >
          <tr>
            <th style={{width:"100px"}}>NO.</th>
            <th >신탁 토큰</th>
            <th>계약서 토큰</th>
          </tr>
        </thead>
        <tbody >
          {presentTrustList
            .slice(pageLimit * (parseInt(loc) - 1), pageLimit * parseInt(loc))
            .map((presentTrust) => (
              <tr key={presentTrust.no}>
                <td>{presentTrust.no}</td>
                <td>
                  <div style={{maxWidth:"400px", textOverflow:"ellipsis", overflow:"hidden", whiteSpace:"nowrap", margin:"auto"}}>
                    <Link to={`/trust?token=${presentTrust.trustToken}`}>{presentTrust.trustToken}</Link>
                  </div>
                </td>
                <td>
                  <div style={{maxWidth:"400px", textOverflow:"ellipsis", overflow:"hidden", whiteSpace:"nowrap", margin:"auto"}}>
                    <Link to={`/contract?token=${presentTrust.contractToken}`}>{presentTrust.contractToken}</Link>
                  </div>
                </td>
              </tr>)
            )
          }
        </tbody>
      </Table>
    </Container>
  )
}

export default RecentTrustListPage
