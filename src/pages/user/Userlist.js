import React, { useEffect, useState, useMemo } from "react"

import Pagination from "../../component/Pagination"
import UserListPage from "./UserListPage"

import AuthToken from "../../storages/Auth"

const Userlist = () => {
  const authToken = AuthToken.get()

  const [userList, setUserList] = useState([])
  const [loc, setLoc] = useState(1)

  const pageLimit = 5
  const paginationLimite = 5

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER}/api/user/list`, {
      mode: "cors",
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      }
    })
    .then((res) => {
      if (res.status === 200) {
        return res.json()
      }
    })
    .then((res) => {
      setUserList(res)
    })
  }, [authToken])

  const onClick = (loc) => {
    setLoc(loc)
  };

  // list length
  const totalLength = useMemo(() => {
    return userList.length
  }, [userList])

  // page length
  const totalPageNum = useMemo(() => {
    return Math.ceil(totalLength / pageLimit)
  }, [totalLength, pageLimit])

  return (
    <div> 
      <UserListPage
        userList={userList}
        loc={loc}
        pageLimit={pageLimit}
      />
      <Pagination
        totalLength={totalLength}
        total={totalLength}
        active={loc}
        last={totalPageNum}
        paginationLimite={paginationLimite}
        onClick={onClick}
      />
    </div>
  )
}

export default Userlist
