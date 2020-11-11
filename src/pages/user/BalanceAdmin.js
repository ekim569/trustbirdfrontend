import React, { useState } from "react"
import { Container, Form, Button } from "react-bootstrap"
import { useHistory } from "react-router-dom"

import PostFixInput from "../../component/PostFixInput"
import AuthToken from "../../storages/Auth"

const BalanceAdmin = () => {
    const history = useHistory()
    const authToken = AuthToken.get()

    const [email , setEmail] = useState("")
    const [balance, setBalance] = useState("")

    const handleInputChange = (e) => {
        e.preventDefault()
    
        const { value } = e.target
    
        setEmail(value)
    }

    const handleBalanceChange = (e) => {
        e.preventDefault()
        
        const {value} = e.target
        const amount = value.replace(/\,/g,"");

        if ("0123456789".includes(amount[amount.length - 1]) || amount === "") {
          setBalance(amount.replace(/\B(?=(\d{3})+(?!\d))/g, ","))
        }
    }

    function onSubmit(e) {
        e.preventDefault()

        fetch(`${process.env.REACT_APP_SERVER}/api/user/attribute?targetAttr=Balance&email=${email}`, {
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
        .then((ownBalance) => {
            let request = {
                email : email,
                invoke : "add",
                targetAttr : "Balance",
                value :  (parseInt(balance.replace( /,/gi, '')) + parseInt(ownBalance)).toString()
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
                    alert(`${email}의 포인트가 ${balance}원 추가되었습니다.`)
                    history.push('/')
                }
            })
        })
        .catch((err) => {
            console.error(err);
            alert("Error!")
        });
    }

  return (
    <Container style={{marginTop:"200px", width:"500px"}} >
        <div className="pageheader"> 포인트 관리 </div>

        <Form onSubmit={onSubmit}>
            <Form.Group >
                <Form.Label> 이메일 </Form.Label>
                <Form.Control type="email" value={email} name="email" onChange={handleInputChange}  />
            </Form.Group>

            <Form.Group>
                <Form.Label> 포인트 </Form.Label>
                <PostFixInput type="text" value={balance} name="balance" postfix="원" onChange={handleBalanceChange}  />
            </Form.Group>

            <Button variant="primary" type="submit" className="button3"> 추가 </Button>
        </Form>
    </Container>
  )
}

export default BalanceAdmin
