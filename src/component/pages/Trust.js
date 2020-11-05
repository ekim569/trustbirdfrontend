import React, { useEffect, useState } from "react";
import { Container, Button, Form, Row, Col, table } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import "./Page.css";
import AuthToken from "../../storages/Auth";


//Trust Output
const Trust = ({location}) => {
  const history = useHistory();
  const token = AuthToken.get();
  const [trust, setTrust] = useState({
    token: "",
    preToken: "",
    username: "",
    telephoneNum: "",
    realtorName: "",
    realtorTelephoneNum: "",
    realtorCellPhoneNum: "",
    type: "",
    securityDeposit: "",
    rent: "",
    purpose: "",
    periodStart: "",
    periodEnd: "",
    etc: "",
    attachments: new Array(),
    Ttatus: "",
    contract: "",
  });

  useEffect(()=>{
    const params = new URLSearchParams(location.search);  

    fetch(`http://192.168.0.143:3001/api/trust/find?token=${params.get('token')}`, {
      mode: "cors",
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res)=> {
      if(res.status === 200) {
        return res.json()
      }
    })
    .then((res) => {
      setTrust(res)
    })
  },[])  

  return (
    <Container style={{ maxWidth: "720px", padding: 0 }}>
      <div className="pageheader">신탁신청서</div>
      <Form>
        <table className="tablelayout">
          <tr className="tableborder">
            <td className="tableborder" style={{ width: "200px" }}>
              신탁자
            </td>
            <td className="tableborder" colspan="2">
              {" "}
              {trust.username}{" "}
            </td>
            <td className="tableborder" colspan="4">
              {" "}
              {trust.telephoneNum}{" "}
            </td>
          </tr>
          <tr className="tableborder">
            <td className="tableborder">
              중개인 이름
            </td>
            <td  colspan="6">
              {" "}
              {trust.realtorName}{" "}
            </td>
          </tr>
          <tr className="tableborder">
            <td className="tableborder" >
              중개인 전화번호
            </td>
            <td className="tableborder" colspan="3">
              {" "}
              {trust.realtorTelephoneNum}
            </td>
            <td className="tableborder" colspan="3">
              {" "}
              {trust.realtorCellPhoneNum}
            </td>
          </tr>
          <tr className="tableborder">
            <td className="tableborder" >
              신탁기간
            </td>
            <td className="tableborder" colspan="6">
              {trust.periodStart} ~ {trust.periodEnd}{" "}
            </td>
          </tr>
        </table>

        <Form.Label>기타사항</Form.Label>
        <table className="tablelayout">
          <tr className="tableborder">
            {" "}
            <td> {trust.etc} </td>{" "}
          </tr>
        </table>

        <Form.Label>첨부파일</Form.Label>
        <table className="tablelayout">
          <tr className="tableborder">
            {trust.attachments.map((attachment) => {
             return <td><a href= {`http://192.168.0.143:8080/ipfs/${attachment.filePath}`} target="_blank"> {attachment.fileName} </a> </td>
            })}
          </tr>
        </table>

        <div style={{ float: "right", marginTop: "60px" }}>
          <Button variant="primary" type="submit" className="button2" onClick="/Home">
            취소하기
          </Button>
          <Button
            variant="primary"
            type="submit"
            className="button2"
            style={{ marginLeft: "16px" }}
            onClick={(e)=>{
              e.preventDefault();
              history.push(`/trustsub?token=${trust.token}`)
          }}
          >
            수정하기
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Trust;
