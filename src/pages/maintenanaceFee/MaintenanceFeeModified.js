import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import AuthToken from "../../storages/Auth";
import PostFixInput from "../../component/PostFixInput";

import Uppy from '@uppy/core'
import { Dashboard  } from '@uppy/react'
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
//Maintenance Fee
const MaintenanceFeeModified = ({ location }) => {
  const token = AuthToken.get();
  const history = useHistory();
  const [maintenanceFeeInput, setMaintenanceFeeInput] = useState({
    email: "",
    claimingAgency: "",
    electronicPaymentNum: "",
    dueDate: "",
    amountDue: "",
    amountDeadline: "",
    amountDue: "",
    payment: "",
    payer: "",
    giro: {},
  });
  const uppy = new Uppy({
    debug: true,
    autoProceed: false,
    restrictions: {
      maxFileSize: 100000000,
      maxNumberOfFiles: 1,
      allowedFileTypes: [".jpg", ".png", ".pdf"],
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    fetch(
      `http://192.168.0.143:3001/api/maintenanceFee/find?electronicPaymentNum=${params.get(
        "electronicPaymentNum"
      )}`,
      {
        mode: "cors",
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((res) => {
        if (res !== undefined) {
          setMaintenanceFeeInput({
            email: res.email,
            claimingAgency: res.claimingAgency,
            electronicPaymentNum: res.electronicPaymentNum,
            dueDate: res.dueDate,
            amountDeadline: res.amountDeadline,
            amountDue: res.amountDue,
            payment: res.payment,
            payer: res.payer,
            giro: {},
          });
        }
      });
  }, []);

  function handleInputChange(e) {
    e.preventDefault();

    const { value, name } = e.target;

    console.log(value, name);

    setMaintenanceFeeInput({
      ...maintenanceFeeInput,
      [name]: value,
    });
  }

  function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    for (const [key, value] of Object.entries(maintenanceFeeInput)) {
      if (key === "giro") {
        continue;
      }
      formData.append(key, value);
    }
    formData.append("giro", maintenanceFeeInput.giro);

    fetch("http://192.168.0.143:3001/api/maintenanceFee/update", {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => {
        if (res.status === 200) {
          history.push("/maintenancefeelist/admin");
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error loggin in please try again");
        history.push("/maintenancefeelist/admin");
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
            value={maintenanceFeeInput.email}
            onChange={handleInputChange}
            readOnly
          />
        </Form.Group>

        <Form.Group controlId="formBasicClaimingAgency">
          <Form.Label> 청구기관 </Form.Label>
          <Form.Control
            type="claimingAgency"
            placeholder="창구기관"
            name="claimingAgency"
            value={maintenanceFeeInput.claimingAgency}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicElectronicPaymentNum">
          <Form.Label> 전자 납부 번호 </Form.Label>
          <Form.Control
            type="text"
            placeholder="전자 납부 번호"
            name="electronicPaymentNum"
            value={maintenanceFeeInput.electronicPaymentNum}
            onChange={handleInputChange}
            readOnly
          />
        </Form.Group>

        <Form.Group controlId="formBasicDueDate">
          <Form.Label> 관리비 납기 내 기한 </Form.Label>
          <Form.Control
            type="date"
            name="dueDate"
            value={maintenanceFeeInput.dueDate}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicAmountDue">
          <Form.Label> 납기 내 금액 </Form.Label>
          <PostFixInput
            labelText=""
            postfix="원"
            type="text"
            placeholder="금액"
            name="amountDue"
            value={maintenanceFeeInput.amountDue}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicAmountDeadline">
          <Form.Label> 납기 후 금액 </Form.Label>
          <PostFixInput
            labelText=""
            postfix="원"
            type="text"
            placeholder="금액"
            name="amountDeadline"
            value={maintenanceFeeInput.amountDeadline}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPayer">
          <Form.Label> 납부자 </Form.Label>
          <Form.Control
            type="text"
            placeholder="납부자"
            name="payer"
            value={maintenanceFeeInput.payer}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPayment">
          <Form.Label> 납부 금액 </Form.Label>
          <PostFixInput
            labelText=""
            postfix="원"
            type="text"
            placeholder="납부 금액"
            name="payment"
            value={maintenanceFeeInput.payment}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicGiro">
          <Form.Label> 첨부파일 </Form.Label>
          <div>
            <Dashboard
              uppy={uppy}
              // plugins={['Webcam']}
              // {...props}
              hideUploadButton={true}
            />
          </div>
        </Form.Group>
        <Button variant="primary" type="submit" className="button3">
          수정하기
        </Button>
      </Form>
    </Container>
  );
};

export default MaintenanceFeeModified;
