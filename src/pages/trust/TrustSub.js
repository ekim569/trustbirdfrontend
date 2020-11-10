import React, { useState } from "react"
import { Container, Button, Form } from "react-bootstrap"
import { useHistory } from "react-router-dom"

import Uppy from "@uppy/core"
import { Dashboard } from "@uppy/react"

import PostFixInput from "../../component/PostFixInput"
import AuthToken from "../../storages/Auth"

import "@uppy/core/dist/style.css"
import "@uppy/dashboard/dist/style.css"

//Trust Subscription
const TrustSub = () => {
  const history = useHistory()
  const authToken = AuthToken.get()

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
    contract: ""
  })

  const uppy = new Uppy({
    debug: true,
    autoProceed: false,
    restrictions: {
      maxFileSize: 100000000,
      maxNumberOfFiles: 3,
      allowedFileTypes: [".jpg", ".png", ".pdf"]
    }
  })

  const handleInputChange = (e) => {
    e.preventDefault()

    const { value, name } = e.target

    setTrustsub({
      ...trustsub,
      [name]: value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const ownMembership = "0"

    fetch(`${process.env.REACT_APP_SERVER}/api/user/attribute?targetAttr=Membership`, {
      mode: "cors",
      method: "GET",
      credentials: "include",
      headers: {
          "Content-Type": "application/json;charset=utf-8",
          "Authorization" : `Bearer ${authToken}`
      }
    })
    .then((res) => {
      if(res.status === 200){
        return res.json(res)
      } else {
        alert("Try again login")
      }
    })
    .then((res) => {
      if (res !== "0"){
        ownMembership(res)
      }
    })
    .catch((err) => {
      console.error(err);
      alert("Error!");
    });

    if(ownMembership > 0) {
      const formData = new FormData()

      for (const [key, value] of Object.entries(trustsub)) {
        formData.append(key, value)
      }

      for (let file of Object.values(uppy.state.files)) {
        formData.append("attachments", file.data)
      }

      fetch(`${process.env.REACT_APP_SERVER}/api/trust/subscription`, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${authToken}`
        },
        body: formData
      })
      .then((res) => {
        if (res.status === 200) {
          return res.json()  
        }
      })
      .then((membership) => {
        if(membership !== undefined){
          let request = {
            email : "",
            invoke : "add",
            targetAttr : "Balance",
            value :  (parseInt(membership) - 1).toString()
          }

          fetch(`${process.env.REACT_APP_SERVER}/api/user/attribute`, {
              mode: "cors",
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Authorization" : `Bearer ${authToken}`
              },
              body: JSON.stringify(request)
            })
          .then((res) => {
              if(res.status === 200){
                alert("완료되었습니다.")
                history.push("/trustlist")
              } else {
                alert("Try again")
              }
          })
        }
      })
      .catch((err) => {
        console.error(err)
        alert("Error!")
      })
    } else {
      alert('멤버십이 부족합니다.')
      history.push('/trustlist')
    }
  }

  return (
    <Container style={{ maxWidth: "800px" }}>
      <div className="pageheader">신탁 신청</div>
      <Form className="sign-form" onSubmit={onSubmit}>
        <Form.Group controlId="formBasicTrustProfit">
          <Form.Label> 신탁자 </Form.Label>
          <PostFixInput labelText="신탁자" postfix="" type="text" placeholder="성함" name="username" value={trustsub.username} onChange={handleInputChange} />
        </Form.Group>

        <Form.Group controlId="formBasicNegligenceProfit">
          <Form.Label> 신탁자 전화번호 </Form.Label>
          <PostFixInput labelText="신탁자번호" postfix="" type="text" placeholder="전화번호" name="telephoneNum" value={trustsub.telephoneNum} onChange={handleInputChange} />
        </Form.Group>

        <Form.Group controlId="formBasicTrustProfit">
          <Form.Label> 중개인 이름 </Form.Label>
          <PostFixInput labelText="중개인" postfix="" type="text" placeholder="성함" name="realtorName" value={trustsub.realtorName} onChange={handleInputChange} />
        </Form.Group>

        <Form.Group controlId="formBasicNegligenceProfit">
          <Form.Label> 중개사 전화번호 </Form.Label>
          <PostFixInput labelText="중개사번호" postfix="" type="text" placeholder="전화번호" name="realtorTelephoneNum" value={trustsub.realtorTelephoneNum} onChange={handleInputChange} />
        </Form.Group>

        <Form.Group controlId="formBasicRealtor">
          <Form.Label> 중개인 휴대전화번호 </Form.Label>
          <PostFixInput labelText="중개인번호" postfix="" type="text" placeholder="전화번호" name="realtorCellphoneNum" value={trustsub.realtorCellphoneNum} onChange={handleInputChange} />
        </Form.Group>

        <div>
          <Form.Label>전 · 월세</Form.Label><br />
          <Form controlId="formBasicType" style={{ display: "inline-block", marginRight: "32px" }}>
            <Form.Check type="checkbox" name="type" value="전세" label="전세" required
              onChange={(e) => {
                e.preventDefault()
                setTrustsub({ ...trustsub, type: e.target.value })
              }}/>
          </Form>

          <Form controlId="formBasicTypeCheck" style={{ display: "inline-block" }}>
            <Form.Check type="checkbox" name="type" value="월세" label="월세" required
              onChange={(e) => {
                e.preventDefault()
                setTrustsub({ ...trustsub, type: e.target.value })
              }}/>
          </Form>
        </div>

        <Form.Group controlId="formBasiSecurityDeposit">
          <Form.Label> 신탁 부동산 보증금 </Form.Label>
          <PostFixInput labelText="부동산가격" postfix="만원" type="text" placeholder="금액" name="securityDeposit" value={trustsub.securityDeposit} onChange={handleInputChange} />
        </Form.Group>

        <Form.Group controlId="formBasicRent">
          <Form.Label> 신탁 부동산 월세 </Form.Label>
          <PostFixInput labelText="부동산가격" postfix="만원" type="text" placeholder="금액" name="rent" value={trustsub.rent} onChange={handleInputChange} />
        </Form.Group>

        <Form.Group controlId="formBasicPeriodStart">
          <Form.Label> 신탁 시작일 </Form.Label>
          <Form.Control type="date" name="periodStart" value={trustsub.periodStart} onChange={handleInputChange} />
        </Form.Group>

        <Form.Group controlId="formBasicPeriodEnd">
          <Form.Label> 신탁 종료일 </Form.Label>
          <Form.Control type="date" name="periodEnd" value={trustsub.periodEnd} onChange={handleInputChange} />
        </Form.Group>

        <Form.Group controlId="formBasicEtc">
          <Form.Label> 기타사항 </Form.Label>
          <Form.Control type="textarea" name="etc" value={trustsub.etc} onChange={handleInputChange} />
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

export default TrustSub;
