import React, { useState, useEffect, useMemo } from "react"

import Pagination from "../../component/Pagination"
import ContractListPage from "./ContractListPage"

import AuthToken from "../../storages/Auth"

//Contract List
const ContractList = () => {
  const autuToken = AuthToken.get()

  const [contractList, setContractList] = useState([])
  const [loc, setLoc] = useState(1)

  const pageLimit = 5
  const paginationLimite = 5

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER}/api/contract/list`, {
      mode: "cors",
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${autuToken}`
      }
    })
    .then((res) => {
      if (res.status === 200) {
        return res.json()
      }
    })
    .then((res) => {
      if(res !== undefined) {
        setContractList(res)
      }
    })
  }, [autuToken])

  const onClick = (loc) => {
    setLoc(loc)
  };

  // list length
  const totalLength = useMemo(() => {
    return contractList.length
  }, [contractList])

  // page length
  const totalPageNum = useMemo(() => {
    return Math.ceil(totalLength / pageLimit)
  }, [totalLength, pageLimit])

  return (
    <div>
      <ContractListPage contractList={contractList} loc={loc} pageLimit={pageLimit} />
      <Pagination totalLength={totalLength} active={loc} last={totalPageNum} paginationLimite={paginationLimite} onClick={onClick} />
    </div>
  )
}

export default ContractList
