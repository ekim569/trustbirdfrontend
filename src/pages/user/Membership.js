import React, { useEffect, useState } from "react"
import { Container, Form, Button } from "react-bootstrap"
import { useHistory } from "react-router-dom"

import AuthToken from '../../storages/Auth'

const Membership = () => {
  const history = useHistory()
  const authToken = AuthToken.get()
  
  const [balance, setBalance] = useState()
  const [membership, setMembership] = useState("")
  const [ownMembership, setOwnMembership] = useState()

  const handleMembershipChange = (e) => {
    e.preventDefault()
    
    const {value} = e.target
    
    if ("0123456789".includes(value[value.length-1]) || value === ''){
      setMembership(value)
    }
  }
    
  const onSubmit = (e) => {
    e.preventDefault()

    if(balance >= membership * 100000){
      let request = {
        email : "",
        invoke : "add",
        targetAttr : "Membership",
        value :  (parseInt(membership) + ownMembership).toString()
      }

      fetch(`${process.env.REACT_APP_SERVER}/api/user/attribute`, {
        mode: "cors",
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "Authorization" : `Bearer ${authToken}`
        },
        body: JSON.stringify(request)
      })
      .then((res) => {
        if(res.status === 200){
          let request = {
            email : "",
            invoke : "add",
            targetAttr : "Balance",
            value :  (balance - membership * 100000).toString()
          }
          fetch(`${process.env.REACT_APP_SERVER}/api/user/attribute`, {
            mode: "cors",
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              "Authorization" : `Bearer ${authToken}`
            },
            body: JSON.stringify(request)
          })
          .then((res) => {
            if(res.status === 200){
              alert("완료되었습니다.")
              history.push('/')
            } else {
              alert("Try again")
            }
          })
        }
      })
      .catch((err) => {
        console.error(err)
        alert("Error!")
      })
    } else {
      alert("잔액이 부족합니다.")
    }
  }

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_SERVER}/api/user/attribute?targetAttr=Membership`, {
      mode: "cors",
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Authorization" : `Bearer ${authToken}`
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
      if (res !== "0"){
        setOwnMembership(parseInt(res))
      }
    })
    .catch((err) => {
      console.error(err);
      alert("Error!")
    })
  },[ownMembership])

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_SERVER}/api/user/attribute?targetAttr=Balance`, {
      mode: "cors",
      method: "GET",
      credentials: "include",
      headers: {
          "Content-Type": "application/json;charset=utf-8",
          "Authorization" : `Bearer ${authToken}`
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
      alert("Error!");
    });
  },[balance])

  return (
    <Container style={{marginTop:"200px"}} >
      <Form onSubmit={onSubmit}>
        <div className="pageheader" style={{fontSize:"30px"}}>멤버십 가입</div>
        <div style={{ maxWidth:"100%", width: "800px", margin: "auto", border: "solid", borderRadius: "10px", padding: "20px" }}>
          <h5 style={{ textAlign: "center" }}>멤버십 가입</h5><br/>
          멤버십을 가입하시면 저희 신탁사의 프리미엄 서비스를 이용하실 수 있습니다.
        </div>
        <Container style={{ maxWidth: "100%", marginTop: "16px", width:"800px", padding:"0", textAlign:"center" }}>
          <Form.Control type="text" value={membership} name="membership" onChange={handleMembershipChange} />
          <Button variant="primary" type="submit" className="button2">결제하기</Button>
        </Container>
      </Form>
    </Container>
  )
}

export default Membership;
