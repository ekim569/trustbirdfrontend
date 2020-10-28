import React, { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./Page.css";
import PostFixInput from "./PostFixInput";

//Contract Enrollment
const ContractEnroll = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    dateOfBirth: "",
    gender: "",
    telephoneNum: "",
    permission: "user",
  });

  function handleInputChange(e) {
    e.preventDefault();

    const { value, name } = e.target;

    console.log(value, name);

    setUser({
      ...user,
      [name]: value,
    });
  }

  function onSubmit(e) {
    e.preventDefault();

    fetch("http://192.168.0.22:3001/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.status === 200) {
          history.push("/signin");
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
    <Container>
      <div className="pageheader">계약서 등록</div>
      <Form
        style={{ maxWidth: "800px", margin: "auto" }}
        className="sign-form"
        onSubmit={onSubmit}
      >
        <Form.Group controlId="formBasicLocation">
          <Form.Label> 계약 소재지 </Form.Label>
          <PostFixInput
            labelText="계약 소재지"
            postfix=""
            type="text"
            placeholder="주소"
          />
        </Form.Group>

        <Form.Group controlId="formBasicLandCategory">
          <Form.Label> 지목 </Form.Label>
          <PostFixInput
            labelText="지목"
            postfix=""
            type="text"
            placeholder="지번"
          />
        </Form.Group>

        <Form.Group controlId="formBasicLandArea">
          <Form.Label> 토지의 면적 </Form.Label>
          <PostFixInput
            labelText="토지의 면적"
            postfix="㎡"
            type="text"
            placeholder="면적"
          />
        </Form.Group>

        <Form.Group controlId="formBasicBuildingPurpose">
          <Form.Label> 건물의 용도 </Form.Label>
          <PostFixInput
            labelText="건물의 용도"
            postfix=""
            type="text"
            placeholder="종류"
          />
        </Form.Group>

        <Form.Group controlId="formBasicBuildingArea">
          <Form.Label> 건물의 면적 </Form.Label>
          <PostFixInput
            labelText="부동산종류"
            postfix="㎡"
            type="text"
            placeholder="면적"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPartOfLease">
          <Form.Label> 임대할 부분 </Form.Label>
          <Form.Control type="text" placeholder="임대할 부분" />
        </Form.Group>

        <Form.Group controlId="formBasicPartOfLeaseArea">
          <Form.Label> 임대할 부분의 면적 </Form.Label>
          <PostFixInput
            labelText="부동산 종류"
            postfix="㎡"
            type="text"
            placeholder="면적"
          />
        </Form.Group>
        <div>
          <Form.Group>
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
          </Form.Group>
        </div>

        <Form.Group controlId="formBasicPeriod">
          <Form.Label> 임대 기간 </Form.Label>
          <Form.Control type="text" required />
        </Form.Group>

        <Form.Group controlId="formBasicSecurityDeposit">
          <Form.Label> 보증금 </Form.Label>
          <PostFixInput
            labelText="보증금"
            postfix="만 원"
            type="text"
            placeholder="금액"
          />
        </Form.Group>

        <Form.Group controlId="formBasicContractPrice">
          <Form.Label> 계약금 </Form.Label>
          <PostFixInput
            labelText="계약금"
            postfix="만 원"
            type="text"
            placeholder="금액"
          />
        </Form.Group>

        <Form.Group controlId="formBasicInterimPrice">
          <Form.Label> 중도금 </Form.Label>
          <PostFixInput
            labelText="중도금"
            postfix="만 원"
            type="text"
            placeholder="금액"
          />
        </Form.Group>

        <Form.Group controlId="formBasicBalance">
          <Form.Label> 잔금</Form.Label>
          <PostFixInput
            labelText="잔금"
            postfix="만 원"
            type="text"
            placeholder="금액"
          />
        </Form.Group>

        <Form.Group controlId="formBasicRent">
          <Form.Label> 차임 </Form.Label>
          <Form.Control type="text" />
        </Form.Group>

        <Form.Group controlId="formBasicSpecialAgreement">
          <Form.Label> 특약사항 </Form.Label>
          <Form.Control type="text" />
        </Form.Group>

        <Form.Group controlId="formBasicLessorAddress">
          <Form.Label> 임대인의 주소 </Form.Label>
          <Form.Control type="text" required />
        </Form.Group>

        <Form.Group controlId="formBasicLessorRRN">
          <Form.Label> 임대인 주민번호 </Form.Label>
          <Form.Control type="text" required />
        </Form.Group>

        <Form.Group controlId="formBasicLessorName">
          <Form.Label> 임대인 이름 </Form.Label>
          <Form.Control type="text" required />
        </Form.Group>

        <Form.Group controlId="formBasicLessorTelephoneNum">
          <Form.Label> 임대인 휴대번호 </Form.Label>
          <Form.Control type="text" required />
        </Form.Group>

        <Form.Group controlId="formBasicLesseeAddress">
          <Form.Label> 임차인 주소 </Form.Label>
          <Form.Control type="text" required />
        </Form.Group>

        <Form.Group controlId="formBasicLesseeRRN">
          <Form.Label> 임차인 주민번호 </Form.Label>
          <Form.Control type="text" required />
        </Form.Group>

        <Form.Group controlId="formBasicLesseeName">
          <Form.Label> 임차인 이름 </Form.Label>
          <Form.Control type="text" required />
        </Form.Group>

        <Form.Group controlId="formBasicLesseeTelephoneNum">
          <Form.Label> 임차인 휴대번호 </Form.Label>
          <Form.Control type="text" required />
        </Form.Group>

        <Form.Group style={{ display: "table-caption" }}>
          <Form.Label controlId="formBasicRealtorAddress">
            <input type="text" required />
          </Form.Label>
          <Form.Label controlId="formBasicRealtorOfficeName">
            <input type="text" required />
          </Form.Label>
          <Form.Label controlId="formBasicRealtorName">
            <input type="text" required />
          </Form.Label>
          <Form.Label controlId="formBasicRegistrationNum">
            <input type="text" required />
          </Form.Label>
          <Form.Label controlId="formBasicRealtorTelephoneNum">
            <input type="text" required />
          </Form.Label>
        </Form.Group>

        <Button variant="primary" type="submit" className="button3">
          저장하기
        </Button>
      </Form>
    </Container>
  );
};

export default ContractEnroll;
