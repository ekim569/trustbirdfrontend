import React, {useState,useEffect} from "react"
import { Container, Table, Button } from "react-bootstrap"
import { useHistory } from "react-router-dom"

import AuthToken from '../../storages/Auth'

const TrustListPageAdmin = ({ trustList, loc, pageLimit }) => {
  const history = useHistory()
  const authToken = AuthToken.get()

  const [permission, setPermission] = useState()

  const onAcknowledge = (token) => {
    let status = ""

    permission === "legalTL" ? status = "법무팀 승인" : status = "계약금 입금 대기" 

    fetch(`${process.env.REACT_APP_SERVER}/api/trust/status`, {
      mode: "cors",
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`
      },
      body : JSON.stringify({token, status})
    })
    .then((res) => {
      if(res.status === 200) {
        alert(`${status} 완료`)
      } else {
        alert('Try again')
      }
      history.push('trustlist/admin')
    })
    .catch((err) => {
      console.error(err)
      alert("Error!")
    })
  }

  const onReject = (token) => {
    let status = ""

    permission === "legalTL" ? status = "법무팀 반려" : status = "시설팀 반려" 

    fetch(`${process.env.REACT_APP_SERVER}/api/trust/status`, {
      mode: "cors",
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`
      },
      body : JSON.stringify({token, status})
    })
    .then((res) => {
      if(res.status === 200) {
        alert(`${status} 완료`)
      } else {
        alert('Try again')
      }
      history.push('trustlist/admin')
    })
    .catch((err) => {
      console.error(err)
      alert("Error!")
    })
  }

  useEffect(() => {
    if (authToken !== "") {
      fetch(`${process.env.REACT_APP_SERVER}/api/user/infomation`, {
        mode: "cors",
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        }
      })
      .then((res) => {
        if (res.status === 200) {
          return res.json()
        }
      })
      .then((res) => {
        setPermission(res.user.permission)
      })
      .catch((e) => {
        console.error(e)
      })
    }
  }, [])

  return (
    <Container style={{ marginTop: "150px" }}>
      <div className="maintenanceimage">
        <div className="pageheader" style={{ marginTop: "50px" }}> 신탁 계약 내역 목록 </div>
      </div>
      <Table bordered={true} style={{ marginBottom: "100px", textAlign: "center" }}>
        <thead>
          <tr>
            <th>NO.</th>
            <th>종류</th>
            <th>보증금</th>
            <th>전월세</th>
            <th>신탁 시작일</th>
            <th>신탁 종류일</th>
            <th>신탁 상태</th>
            <th style={{ width: "120px" }}>상세 보기</th>
            { permission === "legalTL" || permission === "maintenanceTL" ? ( <th style={{ width: "175px" }}>승인확인</th>) : null}
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
                  <Button variant="" className="scopeimage"
                    onClick={(e) => {
                      e.preventDefault();
                      history.push(`/trust?token=${trust.token}`);
                    }} />
                </td>
                { permission === "legalTL" || permission === "maintenanceTL" ? (
                  <td> 
                    <Button variant="success" style={{ marginRight:"16px" }} onClick={() => { onAcknowledge(trust.token) }}> 승인 </Button>
                    <Button variant="danger" onClick={() => { onReject(trust.token) }}> 반려 </Button>
                  </td>) : null }
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default TrustListPageAdmin
