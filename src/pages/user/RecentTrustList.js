import React, { useEffect, useState, useMemo } from "react"

import Pagination from "../../component/Pagination"
import RecentTrustListPage from "./RecentTrustListPage"

import AuthToken from "../../storages/Auth"

const RecentTrustList = () => {
  const authToken = AuthToken.get()

  const [presentTrustList, setPresentTrsutList] = useState([])
  const [loc, setLoc] = useState(1)

  const pageLimit = 5
  const paginationLimite = 5

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER}/api/user/ethereumlist`, {
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
      setPresentTrsutList(res)
    })
  }, [authToken])

  const onClick = (loc) => {
    setLoc(loc)
  }

  // list length
  const totalLength = useMemo(() => {
    return presentTrustList.length
  }, [presentTrustList])

  // page length
  const totalPageNum = useMemo(() => {
    return Math.ceil(totalLength / pageLimit)
  }, [totalLength, pageLimit])

  return (
    <div> 
      <RecentTrustListPage presentTrustList={presentTrustList} loc={loc} pageLimit={pageLimit} />
      <Pagination totalLength={totalLength} active={loc} last={totalPageNum} paginationLimite={paginationLimite} onClick={onClick} />
    </div>
  )
}

export default RecentTrustList