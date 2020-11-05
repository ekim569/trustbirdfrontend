import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import AuthToken from '../../storages/Auth'


//Withdrawal
const Membership = () => {
    const token = AuthToken.get();
    const history = useHistory();
    const [balance, setBalance] = useState()
    const [membership, setMembership] = useState()
    const [account, setAccount] = useState()

    useEffect(()=>{
        fetch("http://192.168.0.143:3001/api/user/attribute?targetAttr=Membership", {
            mode: "cors",
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Authorization" : `Bearer ${token}`
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
        setMembership(parseInt(res))
      })
      .catch((err) => {
        console.error(err);
        alert("You account not Found!");
      });
    },[membership])

    useEffect(()=>{
        fetch("http://192.168.0.143:3001/api/user/attribute?targetAttr=Balance", {
            mode: "cors",
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Authorization" : `Bearer ${token}`
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
        setBalance(parseInt(res))
      })
      .catch((err) => {
        console.error(err);
        alert("You account not Found!");
      });
    },[balance])

    function handleInputChange(e) {
        e.preventDefault();
    
        const { value, name } = e.target;
    
        console.log(value, name);
    
        setAccount(parseInt(value));
      }
    
  function onSubmit(e) {
    e.preventDefault();
    if(balance >= account * 100000){
        let request = {
            email : "kkkk123@naver.com",
            invoke : "add",
            targetAttr : "Membership",
            value :  (membership + account).toString()
        }

        fetch("http://192.168.0.143:3001/api/user/attribute", {
          mode: "cors",
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization" : `Bearer ${token}`
          },
          body: JSON.stringify(request),
        })
          .then((res) => {
            if(res.status === 200){
               let request = {
                    email : "kkkk123@naver.com",
                    invoke : "add",
                    targetAttr : "Balance",
                    value :  (balance - account * 100000).toString()
                }
                fetch("http://192.168.0.143:3001/api/user/attribute", {
                    mode: "cors",
                    method: "POST",
                    credentials: "include",
                    headers: {
                      "Content-Type": "application/json;charset=utf-8",
                      "Authorization" : `Bearer ${token}`
                    },
                    body: JSON.stringify(request),
                  })
                  .then((res) => {
                      if(res.status === 200){
                        alert("완료되었습니다.")
                        history.push('/');
                      } else {
                        alert("Try again")
                      }
                  })
                }
          })
          .catch((err) => {
            console.error(err);
            alert("You account not Found!");
          });
    } else {
        alert("잔액이 부족합니다.")
    }
  }


  return (
    <Container style={{marginTop:"200px"}} >
        <Form onSubmit={onSubmit}>
      <div className="pageheader" style={{fontSize:"30px"}}>멤버십 가입</div>
      <div
        style={{
          maxWidth:"100%",
          width: "800px",
          margin: "auto",
          border: "solid",
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <h5 style={{textAlign: "center",}}>멤버십 가입</h5> <br/>
        멤버십을 가입하시면 저희 신탁사의 프리미엄 서비스를 이용하실 수 있습니다.
      </div>
      <Container style={{
          maxWidth: "100%",
          marginTop: "16px",
          width:"800px",
          padding:"0",
          textAlign:"center"
      }}>
          <Form.Control
           type="text"
           value={account}      
           name="membership"
           onChange={handleInputChange} 
            ></Form.Control>

        <Button
          variant="primary"
          type="submit"
          className="button2">
       결제하기
        </Button>
      </Container>
      </Form>
    </Container>
  );
};

export default Membership;
