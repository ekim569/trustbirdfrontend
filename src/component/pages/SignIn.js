import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Logo from "../icons/LogoIcon";
import { CookieStorage } from "cookie-storage";
import "./Page.css";

//Sign In
const SignIn = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

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

    const cookieStorage = new CookieStorage();
    const sid = cookieStorage.getItem("connect.sid");

    fetch("http://192.168.0.22:3001/api/user/signin", {
      mode: "cors",
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        console.log(res.body);
        if (res.status === 201) {
          history.push("/");
        } else {
          const error = new Error(res.error);

          throw error;
        }
      })
      .catch((err) => {
        console.error(err);
        alert("You account not Found!");
      });
  }

  return (
    <Container style={{ maxWidth: "800px" }}>
      <div className="pageheader">
        <Logo />
        <div className="login">로그인</div>
      </div>
      <Form
        style={{ marginTop: "5rem" }}
        className="sign-form"
        onSubmit={onSubmit}
      >
        <Form.Group controlId="formBasicEmail">
          <Form.Label>이메일</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="이메일"
            value={user.email}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="비밀번호"
            value={user.password}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          style={{
            width: "100%",
            backgroundColor: "#3B72F2",
            outlineColor: "#3B72F2",
            marginTop: "16px",
            marginBottom: "80",
          }}
        >
          로그인
        </Button>
      </Form>
    </Container>
  );
};

export default SignIn;
