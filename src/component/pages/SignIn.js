import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import PostFixInput from "./PostFixInput";
import Logo from "../icons/LogoIcon";
import "./Page.css"

//Sign In
const SignIn = () => {
  return (
    <Container style={{maxWidth:"800px"}}>
      <div className="pageheader">
        <Logo />
        <div className="login">
          로그인
        </div>
      </div>
      <Form style={{ marginTop: "5rem" }} className="sign-form">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>이메일</Form.Label>
          <Form.Control type="email" placeholder="이메일" required />
        </Form.Group>
        {/* <Form.Group controlId="formBasicEmail">
          <Form.Label>Eamil</Form.Label>
          <PostFixInput type="email" placeholder="Enter email" required postfix="" />
        </Form.Group> */}

        <Form.Group controlId="formBasicPassword">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control type="password" placeholder="비밀번호" required />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          style={{
            width: "100%",
            backgroundColor: "#3B72F2",
            outlineColor: "#3B72F2",
            marginTop: "16px",
            marginBottom: "80"
          }}
        >
          로그인
        </Button>
      </Form>
    </Container>
  );
};

export default SignIn;
