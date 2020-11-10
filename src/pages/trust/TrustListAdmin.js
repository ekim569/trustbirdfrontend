import React, { useState, useEffect, useMemo } from "react"

import Pagination from "../../component/Pagination"
import TrustListPageAdmin from "./TrustListPageAdmin"

import AuthToken from "../../storages/Auth"

const TrustListAdmin = () => {
  const authToken = AuthToken.get();

  const [trustList, setTrustList] = useState([]);
  const [loc, setLoc] = useState(1);

  const pageLimit = 5;
  const paginationLimite = 5;

  const onClick = (loc) => {
    setLoc(loc)
  }

  // list length
  const totalLength = useMemo(() => {
    return trustList.length
  }, [trustList])

  // page length
  const totalPageNum = useMemo(() => {
    return Math.ceil(totalLength / pageLimit)
  }, [totalLength, pageLimit])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER}/api/trust/list`, {
      mode: "cors",
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        return res.json()
      }
    })
    .then((res) => {
      console.log(res)
      if(res !== undefined) {
        setTrustList(res)
      }
    })
  }, [authToken])

  return (
    <div>
      <TrustListPageAdmin trustList={trustList} loc={loc} pageLimit={pageLimit} />
      <Pagination totalLength={totalLength} active={loc} last={totalPageNum} paginationLimite={paginationLimite} onClick={onClick} />
    </div>
  )
}

export default TrustListAdmin;
