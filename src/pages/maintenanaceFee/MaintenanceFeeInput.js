import React, { useState } from "react"
import { Container, Button, Form } from "react-bootstrap"
import { useHistory } from "react-router-dom"

import Uppy from '@uppy/core'
import { Dashboard  } from '@uppy/react'

import PostFixInput from "../../component/PostFixInput"
import AuthToken from "../../storages/Auth"

import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'

//Trust Subscription
const MaintenanceFeeInput = () => {
  const history = useHistory()
  const autuToken = AuthToken.get()

  const [maintenanceFeeInput, setMaintenanceFeeInput] = useState({
    email: "",
    claimingAgency: "",
    electronicPaymentNum: "",
    dueDate: "",
    amountDue: "",
    amountDeadline: "",
    payment: "",
    payer: ""
  })

  const uppy = new Uppy({
    debug: true,
    autoProceed: false,
    restrictions: {
      maxFileSize: 100000000,
      maxNumberOfFiles: 1,
      allowedFileTypes: [".jpg", ".png", ".pdf"]
    }
  })

  const handleInputChange = (e) => {
    e.preventDefault()

    const { value, name } = e.target

    setMaintenanceFeeInput({
      ...maintenanceFeeInput,
      [name]: value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData()

    for (const [key, value] of Object.entries(maintenanceFeeInput)) {
      if (key === "giro") {
        continue
      }
      formData.append(key, value)
    }

    for(let file of Object.values(uppy.state.files)){
      formData.append("giro", file.data)
    }

    fetch(`${process.env.REACT_APP_SERVER}/api/maintenanceFee/input`, {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${autuToken}`
      },
      body: formData
    })
    .then((res) => {
      if (res.status === 200) {
        history.push("/maintenancefeelist/admin")
      } else {
        const error = new Error(res.error)
        throw error;
      }
    })
    .catch((err) => {
      console.error(err)
      alert("Error!")
    })
  }

  return (
    <Container style={{ maxWidth: "800px" }}>
      <div className="pageheader"> 관리비 입력 </div>
      <Form className="sign-form" onSubmit={onSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label> 이메일 </Form.Label>
          <Form.Control type="email" placeholder="이메일" name="email" value={maintenanceFeeInput.email} onChange={handleInputChange} />
        </Form.Group>

        <Form.Group controlId="formBasicClaimingAgency">
          <Form.Label> 청구기관 </Form.Label>
          <Form.Control type="claimingAgency" placeholder="창구기관" name="claimingAgency" value={maintenanceFeeInput.claimingAgency} onChange={handleInputChange} />
        </Form.Group>

        <Form.Group controlId="formBasicElectronicPaymentNum">
          <Form.Label> 전자 납부 번호 </Form.Label>
          <Form.Control type="text" placeholder="전자 납부 번호" name="electronicPaymentNum" value={maintenanceFeeInput.electronicPaymentNum} onChange={handleInputChange} />
        </Form.Group>

        <Form.Group controlId="formBasicDueDate">
          <Form.Label> 관리비 납기 내 기한 </Form.Label>
          <Form.Control type="date" name="dueDate" value={maintenanceFeeInput.dueDate} onChange={handleInputChange} />
        </Form.Group>

        <Form.Group controlId="formBasicAmountDue">
          <Form.Label> 납기 내 금액 </Form.Label>
          <PostFixInput labelText="" postfix="원" type="text" placeholder="금액" name="amountDue" value={maintenanceFeeInput.amountDue} onChange={handleInputChange} />
        </Form.Group>

        <Form.Group controlId="formBasicAmountDeadline">
          <Form.Label> 납기 후 금액 </Form.Label>
          <PostFixInput labelText="" postfix="원" type="text" placeholder="금액" name="amountDeadline" value={maintenanceFeeInput.amountDeadline} onChange={handleInputChange} />
        </Form.Group>

        <Form.Group controlId="formBasicGiro">
          <Form.Label> 첨부파일 </Form.Label>
          <div><Dashboard uppy={uppy} hideUploadButton={true} /></div>
        </Form.Group>

        <Button variant="primary" type="submit" className="button3"> 입력하기 </Button>
      </Form>
    </Container>
  )
}

export default MaintenanceFeeInput
