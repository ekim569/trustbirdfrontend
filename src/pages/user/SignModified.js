import React, { useState, useEffect } from "react"
import { Container, Form, Button } from "react-bootstrap"
import { useHistory } from "react-router-dom"

import AuthToken from "../../storages/Auth"

//Sign Modified
const SignModified = () => {
  const history = useHistory()
  const authToken = AuthToken.get()

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    dateOfBirth: "",
    gender: "",
    telephoneNum: "",
    permission: "",
    membership: "",
    balance: "",
    trust: new Array(),
    maintenanceFee: new Array()
  })

  const handleInputChange = (e) => {
    e.preventDefault()

    const { value, name } = e.target

    setUser({
      ...user,
      [name]: value,
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    fetch(`${process.env.REACT_APP_SERVER}/api/user/modified`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${authToken}`
      },
      body: JSON.stringify(user)
    })
    .then((res) => {
      if (res.status === 200) {
        history.push("/");
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch((err) => {
      console.error(err);
      alert("Fail to Change Your account");
    })
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER}/api/user/find`, {
      mode: "cors",
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${authToken}`
      }
    })
    .then((res) => {
      if(res.status === 200) {
        return res.json()
      }
    })
    .then((res) => {
      setUser({
        username: res.username,
        email: res.email,
        password: "",
        dateOfBirth: res.dateOfBirth,
        gender: res.gender,
        telephoneNum: res.telephoneNum,
        permission: res.permission,
        membership: res.membership,
        balance: res.balance,
        trust: res.trust,
        maintenanceFee: res.maintenanceFee
      })
    })
    .catch((e)=>{
      console.error(e)
    })
  },[])

  return (
    <Container style={{ maxWidth: "720px" }}>
      <div className="pageheader">회원정보 수정</div>

      <Form className="sign-form">
        <Form.Group controlId="formBasicUsername">
          <Form.Label> 사용자 이름 </Form.Label>
          <Form.Control type="text" name="username" value={user.username} placeholder="사용자 이름 입력" required />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label> 이메일 </Form.Label>
          <Form.Control type="email" name="email" value={user.email} onChange={handleInputChange} placeholder="이메일 입력" readOnly />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label> 비밀번호 </Form.Label>
          <Form.Control type="password" name="password" value={user.password} onChange={handleInputChange} placeholder="비밀번호 입력" required />
        </Form.Group>

        <Form.Group controlId="formBasicPasswordCheck">
          <Form.Label> 비밀번호 확인 </Form.Label>
          <Form.Control type="password" name="password" value={user.password} onChange={handleInputChange} placeholder="비밀번호 확인" required />
        </Form.Group>

        <Form.Group controlId="formBasicDateOfBirth">
          <Form.Label> 생년월일 </Form.Label>
          <Form.Control type="date" name="dateOfBirth" value={user.dateOfBirth} onChange={handleInputChange} required />
        </Form.Group>

        <Form.Group controlId="formBasicGender">
          <Form.Label> 성별 </Form.Label>
          <Form.Control as="select" name="gender" value={user.gender} option custom required
            onChange={(e) => {
              e.preventDefault();
              setUser({ ...user, gender: e.target.value });
            }}>
            <option>선택</option>
            <option value="남성">남성</option>
            <option value="여성">여성</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formBasicTelephoneNum">
          <Form.Label> 전화번호 </Form.Label>
          <Form.Control type="text" value={user.telephoneNum} placeholder="전화번호 입력" required />
        </Form.Group>

        <Form style={{textAlign:"right"}}>
          <Button variant="primary" type="submit" className="button2" onClick={() => { history.push('/') }} style={{ marginRight:"20px" }} >
            취소하기
          </Button>
          <Button variant="primary" type="submit" className="button2" onClick={onSubmit}>수정하기</Button>
        </Form>
      </Form>
    </Container>
  )
}

export default SignModified;
