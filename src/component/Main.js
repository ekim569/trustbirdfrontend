import React, { useEffect, useState } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import Footer from "./pages/Footer";
import Home from "./pages/Home";
import FoundationIntro from "./pages/FoundationIntro";
import ServiceIntro from "./pages/ServiceIntro";
import TrustWay from "./pages/TrustWay";
import TrustSub from "./pages/TrustSub";
import Trust from "./pages/Trust";
import ContractList from "./pages/ContractList";
import ContractEnroll from "./pages/ContractEnroll";
import Contract from "./pages/Contract";
import MaintenanceFeeList from "./pages/MaintenanceFeeList";
import MaintenanceFee from "./pages/MaintenanceFee";
import SignModified from "./pages/SignModified";
import Withdrawal from "./pages/Withdrawal";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Navbar from "../component/Navbar/Navbar";

// const pluginWrapper = () => {
//   require('./statics/fullpage.scrollHorizontally.min');
// };

const Main = (props) => {
  const [token, setToken] = useState({});

  useEffect(() => {
    fetch("http://192.168.0.22:3001/test", {
      mode: "cors",
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  });

  return (
    <div>
      <Router>
        <Navbar />
        <div style={{ marginTop: 80 }}>
          {/* <Route component={Navbar} /> */}
          <Switch>
            <Route exact path="/main">
              <Home />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route path="/fundationintro" exact>
              <FoundationIntro />
            </Route>
            <Route path="/serviceintro">
              <ServiceIntro />
            </Route>
            <Route path="/trustway">
              <TrustWay />
            </Route>
            <Route path="/trustsub">
              <TrustSub />
            </Route>
            <Route path="/trust">
              <Trust />
            </Route>
            <Route path="/contractlist">
              <ContractList />
            </Route>
            <Route path="/contractenroll">
              <ContractEnroll />
            </Route>
            <Route path="/contract">
              <Contract />
            </Route>
            <Route path="/maintenancefeelist">
              <MaintenanceFeeList />
            </Route>
            <Route path="/maintenancefee">
              <MaintenanceFee />
            </Route>
            <Route path="/signmodified">
              <SignModified />
            </Route>
            <Route path="/withdrawal">
              <Withdrawal />
            </Route>
            <Route path="/signin">
              <SignIn {...token} />
            </Route>
            <Route path="/signup">
              <SignUp/>
            </Route>
            <Route path="/footer">
              <Footer />
            </Route>
            {/* <Route path="/signout">
                    <SignOut />
                </Route> */}
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default Main;
