import React, { useState } from "react";
import { Container,  Button, Form, table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import PostFixInput from "./PostFixInput";
import "./Page.css"



//Trust Subscription
const TrustSub = () => {
  const history = useHistory();
  const [trustsub, setTrustsub] = useState({
    token:"",
    preToken:"",
    name:"",
    telephoneNum:"",
    realtorName:"",
    realtorTelephoneNum:"",
    realtorCellPhoneNum:"",
    realtorAddress:"",
    type:"",
    securityDeposit:"",
    rent:"",
    purpose:"",
    periodStart:"",
    periodEnd:"",
    etc:"",
    attachments:"",
    Ttatus:"",
    contract:"",
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

    fetch("http://192.168.0.22:3001/api/user/contract", {
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
    <Container style={{maxWidth:"800px"}}>
      <div className="pageheader">신탁 신청</div>
      <Form className="sign-form">
      <Form.Group controlId="formBasicTrustProfit">
          <Form.Label> 신탁자 </Form.Label>
          <PostFixInput
            labelText="신탁자"
            postfix=""
            type="text"
            placeholder="성함"
            value={trustsub.name}
          />
        </Form.Group>
      <Form.Group controlId="formBasicTrustProfit">
          <Form.Label> 중개인 이름 </Form.Label>
          <PostFixInput
            labelText="중개인"
            postfix=""
            type="text"
            placeholder="성함"
            value={trustsub.realtorName}
          />
        </Form.Group>

        <Form.Group controlId="formBasicNegligenceProfit">
          <Form.Label> 중개인 전화번호 </Form.Label>
          <PostFixInput
            labelText="중개인번호"
            postfix=""
            type="text"
            placeholder="전화번호"
            value={trustsub.realtorTelephoneNum}
          />
        </Form.Group>
        
        <Form.Group controlId="formBasicNegligenceProfit">
          <Form.Label> 중개인 주소</Form.Label>
          <PostFixInput
            labelText="중개인번호"
            postfix=""
            type="text"
            placeholder="전화번호"
            value={trustsub.realtorAddress}
          />
        </Form.Group>

      
        <Form.Group controlId="formBasicType">
          <Form.Label> 신탁 부동산 종류 </Form.Label>
          <PostFixInput
            labelText="부동산종류"
            postfix=""
            type="text"
            placeholder="종류"
            value={trustsub.type}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPrice">
          <Form.Label> 신탁 부동산 보증금 </Form.Label>
          <PostFixInput
            labelText="부동산가격"
            postfix="만원"
            type="text"
            placeholder="금액"
            value={trustsub.securityDeposit}
          />
        </Form.Group>
          
        <Form.Group controlId="formBasicPrice">
        <Form.Label> 신탁 부동산 월세 </Form.Label>
          <PostFixInput
            labelText="부동산가격"
            postfix="만원"
            type="text"
            placeholder="금액"
            value={trustsub.rent}
          />
        </Form.Group>

        <div>
             <Form.Label>전 · 월세</Form.Label><br/>
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
          <Form.Control type="date" value={trustsub.periodStart} />
        </Form.Group>

        <Form.Group controlId="formBasicPeriodStart">
          <Form.Label> 신탁 종료일 </Form.Label>
          <Form.Control type="date" value={trustsub.periodEnd} />
        </Form.Group>

        <Form.Group controlId="formBasicEtc">
          <Form.Label> 기타사항 </Form.Label>
          <Form.Control type="textarea" value={trustsub.etc} />
        </Form.Group>

        <Form.Group controlId="formBasicAttachments">
          <Form.Label> 첨부파일 </Form.Label>
          <Form.Control type="image" value={trustsub.attachments} />
        </Form.Group>
        <Button
        variant="primary"
        type="submit"
        className="button3"
      >
        회원가입
      </Button>
      </Form>
    </Container>
  );
};

export default TrustSub;
