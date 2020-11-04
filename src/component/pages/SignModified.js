import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import AuthToken from '../../storages/Auth'

import "./Page.css";

//Sign Modified
const SignModified = () => {
  const token = AuthToken.get();
  const history = useHistory();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    dateOfBirth: "",
    gender: "",
    telephoneNum: "",
  });

  useEffect(() => {
    fetch("http://192.168.0.143:3001/api/user/find", {
      mode: "cors",
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    })
    .then((res) => {
      if(res.status === 200) {
        return res.json()
      }
    })
    .then((res) => {
      setUser(res)
    }).catch((e)=>{
      console.error(e)
    })
    },[])

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

    fetch("http://192.168.0.143:3001/api/user/modified", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify(user),
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
      });
  }

  return (
    <Container style={{ maxWidth: "720px" }} >
      <div className="pageheader">회원정보 수정</div>

      <Form  className="sign-form">
        <Form.Group controlId="formBasicUsername">
          <Form.Label> 사용자 이름 </Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={user.username}
            placeholder="사용자 이름 입력"
            readOnly

          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label> 이메일 </Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            placeholder="이메일 입력"
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label> 비밀번호 </Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
            placeholder="비밀번호 입력"
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPasswordCheck">
          <Form.Label> 비밀번호 확인 </Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
            placeholder="비밀번호 확인"
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicDateOfBirth">
          <Form.Label> 생년월일 </Form.Label>
          <Form.Control
            type="date"
            name="dateOfBirth"
            value={user.dateOfBirth}
            onChange={handleInputChange}
            readOnly
          />
        </Form.Group>

        <Form.Group controlId="formBasicGender">
          <Form.Label> 성별 </Form.Label>
          <Form.Control
            as="select"
            name="gender"
            value={user.gender}
            onChange={(e) => {
              e.preventDefault();
              setUser({ ...user, gender: e.target.value });
            }}
            option
            custom
            required
          >
            <option>선택</option>
            <option value="남성">남성</option>
            <option value="여성">여성</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formBasicTelephoneNum">
          <Form.Label> 전화번호 </Form.Label>
          <Form.Control
            type="text"
            value={user.telephoneNum}
            placeholder="전화번호 입력"
            required
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="button3"
        >
          수정하기
        </Button>
      </Form>
    </Container>
  );
};

export default SignModified;
