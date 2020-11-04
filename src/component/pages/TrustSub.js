import React, { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import PostFixInput from "./PostFixInput";
import AuthToken from "../../storages/Auth";
import "./Page.css";

//Trust Subscription
const TrustSub = () => {
  const token = AuthToken.get();

  const history = useHistory();
  const [trustsub, setTrustsub] = useState({
    token: "",
    preToken: "",
    username: "",
    telephoneNum: "",
    realtorName: "",
    realtorTelephoneNum: "",
    realtorCellphoneNum: "",
    realtorAddress: "",
    type: "",
    securityDeposit: "",
    rent: "",
    purpose: "",
    periodStart: "",
    periodEnd: "",
    etc: "",
    status: "신탁 요청",
    contract: "",
    attachments: {},
    etc: "",
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
      if (key === "attachments") {
        continue;
      }
      formData.append(key, value);
    }
    formData.append("attachments", trustsub.attachments);
    // formData.append("files", {
    //   uri: pickerResponse.uri,
    //   type: pickerResponse.type,
    //   name: pickerResponse.fileName,
    // });
    // formData.append('attachement', trustsub.attachments)

    console.log(formData);
    console.log(trustsub);

    fetch("http://192.168.0.143:3001/api/trust/subscription", {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
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
            name="username"
            value={trustsub.username}
            onChange={handleInputChange}
          />
          </Form.Group>

          <Form.Group controlId="formBasicNegligenceProfit">
            <Form.Label> 신탁자 전화번호 </Form.Label>
            <PostFixInput
              labelText="신탁자번호"
              postfix=""
              type="text"
              placeholder="전화번호"
              name="telephoneNum"
              value={trustsub.telephoneNum}
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
          <Form.Label> 중개사 전화번호 </Form.Label>
          <PostFixInput
            labelText="중개인번호"
            postfix=""
            type="text"
            placeholder="전화번호"
            name="realtorTelephonephoneNum"
            value={trustsub.realtorTelephonephoneNum}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicRealtor">
            <Form.Label> 중개인 휴대전화번호 </Form.Label>
            <PostFixInput
              labelText="중개인번호"
              postfix=""
              type="text"
              placeholder="전화번호"
              name="realtorCellphoneNum"
              value={trustsub.realtorCellphoneNum}
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

        <div>
          <Form.Label>전 · 월세</Form.Label>
          <br />
          <Form
            controlId="formBasicType"
            style={{ display: "inline-block", marginRight: "32px" }}
          >
            <Form.Check
              type="checkbox"
              name="purpose"
              // value={trustsub.purpose}
              onChange={(e) => {
                console.log(e.target.value);
                e.preventDefault();
                setTrustsub({ ...trustsub, purpose: e.target.value });
              }}
              value="전세"
              label="전세"
              required
            />
          </Form>
          <Form
            controlId="formBasicTypeCheck"
            style={{ display: "inline-block" }}
          >
            <Form.Check
              type="checkbox"
              name="purpose"
              // value={trustsub.purpose}
              onChange={(e) => {
                console.log(e.target.value);
                e.preventDefault();
                setTrustsub({ ...trustsub, purpose: e.target.value });
              }}
              value="월세"
              label="월세"
              required
            />
          </Form>
        </div>

        <Form.Group controlId="formBasiSecurityDeposit">
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

        <Form.Group controlId="formBasicRent">
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

        <Form.Group controlId="formBasicPeriodStart">
          <Form.Label> 신탁 시작일 </Form.Label>
          <Form.Control
            type="date"
            name="periodStart"
            value={trustsub.periodStart}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPeriodEnd">
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
          <Form.File
            // onChange={handleInputChange}
            onChange={(e) => {
              setTrustsub({ ...trustsub, attachments: e.target.files[0] });
            }}
            name="attachments"
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="button3">
          신청하기
        </Button>
      </Form>
    </Container>
  );
};

export default TrustSub;
