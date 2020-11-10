import React, { useEffect, useState, useMemo } from "react"

import MaintenanceFeeListPage from "./MaintenanceFeeListPage"
import Pagination from "../../component/Pagination"

import AuthToken from "../../storages/Auth"

//Maintenance Fee List
const MaintenanceFeeList = () => {
  const authToken = AuthToken.get()

  const [maintenanceFeeList, setMaintenanceFeeList] = useState([])
  const [loc, setLoc] = useState(1)

  const pageLimit = 5
  const paginationLimite = 5

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER}/api/user/maintenancefeelist`, {
      mode: "cors",
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`
      }
    })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then((res) => {
      if(res !== undefined) {
        setMaintenanceFeeList(res);
      }
    })
  }, [authToken])

  const onClick = (loc) => {
    setLoc(loc)
  }

  // list length
  const totalLength = useMemo(() => {
    return maintenanceFeeList.length
  }, [maintenanceFeeList])

  // page length
  const totalPageNum = useMemo(() => {
    return Math.ceil(totalLength / pageLimit)
  }, [totalLength, pageLimit])

  return (
    <div>
      <MaintenanceFeeListPage maintenanceFeeList={maintenanceFeeList} loc={loc} pageLimit={pageLimit} />
      <Pagination totalLength={totalLength} total={totalLength} active={loc} last={totalPageNum} paginationLimite={paginationLimite} onClick={onClick} />
    </div>
  )
}

export default MaintenanceFeeList
