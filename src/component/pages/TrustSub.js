import React, { useState } from "react";
import { Container, Button, Form, table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import PostFixInput from "./PostFixInput";
import "./Page.css";

//Trust Subscription
const TrustSub = () => {
  const history = useHistory();
  const [trustsub, setTrustsub] = useState({
    name: "",
    realtorName: "",
    realtorTelephoneNum: "",
    realtorAddress: "",
    type: "",
    securityDeposit: "",
    rent: "",
    periodStart: "",
    periodEnd: "",
    etc: "",
    attachments: "",
  });

  function handleInputChange(e) {
    e.preventDefault();

    const { value, name } = e.target;

    console.log(value, name);

    setTrustsub({
      ...trustsub,
      [name]: value,
    });
  }

  function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    for (const [key, value] of Object.entries(trustsub)) {
      formData.append(key, value);
      if (key === "attchments") {
        formData.append(key, __filename);
      }
    }
    console.log(trustsub);

    fetch("http://192.168.0.22:3001/api/trust/subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trustsub),
    })
      .then((res) => {
        if (res.status === 200) {
          history.push("/trustsub");
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
    <Container style={{ maxWidth: "800px" }}>
      <div className="pageheader">신탁 신청</div>
      <Form className="sign-form" onSubmit={onSubmit}>
        <Form.Group controlId="formBasicTrustProfit">
          <Form.Label> 신탁자 </Form.Label>
          <PostFixInput
            labelText="신탁자"
            postfix=""
            type="text"
            placeholder="성함"
            name="name"
            value={trustsub.name}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicTrustProfit">
          <Form.Label> 중개인 이름 </Form.Label>
          <PostFixInput
            labelText="중개인"
            postfix=""
            type="text"
            placeholder="성함"
            name="realtorName"
            value={trustsub.realtorName}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicNegligenceProfit">
          <Form.Label> 중개인 전화번호 </Form.Label>
          <PostFixInput
            labelText="중개인번호"
            postfix=""
            type="text"
            placeholder="전화번호"
            name="realtorTelephoneNum"
            value={trustsub.realtorTelephoneNum}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicNegligenceProfit">
          <Form.Label> 중개인 주소</Form.Label>
          <PostFixInput
            labelText="중개인번호"
            postfix=""
            type="text"
            placeholder="전화번호"
            name="realtorAddress"
            value={trustsub.realtorAddress}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicType">
          <Form.Label> 신탁 부동산 종류 </Form.Label>
          <PostFixInput
            labelText="부동산종류"
            postfix=""
            type="text"
            placeholder="종류"
            name="type"
            value={trustsub.type}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPrice">
          <Form.Label> 신탁 부동산 보증금 </Form.Label>
          <PostFixInput
            labelText="부동산가격"
            postfix="만원"
            type="text"
            placeholder="금액"
            name="securityDeposit"
            value={trustsub.securityDeposit}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPrice">
          <Form.Label> 신탁 부동산 월세 </Form.Label>
          <PostFixInput
            labelText="부동산가격"
            postfix="만원"
            type="text"
            placeholder="금액"
            name="rent"
            value={trustsub.rent}
            onChange={handleInputChange}
          />
        </Form.Group>

        <div>
          <Form.Label>전 · 월세</Form.Label>
          <br />
          <Form
            controlId="formBasicMonthly"
            style={{ display: "inline-block", marginRight: "32px" }}
          >
            <Form.Check type="checkbox" label="전세" required />
          </Form>
          <Form
            controlId="formBasicResevations"
            style={{ display: "inline-block" }}
          >
            <Form.Check type="checkbox" label="월세" required />
          </Form>
        </div>

        <Form.Group controlId="formBasicPeriodStart">
          <Form.Label> 신탁 시작일 </Form.Label>
          <Form.Control
            type="date"
            name="periodStart"
            value={trustsub.periodStart}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPeriodStart">
          <Form.Label> 신탁 종료일 </Form.Label>
          <Form.Control
            type="date"
            name="periodEnd"
            value={trustsub.periodEnd}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEtc">
          <Form.Label> 기타사항 </Form.Label>
          <Form.Control
            type="textarea"
            name="etc"
            value={trustsub.etc}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicAttachments">
          <Form.Label> 첨부파일 </Form.Label>
          <Form.File onChange={handleInputChange} />
        </Form.Group>
        <Button variant="primary" type="submit" className="button3">
          신청하기
        </Button>
      </Form>
    </Container>
  );
};

export default TrustSub;
