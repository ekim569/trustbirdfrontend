import React, { useEffect, useState } from "react";

import NavbarAccounting from "./NavbarAccounting";
import NavbarBasic from "./NavbarBasic";
import NavbarLegal from "./NavbarLegal";
import NavbarUser from "./NavbarUser";
import NavbarSupervisor from "./NavbarSupervisior"
import NavbarMaintenance from "./NavbarMaintenance"
import NavbarPointManager from './NavbarPointManager'

import AuthToken from "../../storages/Auth";

import "./Navbar.css";

export default function Navbar(props) {
  const _token = AuthToken.get();

  const [token, setToken] = useState();
  const [user, setUser] = useState({
    username: "",
    email: "",
    permission: "",
  });

  useEffect(() => {
    if (_token !== "") {
      setToken(_token);

      fetch("http://192.168.0.143:3001/api/user/infomation", {
        mode: "cors",
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${_token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((res) => {
        setUser(res.user);
      })
      .catch((e) => {
        console.error(e);
      });
    }
  }, []);

  const onClickSignOut = () => {
    setToken("");
    AuthToken.set("");
  };

  return (
    <div>
      {token  ? 
        (() => {
          switch (user.permission) {
            case "user" : 
              return <NavbarUser username={user.username} onClickSignOut={onClickSignOut} />
            case "supervisor" :
              return <NavbarSupervisor username={user.username} onClickSignOut={onClickSignOut} />
            case "legalTL" :
              return <NavbarLegal username={user.username} onClickSignOut={onClickSignOut} />
            case "maintenanceTL" :
              return <NavbarMaintenance username={user.username} onClickSignOut={onClickSignOut} />
            case "accountingTL:" :
              return <NavbarAccounting username={user.username} onClickSignOut={onClickSignOut} />
            case "pointManager" :
                return <NavbarPointManager username={user.username} onClickSignOut={onClickSignOut} />
          }}
        )():(<NavbarBasic/>)
      }
    </div>   
  );
}
