import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import "./Page.css";

//Sign Modified
const SignModified = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    dateOfBirth: "",
    gender: "",
    telephoneNum: "",
  });

  function handleInputChange(e) {
    e.preventDefault();

    const { value, name } = e.target;

    console.log(value, name);

    setUser({
      ...user,
      [name]: value,
    });

  // useEffect(() => {
  //   const body= {
  //     email : "page1111@naver.com"
  //   }
  //   fetch("http://192.168.0.22:3001/api/user/signmodified", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(body)
  //   })
  //   .then((res) => res.json())
  //   .then((res) => {
  //     console.log(res)
  //     const data = maintenanceFeeList.concat(res)
  //     setMaintenanceFeeList(data)
      
      // for(let i = 0; i < res.length; i++){
      //   setMaintenanceFeeList([...maintenanceFeeList,
      //     {
      //       amountDue : res[0].amountDue,
      //       claimingAgency : res[0].claimingAgency,
      //       dueDate : res[0].dueDate,
      //       electronicPaymentNum : res[0].electronicPaymentNum
      //     }]);
//       // }
// //   });
// // },[])
// console.log(maintenanceFeeList)}
  }

  function onSubmit(e) {
    e.preventDefault();

    fetch("http://192.168.0.22:3001/api/user/modified", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
            onChange={handleInputChange}
            placeholder="사용자 이름 입력"
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
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicGender">
          <Form.Label> 성별 </Form.Label>
          <select  onChange></select>
        </Form.Group>

        <Form.Group controlId="formBasicTelephoneNum">
          <Form.Label> 전화번호 </Form.Label>
          <Form.Control
            type="text"
            value={user.telephonNum}
            onChange={handleInputChange}
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
