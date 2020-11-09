import React from "react";
import AuthToken from "../../storages/Auth";

import Pagination from "../../component/Pagination";
import TrustListPage from "./TrustListPage";

const TrustList = () => {
  const token = AuthToken.get();

  const [trustList, setTrustList] = React.useState([]);
  const [loc, setLoc] = React.useState(1);

  const pageLimit = 5;
  const paginationLimite = 5;

  React.useEffect(() => {
    fetch("http://192.168.0.143:3001/api/user/trustlist", {
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
        if( res !== undefined){
          setTrustList(res);
        }
        
      });
  }, [token]);

  const onClick = (loc) => {
    setLoc(loc);
  };

  // list length
  const totalLength = React.useMemo(() => {
    return trustList.length;
  }, [trustList]);

  // page length
  const totalPageNum = React.useMemo(() => {
    return Math.ceil(totalLength / pageLimit);
  }, [totalLength, pageLimit]);

  return (
    <div>
      <TrustListPage trustList={trustList} loc={loc} pageLimit={pageLimit} />
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

export default TrustList;
