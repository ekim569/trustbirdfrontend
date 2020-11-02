import React, { useState } from "react";
import { Container, Button, Form, Row, Col, table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./Page.css";

//Trust Output
const Trust = () => {
  const history = useHistory();
  const [trust, setTrust] = useState({
    token: "",
    preToken: "",
    name: "",
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
    attachments: "",
    Ttatus: "",
    contract: "",
    email: "page1111@naver.com",
  });

  function handleInputChange(e) {
    e.preventDefault();

    const { value, name } = e.target;

    console.log(value, name);

    setTrust({
      ...trust,
      [name]: value,
    });
  }

  function onSubmit(e) {
    e.preventDefault();

    console.log(trust);

    fetch("http://192.168.0.22:3001/api/trust/subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trust),
    })
      .then((res) => {
        if (res.status === 200) {
          history.push("/trust");
        } else {
          const error = new Error(res.error);

          throw error;
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error loggin in please try again");
      });
  }

  return (
    <Container style={{ maxWidth: "720px", padding: 0 }}>
      <div className="pageheader">신탁신청서</div>
      <Form onSubmit={onSubmit}>
        <table className="tablelayout">
          <tr className="tableborder">
            <td className="tableborder" style={{ width: "250px" }}>
              중개인 이름
            </td>
            <td className="tableborder" colspan="4">
              {" "}
              {trust.realtorName}{" "}
            </td>
          </tr>
          <tr className="tableborder">
            <td className="tableborder" style={{ width: "250px" }}>
              중개인 이름
            </td>
            <td className="tableborder" colspan="4">
              {" "}
              {trust.realtorName}{" "}
            </td>
          </tr>
          <tr className="tableborder">
            <td className="tableborder" style={{ width: "250px" }}>
              중개인 전화번호
            </td>
            <td className="tableborder" colspan="4">
              {" "}
              {trust.realtorTelephoneNum}
            </td>
          </tr>
          <tr className="tableborder">
            <td className="tableborder" style={{ width: "250px" }}>
              중개인 휴대전화번호
            </td>
            <td className="tableborder" colspan="4">
              {" "}
              {trust.realtorCellPhoneNum}
            </td>
          </tr>
          <tr className="tableborder">
            <td className="tableborder" style={{ width: "250px" }}>
              신탁기간
            </td>
            <td className="tableborder" colspan="4">
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
            <td>{trust.attachments} </td>
          </tr>
        </table>
        <div style={{ float: "right" }}>
          <Button variant="primary" type="submit" className="button1">
            회원가입
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Trust;
