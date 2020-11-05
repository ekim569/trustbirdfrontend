import React, { useEffect, useState, useMemo } from "react";
import AuthToken from "../../storages/Auth";
import MaintenanceFeeListPage from "./MaintenanceFeeListPage";
import Pagination from "../../component/Pagination";

//userEffect

//Maintenance Fee List
const MaintenanceFeeList = () => {
  const token = AuthToken.get();

  const [maintenanceFeeList, setMaintenanceFeeList] = useState([]);
  const [loc, setLoc] = useState(1);

  const pageLimit = 5;
  const paginationLimite = 5;

  useEffect(() => {
    fetch("http://192.168.0.143:3001/api/user/maintenancefeelist", {
      mode: "cors",
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((res) => {
        console.log(res);
        setMaintenanceFeeList(res);
      });
  }, [token]);

  const onClick = (loc) => {
    setLoc(loc);
  };

  // list length
  const totalLength = useMemo(() => {
    return maintenanceFeeList.length;
  }, [maintenanceFeeList]);

  // page length
  const totalPageNum = useMemo(() => {
    return Math.ceil(totalLength / pageLimit);
  }, [totalLength, pageLimit]);

  return (
    <div>
      <MaintenanceFeeListPage
        maintenanceFeeList={maintenanceFeeList}
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
  );
};

export default MaintenanceFeeList;
