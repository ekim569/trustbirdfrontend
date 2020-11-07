import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

//CreacteUser admin
const CreateUser = () => {
  const history = useHistory();
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

    fetch("http://192.168.0.143:3001/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
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
            option
            custom
            required
          >
            <option>선택</option>
            <option value="male">남성</option>
            <option value="felmale">여성</option>
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

        <Form.Group controlId="formBasicPermission">
          <Form.Label>회원 권한</Form.Label>
          <Form.Control
            as="select"
            name="permission"
            value={user.permission}
            onChange={(e) => {
              e.preventDefault();
              setUser({ ...user, permission: e.target.value });
            }}
            option
            custom
            required
          >
            <option>선택</option>
            <option value="superVisor">관리자</option>
            <option value="legalTL">법무 팀장</option>
            <option value="maintenanceTL">시설 팀장</option>
            <option value="accountingTL">회계 팀장</option>
            <option value="warrantyServiceTL">사후관리 팀장</option>
            <option value="pointManager">포인트 관리자</option>
            <option value="User">유저</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formBasicMembership">
          <Form.Label> 멤버쉽 </Form.Label>
          <Form.Control
            type="text"
            placeholder="멤버쉽 가입"
            name="membership"
            value={user.membership}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicBalance">
          <Form.Label> 잔금 </Form.Label>
          <Form.Control
            type="text"
            placeholder="잔금"
            name="balance"
            value={user.balance}
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

export default CreateUser;
