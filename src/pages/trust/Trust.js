import React, { useEffect, useState } from "react"
import { Container, Button, Form } from "react-bootstrap"
import { useHistory } from "react-router-dom"

import AuthToken from "../../storages/Auth"

//Trust Output
const Trust = ({ location }) => {
  const history = useHistory()
  const authToken = AuthToken.get()

  const [trust, setTrust] = useState({
    token: "",
    preToken: "",
    username: "",
    telephoneNum: "",
    realtorName: "",
    realtorTelephoneNum: "",
    realtorCellphoneNum: "",
    type: "",
    securityDeposit: "",
    rent: "",
    purpose: "",
    periodStart: "",
    periodEnd: "",
    etc: "",
    attachments: new Array(),
    status: "",
    contract: ""
  })
  const [permission, setPermission] = useState()

  useEffect(() => {
    const params = new URLSearchParams(location.search)

    fetch(`${process.env.REACT_APP_SERVER}/api/trust/find?token=${params.get("token")}`, {
        mode: "cors",
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        }
    })
    .then((res) => {
      if (res.status === 200) {
        return res.json()
      }
    })
    .then((res) => {
      if (res !== undefined) {
        setTrust(res)
      }
    })

    fetch(`${process.env.REACT_APP_SERVER}/api/user/infomation`, {
      mode: "cors",
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
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
  }, [])


  const onDelete = (e) => {
    e.preventDefault()

    fetch(`${process.env.REACT_APP_SERVER}/api/trust/delete`, {
      mode: "cors",
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ token: trust.token })
    })
    .then((res) => {
      if (res.status === 200) {
        alert("User Delete Complete")
      } else {
        alert("User Delete Fail")
      }
      history.push("/trustlist")
    })
  }

  return (
    <Container style={{ maxWidth: "720px", padding: 0 }}>
      <div className="pageheader">신탁신청서</div>
      <Form>
        <table className="tablelayout">
          <tr className="tableborder">
            <td className="tableborder" style={{ width: "200px" }}> 신탁자 </td>
            <td className="tableborder" colspan="2"> {trust.username} </td>
            <td className="tableborder" colspan="4"> {trust.telephoneNum} </td>
          </tr>
          <tr className="tableborder">
            <td className="tableborder"> 중개인 이름 </td>
            <td colspan="6"> {trust.realtorName} </td>
          </tr>
          <tr className="tableborder">
            <td className="tableborder"> 중개인 전화번호 </td>
            <td className="tableborder" colspan="3"> {trust.realtorTelephoneNum} </td>
            <td className="tableborder" colspan="3"> {trust.realtorCellphoneNum} </td>
          </tr>
          <tr>
            <td className="tableborder"> 전 · 월세 </td>
            <td className="tableborder" colspan="6"> {trust.type} </td>
          </tr>
          <tr className="tableborder">
            <td className="tableborder"> 신탁기간 </td>
            <td className="tableborder" colspan="6"> {trust.periodStart} ~ {trust.periodEnd} </td>
          </tr>
        </table>

        <Form.Label>기타사항</Form.Label>
        <table className="tablelayout">
          <tr className="tableborder">
            <td> {trust.etc} </td>
          </tr>
        </table>

        <Form.Label>첨부파일</Form.Label>
        <table className="tablelayout">
          <tr className="tableborder">
            <td>
              {trust.attachments.map((attachment) => {
                return (
                  <a href={`${process.env.REACT_APP_IPFS}/ipfs/${attachment.filePath}`} target="_blank"> {attachment.fileName} <br /> </a>
                )
              })}
            </td>
          </tr>
        </table>

        <div style={{ float: "right", marginTop: "60px" }}>
          <Button variant="primary" type="submit" className="button2" onClick={() => { history.push("/trustlist") }}>
            취소하기
          </Button>

          <Button variant="primary" type="submit" className="button2" style={{ marginLeft: "16px" }} onClick={() => onDelete()} >
            삭제하기
          </Button>

          {trust.status.match(/수정/) || trust.status.match(/요청/) ? (
            <Button variant="primary" type="submit" className="button2" style={{ marginLeft: "16px" }}
              onClick={(e) => {
                e.preventDefault()
                history.push(`/trustmodified?token=${trust.token}`)
              }}>
              수정하기
            </Button>
          ) : null}

          {trust.status.match(/사용자 계약 승인/) &&
          (permission === "accounting" || permission === "supervisor") ? (
            <Button variant="primary" type="submit" className="button2" style={{ marginLeft: "16px" }}
              onClick={(e) => {
                e.preventDefault()
                history.push(`/contractenroll?token=${trust.token}`)
              }}>
              계약서 작성
            </Button>
          ) : null}
        </div>
      </Form>
    </Container>
  )
}

export default Trust