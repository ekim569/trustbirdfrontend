import React, { useState, useEffect, useMemo } from "react";
import AuthToken from "../../storages/Auth";
import Pagination from "../../component/Pagination";
import ContractListPage from "./ContractListPage";

//Contract List
const ContractList = () => {
  const token = AuthToken.get();

  const [contractList, setContractList] = useState([]);
  const [loc, setLoc] = useState(1);

  const pageLimit = 5;
  const paginationLimite = 5;

  useEffect(() => {
    fetch("http://192.168.0.143:3001/api/contract/list", {
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
        if(res !== undefined) {
          setContractList(res);
        }
      });
  }, [token]);

  const onClick = (loc) => {
    setLoc(loc);
  };

  // list length
  const totalLength = useMemo(() => {
    return contractList.length;
  }, [contractList]);

  // page length
  const totalPageNum = useMemo(() => {
    return Math.ceil(totalLength / pageLimit);
  }, [totalLength, pageLimit]);

  return (
    <div>
      <ContractListPage
        contractList={contractList}
        loc={loc}
        pageLimit={pageLimit}
      />
      <Pagination
        totalLength={totalLength}
        active={loc}
        last={totalPageNum}
        paginationLimite={paginationLimite}
        onClick={onClick}
      />
    </div>
  );
};

//Contract List
export default ContractList;
