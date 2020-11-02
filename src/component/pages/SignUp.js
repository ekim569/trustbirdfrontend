import React, { useState } from "react";

import { Container, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./Page.css";

//Sign Up
const SignUp = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    dateOfBirth: "",
    gender: "남성",
    telephoneNum: "",
    permission: "user",
  });

  // function selectChange(e) {
  //   e.preventDefault();
  //   console.log(e.target.value);
  //   this.setState({ value: e.target.value });
  // }

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
        console.log(res);
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
    <Container style={{ maxWidth: "750px" }}>
      <div className="pageheader">회원가입</div>
      <Form className="sign-form" onSubmit={onSubmit}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label> 이름 </Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={user.username}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label> 이메일 </Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
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
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPasswordCheck">
          <Form.Label> 비밀번호 재확인 </Form.Label>
          <Form.Control type="password" required />
        </Form.Group>

        <Form.Group controlId="formBasicDateOfBirth">
          <Form.Label> 생년월일 </Form.Label>
          <Form.Control
            type="date"
            name="dateOfBirth"
            value={user.dateOfBirth}
            onChange={handleInputChange}
            required
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
            // onChange={(e) => {
            //   setTrustsub({ ...trustsub, attachments: e.target.files[0] });
            // }}
            option
            custom
          >
            <option value="남성">남성</option>
            <option value="여성">여성</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formBasicTelephoneNum">
          <Form.Label> 휴대전화 </Form.Label>
          <Form.Control
            type="text"
            placeholder="전화번호 입력"
            name="telephoneNum"
            value={user.telephonNum}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="button3">
          회원가입
        </Button>
      </Form>
    </Container>
  );
};

export default SignUp;
