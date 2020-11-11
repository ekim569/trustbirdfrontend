import React, { useState, useEffect } from "react"
import { Container, Form, Button } from "react-bootstrap"
import { useHistory } from "react-router-dom"

import PostFixInput from "../../component/PostFixInput"

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
    const amount = value.replace(/\,/g,"");

   
    if ("0123456789".includes(amount[amount.length - 1]) || amount === "") {
      setBalance(amount.replace(/\B(?=(\d{3})+(?!\d))/g, ","))
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if(payment === balance.replace( /,/gi, '')) {
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
        if(ownBalance > balance.replace( /,/gi, '') * 10000){
          console.log(ownBalance)

          let request = {
            email: "",
            invoke: "add",
            targetAttr: "Balance",
            value: (ownBalance - balance.replace( /,/gi, '') * 10000).toString()
          }
    
          fetch(`${process.env.REACT_APP_SERVER}/api/user/attribute`, {
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
                  alert("입금되었습니다.")
                } else {
                  alert("입금을 실패했습니다.")
                }
                history.push('/trustlist')
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
    <Container style={{ marginTop: "200px", width: "500px" }}>
      <div className="pageheader"> { params.get('status').match(/계약금/) ? "계약금 입금" : "잔금 입금" } </div>
      <Form.Group style={{ textAlign:"end" }}>
        <Form.Label style={{ color:"#3b72f2", fontWeight:"bold"}}>입금 할 금액 : {payment} 만원</Form.Label>
      </Form.Group>

      <Form onSubmit={onSubmit}>
        <Form.Group >
          <Form.Label>금액</Form.Label>
          <PostFixInput labeltext="입금 할 금액" type="text" value={balance} name="balance" postfix="만원" placeholder="금액" onChange={handleBalanceChange} />
        </Form.Group>

        <Button variant="primary" type="submit" className="button3"> 입금하기 </Button>
      </Form>
    </Container>
  );
};

export default Transfer;
