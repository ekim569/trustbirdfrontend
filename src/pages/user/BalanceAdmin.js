import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import AuthToken from '../../storages/Auth'

const BalanceAdmin = () => {
    const token = AuthToken.get();
    const history = useHistory();

    const [email , setEmail] = useState("")
    const [balance, setBalance] = useState("")

    function handleInputChange(e) {
        e.preventDefault();
    
        const { value } = e.target;
    
        console.log(value)

        setEmail(value);
    }

    function handleBalanceChange(e){
        e.preventDefault();
        
        const {value} = e.target;
        
        if ("0123456789".includes(value[value.length-1]) || value === ''){
            setBalance(value)
        }
    }
      
  async function onSubmit(e) {
    e.preventDefault();

    await fetch(`http://192.168.0.143:3001/api/user/attribute?targetAttr=Balance&email=${email}`, {
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
    .then((ownBalance) => {
        let request = {
            email : email,
            invoke : "add",
            targetAttr : "Balance",
            value :  (parseInt(balance) + parseInt(ownBalance)).toString()
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
                alert('멤버십이 추가되었습니다.')
                history.push('/')
            }
        })
    })
    .catch((err) => {
        console.error(err);
        alert("You balance not Found!");
    });
  }

  return (
    <Container style={{marginTop:"200px", width:"800px"}} >
        <div className="pageheader"> 포인트 관리 </div>

        <Form onSubmit={onSubmit}>
            <Form.Group >
                <Form.Label>이메일</Form.Label>
                <Form.Control
                type="email"
                value={email}
                name="email"
                onChange={handleInputChange} 
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>포인트</Form.Label>
                <Form.Control
                type="text"
                value={balance}
                name="balance"
                onChange={handleBalanceChange} 
                />
            </Form.Group>

            <Button
            variant="primary"
            type="submit"
            className="button3">
            추가
            </Button>
        </Form>
    </Container>
  );
};

export default BalanceAdmin;
