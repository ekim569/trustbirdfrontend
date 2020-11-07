import React, { useState, useEffect } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import PostFixInput from "../../component/PostFixInput";
import AuthToken from "../../storages/Auth";

//Trust Subscription
const MaintenanceFeeModified = () => {
  const token = AuthToken.get();

  const history = useHistory();

  const [maintenanceFeeModified, setMaintenanceFeeModified] = useState({
    email: "",
    claimingAgency: "",
    electronicPaymentNum: "",
    dueDate: "",
    amountDue: "",
    amountDeadline: "",
    payment: "",
    payer: "",
    giro: {},
  });

  function handleInputChange(e) {
    e.preventDefault();

    const { value, name } = e.target;

    console.log(value, name);

    setMaintenanceFeeModified({
      ...maintenanceFeeModified,
      [name]: value,
    });
  }

  function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    for (const [key, value] of Object.entries(maintenanceFeeModified)) {
      if (key === "giro") {
        continue;
      }
      formData.append(key, value);
    }
    formData.append("giro", maintenanceFeeModified.giro);

    fetch("http://192.168.0.143:3001/api/maintenanceFee/input", {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => {
        if (res.status === 200) {
          history.push("/MaintenanceFeeList");
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
      <div className="pageheader">관리비 입력</div>
      <Form className="sign-form" onSubmit={onSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label> 이메일 </Form.Label>
          <Form.Control
            type="email"
            placeholder="이메일"
            name="email"
            value={maintenanceFeeModified.email}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicClaimingAgency">
          <Form.Label> 청구기관 </Form.Label>
          <Form.Control
            type="claimingAgency"
            placeholder="창구기관"
            name="claimingAgency"
            value={maintenanceFeeModified.claimingAgency}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicElectronicPaymentNum">
          <Form.Label> 전자 납부 번호 </Form.Label>
          <Form.Control
            type="text"
            placeholder="전자 납부 번호"
            name="electronicPaymentNum"
            value={maintenanceFeeModified.electronicPaymentNum}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicDueDate">
          <Form.Label> 관리비 납기 내 기한 </Form.Label>
          <Form.Control
            type="date"
            name="dueDate"
            value={maintenanceFeeModified.dueDate}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicAmountDue">
          <Form.Label> 납기 내 금액 </Form.Label>
          <PostFixInput
            labelText=""
            postfix="만원"
            type="text"
            placeholder="금액"
            name="amountDue"
            value={maintenanceFeeModified.amountDue}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicAmountDeadline">
          <Form.Label> 납기 후 금액 </Form.Label>
          <PostFixInput
            labelText=""
            postfix="만원"
            type="text"
            placeholder="금액"
            name="amountDeadline"
            value={maintenanceFeeModified.amountDeadline}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicGiro">
          <Form.Label> 첨부파일 </Form.Label>
          <Form.File
            onChange={(e) => {
              setMaintenanceFeeModified({
                ...maintenanceFeeModified,
                giro: e.target.files[0],
              });
            }}
            name="giro"
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="button3">
          입력하기
        </Button>
      </Form>
    </Container>
  );
};

export default MaintenanceFeeModified;
