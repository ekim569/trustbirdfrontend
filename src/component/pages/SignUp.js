import React from "react";

import { Container, Form, Button } from "react-bootstrap";
import "./Page.css";

//Sign Up
const SignUp = () => {
  
  return (
    <Container style={{maxWidth:"800px"}}>
      <div className="pageheader">회원가입</div>
      <Form className="sign-form">
        <Form.Group controlId="formBasicUsername">
          <Form.Label> 이름 </Form.Label>
          <Form.Control type="text" required />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label> 이메일 </Form.Label>
          <Form.Control type="email" required />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label> 비밀번호 </Form.Label>
          <Form.Control type="password" required />
        </Form.Group>

        <Form.Group controlId="formBasicPasswordCheck">
          <Form.Label> 비밀번호 재확인 </Form.Label>
          <Form.Control type="password" required />
        </Form.Group>

        <Form.Group controlId="formBasicDateOfBirth">
          <Form.Label> 생년월일 </Form.Label>
          <Form.Control type="date" required />
        </Form.Group>

        <Form.Group controlId="formBasicGender">
          <Form.Label> 성별 </Form.Label>
          <Form.Control as="select" custom>
            <option>남성</option>
            <option>여성</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formBasicTelephoneNum">
          <Form.Label> 휴대전화 </Form.Label>
          <Form.Control type="text" placeholder="전화번호 입력" required />
        </Form.Group>
      </Form>      
      <Button
        variant="primary"
        type="submit"
        className="button3"
      >
        회원가입
      </Button>
    </Container>
  );
};

export default SignUp;
