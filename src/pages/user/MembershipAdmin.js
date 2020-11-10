import React, { useState } from "react"
import { Container, Form, Button } from "react-bootstrap"
import { useHistory } from "react-router-dom"

import AuthToken from '../../storages/Auth'

const MembershipAdmin = () => {
    const history = useHistory()
    const token = AuthToken.get()

    const [email , setEmail] = useState("")
    const [membership, setMembership] = useState("")

    const handleInputChange = (e) => {
        e.preventDefault()

        const { value } = e.target

        setEmail(value)
    }

    const handleMembershipChange = (e) => {
        e.preventDefault()
        
        const {value} = e.target
        
        if ("0123456789".includes(value[value.length-1]) || value === ''){
            setMembership(value)
        }
    }
        
    const onSubmit = (e) => {
        e.preventDefault()

        fetch(`${process.env.REACT_APP_SERVER}/api/user/attribute?targetAttr=Membership&email=${email}`, {
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
        .then((ownMembership) => {
            let request = {
                email : email,
                invoke : "add",
                targetAttr : "Membership",
                value :  (parseInt(membership) + parseInt(ownMembership)).toString()
            }
        
            fetch("${process.env.REACT_APP_SERVER}/api/user/attribute", {
                mode: "cors",
                method: "POST",
                credentials: "include",
                headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Authorization" : `Bearer ${token}`
                },
                body: JSON.stringify(request)
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
            alert("Error!")
        })
    }

    return (
        <Container style={{marginTop:"200px", width:"800px"}} >
            <div className="pageheader"> 멤버십 관리 </div>

            <Form onSubmit={onSubmit}>
                <Form.Group >
                    <Form.Label> 이메일 </Form.Label>
                    <Form.Control type="email" value={email} name="email" onChange={handleInputChange}  />
                </Form.Group>

                <Form.Group>
                    <Form.Label> 멤버십 </Form.Label>
                    <Form.Control type="text" value={membership} name="membership" onChange={handleMembershipChange}  />
                </Form.Group>

                <Button variant="primary" type="submit" className="button3">추가</Button>
            </Form>
        </Container>
    )
}

export default MembershipAdmin;
