import React, { useState, useEffect } from "react"
import { Container, Button, Form } from "react-bootstrap"
import { useHistory } from "react-router-dom"

import Uppy from "@uppy/core"
import { Dashboard } from "@uppy/react"

import PostFixInput from "../../component/PostFixInput"
import AuthToken from "../../storages/Auth"

import "@uppy/core/dist/style.css"
import "@uppy/dashboard/dist/style.css"

//Trust Subscription
const TrustModified = ({ location }) => {
  const history = useHistory()
  const authToken = AuthToken.get()

  const [trustModified, setTrustModified] = useState({
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
    status: "",
    contract: ""
  })

  const uppy = new Uppy({
    debug: true,
    autoProceed: false,
    restrictions: {
      maxFileSize: 100000000,
      maxNumberOfFiles: 3,
      allowedFileTypes: [".jpg", ".png", ".pdf"],
    }
  })

  const handleInputChange = (e) => {
    e.preventDefault()

    const { value, name } = e.target

    setTrustModified({
      ...trustModified,
      [name]: value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData()

    for (const [key, value] of Object.entries(trustModified)) {
      formData.append(key, value)
    }

    for (let file of Object.values(uppy.state.files)) {
      formData.append("attachments", file.data)
    }

    fetch(`${process.env.REACT_APP_SERVER}/api/trust/update`, {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData
    })
    .then((res) => {
      if (res.status === 200) {
        history.push("/trustlist")
      } else {
        const error = new Error(res.error)
        throw error
      }
    })
    .catch((err) => {
      console.error(err)
      alert("Error!")
    })
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (params.get("token")) {
      fetch(`${process.env.REACT_APP_SERVER}/api/trust/find?token=${params.get("token")}`, {
        mode: "cors",
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        }}
      )
      .then((res) => {
        if (res.status === 200) {
          return res.json()
        }
      })
      .then((res) => {
        setTrustModified({
          token: "",
          preToken: res.token,
          username: res.username,
          telephoneNum: res.telephoneNum,
          realtorName: res.realtorName,
          realtorTelephoneNum: res.realtorTelephoneNum,
          realtorCellphoneNum: res.realtorCellphoneNum,
          type: res.type,
          securityDeposit: res.securityDeposit,
          rent: res.rent,
          purpose: res.purpose,
          periodStart: res.periodStart,
          periodEnd: res.periodEnd,
          etc: res.etc,
          status: res.status,
          contract: res.contract,
        })
      })
    }
  }, [])

  return (
    <Container style={{ maxWidth: "800px" }}>
      <div className="pageheader">신탁 신청</div>
      <Form className="sign-form" onSubmit={onSubmit}>
        <Form.Group controlId="formBasicTrustProfit">
          <Form.Label> 신탁자 </Form.Label>
          <PostFixInput labelText="신탁자" postfix="" type="text" placeholder="성함" name="username" value={trustModified.username} onChange={handleInputChange} required />
        </Form.Group>

        <Form.Group controlId="formBasicNegligenceProfit">
          <Form.Label> 신탁자 전화번호 </Form.Label>
          <PostFixInput labelText="신탁자번호" postfix="" type="text" placeholder="전화번호" name="telephoneNum" value={trustModified.telephoneNum} onChange={handleInputChange} required />
        </Form.Group>

        <Form.Group controlId="formBasicTrustProfit">
          <Form.Label> 중개인 이름 </Form.Label>
          <PostFixInput labelText="중개인" postfix="" type="text" placeholder="성함" name="realtorName" value={trustModified.realtorName} onChange={handleInputChange} required />
        </Form.Group>

        <Form.Group controlId="formBasicNegligenceProfit">
          <Form.Label> 중개사 전화번호 </Form.Label>
          <PostFixInput labelText="중개인번호" postfix="" type="text" placeholder="전화번호" name="realtorTelephoneNum" value={trustModified.realtorTelephoneNum} onChange={handleInputChange} required />
        </Form.Group>

        <Form.Group controlId="formBasicRealtor">
          <Form.Label> 중개인 휴대전화번호 </Form.Label>
          <PostFixInput labelText="중개인번호" postfix="" type="text" placeholder="전화번호" name="realtorCellphoneNum" value={trustModified.realtorCellphoneNum} onChange={handleInputChange} required />
        </Form.Group>

        <div>
          <Form.Label>전 · 월세</Form.Label><br />
          <Form controlId="formBasicType" style={{ display: "inline-block", marginRight: "32px" }}>
            <Form.Check type="checkbox" name="purpose" value="전세" label="전세" required
              onChange={(e) => {
                e.preventDefault()
                setTrustModified({ ...trustModified, purpose: e.target.value })
              }} />
          </Form>

          <Form controlId="formBasicTypeCheck" style={{ display: "inline-block" }}>
            <Form.Check type="checkbox" name="purpose" value="월세" label="월세" required
              onChange={(e) => {
                e.preventDefault()
                setTrustModified({ ...trustModified, purpose: e.target.value })
              }} />
          </Form>
        </div>

        <Form.Group controlId="formBasiSecurityDeposit">
          <Form.Label> 신탁 부동산 보증금 </Form.Label>
          <PostFixInput labelText="부동산가격" postfix="만원" type="text" placeholder="금액" name="securityDeposit" value={trustModified.securityDeposit} onChange={handleInputChange} required />
        </Form.Group>

        <Form.Group controlId="formBasicRent">
          <Form.Label> 신탁 부동산 월세 </Form.Label>
          <PostFixInput labelText="부동산가격" postfix="만원" type="text" placeholder="금액" name="rent" value={trustModified.rent} onChange={handleInputChange} required />
        </Form.Group>

        <Form.Group controlId="formBasicPeriodStart">
          <Form.Label> 신탁 시작일 </Form.Label>
          <Form.Control type="date" name="periodStart" value={trustModified.periodStart} onChange={handleInputChange} required />
        </Form.Group>

        <Form.Group controlId="formBasicPeriodEnd">
          <Form.Label> 신탁 종료일 </Form.Label>
          <Form.Control type="date" name="periodEnd" value={trustModified.periodEnd} onChange={handleInputChange} required />
        </Form.Group>

        <Form.Group controlId="formBasicEtc">
          <Form.Label> 기타사항 </Form.Label>
          <Form.Control type="textarea" name="etc" value={trustModified.etc} onChange={handleInputChange} required />
        </Form.Group>

        <Form.Group controlId="formBasicAttachments">
          <Form.Label> 첨부파일 </Form.Label>
          <div><Dashboard uppy={uppy} hideUploadButton={true} /></div>
        </Form.Group>
        
        <Button variant="primary" type="submit" className="button3"> 신청하기 </Button>
      </Form>
    </Container>
  );
};

export default TrustModified;
