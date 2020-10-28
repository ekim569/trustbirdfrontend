import React from "react";
import { Container, Form, FormGroup, Button } from "react-bootstrap";
import "./Page.css"


//Sign Modified
const SignModified = () => {
  return (
    <Container style={{ maxWidth: "720px" }} >
      <div className="pageheader">회원정보 수정</div>

      <Form  className="sign-form">
        <Form.Group controlId="formBasicUsername">
          <Form.Label> 사용자 이름 </Form.Label>
          <Form.Control type="text" placeholder="" required />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label> 이메일 </Form.Label>
          <Form.Control type="email" placeholder="이메일 입력" required />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label> 비밀번호 </Form.Label>
          <Form.Control type="password" placeholder="비밀번호 입력" required />
        </Form.Group>

        <Form.Group controlId="formBasicPasswordCheck">
          <Form.Label> 비밀번호 확인 </Form.Label>
          <Form.Control
            type="password"
            placeholder="비밀번호 확인"
            required
          />
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
          <Form.Label> 전화번호 </Form.Label>
          <Form.Control type="text" placeholder="전화번호 입력" required />
        </Form.Group>
        <Button
        variant="primary"
        type="submit"
        style={{ float: "right", marginTop: "16px" ,marginBottom:"30px"}}
      >
        수정하기
      </Button>
      </Form>
    </Container>
  );
};

export default SignModified;
