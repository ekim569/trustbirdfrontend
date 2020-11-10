import React, { useState, useEffect } from "react"
import { Container, Form, Button } from "react-bootstrap"
import { useHistory } from "react-router-dom"

import AuthToken from "../../storages/Auth"

const Transfer = ({location}) => {
  const history = useHistory()
  const authToken = AuthToken.get()

  const params = new URLSearchParams(location.search)

  const [payment, setPayment] = useState("0")
  const [balance, setBalance] = useState("")


  const handleBalanceChange = (e) => {
    e.preventDefault()

    const { value } = e.target

    if ("0123456789".includes(value[value.length - 1]) || value === "") {
      setBalance(value)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if(payment === balance) {
      fetch(`${process.env.REACT_APP_SERVER}/api/user/attribute?targetAttr=Balance`, {
        mode: "cors",
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Bearer ${authToken}`
        }
      })
      .then((res) => {
        if (res.status === 200) {
          return res.json()
        } else {
          alert("Try again login")
        }
      })
      .then((ownBalance) => {
        console.log(ownBalance)
        if(parseInt(ownBalance) > parseInt(balance) * 10000){
          let request = {
            email: "",
            invoke: "add",
            targetAttr: "Balance",
            value: (parseInt(ownBalance) - parseInt(balance) * 10000).toString()
          }
    
          fetch("${process.env.REACT_APP_SERVER}/api/user/attribute", {
            mode: "cors",
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify(request),
          })
          .then((res) => {
            let status = params.get('status').match(/계약금/) ? "사용자 계약 승인" : "사용자 계약 전환" 

            if (res.status === 200) {
              fetch(`${process.env.REACT_APP_SERVER}/api/trust/status`, {
                mode: "cors",
                method: "POST",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${authToken}`,
                },
                body : JSON.stringify({token : params.get('token'), status})
              })
              .then((res) => {
                if(res.status === 200) {
                  alert("입금되었습니다.");
                } else {
                  alert("입금을 실패했습니다.");
                }
              })
            }
          })
        } else {
          alert('잔액이 부족합니다.')
          history.push('/trustlist')
        }
      })
    } else {
      alert('금액이 일치하지 않습니다.')
    }
  }

  useEffect(() => {
    const status = params.get('status')
    
    fetch(`${process.env.REACT_APP_SERVER}/api/trust/find?token=${params.get('token')}`, {
      mode: "cors",
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${authToken}`,
      }
    })
    .then((res) => {
      if (res.status === 200) {
        return res.json(res)
      } else {
        alert("Try again login")
      }
    })
    .then((trust) => {
      if(trust !== undefined){
        if(status.match(/계약금/)){ 
          setPayment(Math.ceil(trust.securityDeposit / 10).toString())
        } else {
          if(trust.contract){
            fetch(`${process.env.REACT_APP_SERVER}/api/contract/find?token=${trust.contract}`, {
              mode: "cors",
              method: "GET",
              credentials: "include",
              headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: `Bearer ${authToken}`,
              }
            })
            .then((res) => {
              if (res.status === 200) {
                return res.json(res);
              } else {
                alert("Try again login");
              }
            })
            .then((contract) => {
              if(contract !== undefined){
                setPayment(contract.balance)
              }
            })
          }
        }
      }
    })
    .catch((err) => {
      console.error(err)
      alert("Error!")
    });
  },[])

  return (
    <Container style={{ marginTop: "200px", width: "800px" }}>
      <div className="pageheader"> { params.get('status').match(/계약금/) ? "계약금 입금" : "잔금 입금" } </div>
      <Form.Group style={{ textAlign:"end" }}>
        <Form.Label style={{ color:"#3b72f2", fontWeight:"bold"}}>입금 해야 할 금액 : {payment} 만원</Form.Label>
      </Form.Group>

      <Form onSubmit={onSubmit}>
        <Form.Group >
          <Form.Label>금액</Form.Label>
          <Form.Control type="text" value={balance} name="balance" onChange={handleBalanceChange} />
        </Form.Group>

        <Button variant="primary" type="submit" className="button3"> 입금하기 </Button>
      </Form>
    </Container>
  );
};

export default Transfer;
