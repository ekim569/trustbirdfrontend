import React from "react"
import { Container, Table, Button } from "react-bootstrap"

import AuthToken from "../../storages/Auth"

const UserListPage = ({ userList, loc, pageLimit }) => {
  const authToken = AuthToken.get()

  const onClick = (email) => {
    fetch(`${process.env.REACT_APP_SERVER}/api/user/withdrawal`, {
      mode: "cors",
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ email })
    })
    .then((res) => {
      if (res.status === 200) {
        alert("User Delete Complete")
      } else {
        alert("User Delete Fail")
      }
      window.location.reload()
    })
  }

  return (
    <Container style={{ marginTop: "150px" }}>
      <div className="maintenanceimage">
        <div className="pageheader" style={{ marginTop: "50px" }}>
          유저 현황
        </div>
      </div>
      <Table bordered={true} style={{ marginBottom: "100px", textAlign: "center" }}>
        <thead>
          <tr>
            <th>NO.</th>
            <th>이름</th>
            <th>이메일</th>
            <th>생일</th>
            <th>성별</th>
            <th>전화번호</th>
            <th>권한</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {userList
            .slice(pageLimit * (parseInt(loc) - 1), pageLimit * parseInt(loc))
            .map((user) => (
              <tr key={user.email}>
                <td>{user.no}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.dateOfBirth}</td>
                <td>{user.gender}</td>
                <td>{user.telephoneNum}</td>
                <td>{user.permission}</td>
                <td><Button className="deleteimage" onClick={() => onClick(user.email)} /></td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </Container>
  )
}

export default UserListPage
