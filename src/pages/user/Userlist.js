import React, { useEffect, useState, useMemo } from "react";
import AuthToken from "../../storages/Auth";
import Pagination from "../../component/Pagination";
import UserListPage from "./UserListPage"

//userEffect

//Maintenance Fee List
const Userlist = () => {
  const token = AuthToken.get();

  const [userList, setUserList] = useState([]);
  const [loc, setLoc] = useState(1);

  const pageLimit = 5;
  const paginationLimite = 5;

  useEffect(() => {
    fetch("http://192.168.0.143:3001/api/user/list", {
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
        setUserList(res);
      });
  }, [token]);

  const onClick = (loc) => {
    setLoc(loc);
  };

  // list length
  const totalLength = useMemo(() => {
    return userList.length;
  }, [userList]);

  // page length
  const totalPageNum = useMemo(() => {
    return Math.ceil(totalLength / pageLimit);
  }, [totalLength, pageLimit]);

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
  );
};

export default Userlist;
