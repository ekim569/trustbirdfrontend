import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import Navbar from "./component/Navbar/Navbar";

import Home from "./pages/main/Home";
import FoundationIntro from "./pages/main/FoundationIntro";
import ServiceIntro from "./pages/main/ServiceIntro";

import SignIn from "./pages/user/SignIn";
import SignUp from "./pages/user/SignUp";
import Userlist from "./pages/user/Userlist"
import SignModified from "./pages/user/SignModified";
import Membership from "./pages/user/Membership";
import Withdrawal from "./pages/user/Withdrawal";

import TrustWay from "./pages/trust/TrustWay";
import TrustSub from "./pages/trust/TrustSub";
import Trust from "./pages/trust/Trust";
import TrustList from "./pages/trust/TrustList";
import TrustList_admin from "./pages/trust/TrustListAdmin";
import Trustmodifeid from "./pages/trust/Trustmodified";

import ContractEnroll from "./pages/contract/ContractEnroll";
import Contract from "./pages/contract/Contract";
import ContractList from "./pages/contract/ContractList";
import Contractmodified from "./pages/contract/ContractModified";

import MaintenanceFee from "./pages/maintenanaceFee/MaintenanceFee";
import MaintenanceFeeList from "./pages/maintenanaceFee/MaintenanceFeeList";

import Footer from "./component/Footer";

const Main = (props) => {
  return (
    <div>
      <Router>
        <Navbar />
        <div style={{ marginTop: 80 }}>
          <Switch>
            {}
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/main" component={Home} />
            <Route exact path="/serviceintro" component={ServiceIntro} />
            <Route exact path="/fundationintro" component={FoundationIntro} />

            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signmodified" component={SignModified} />
            <Route exact path="/userlist/admin" component={Userlist} />
            <Route exact path="/membership" component={Membership} />
            <Route exact path="/withdrawal" component={Withdrawal} />

            <Route exact path="/trustway" component={TrustWay} />
            <Route exact path="/trustsub" component={TrustSub} />
            <Route exact path="/trust" component={Trust} />
            <Route exact path="/trustlist" component={TrustList} />
            <Route exact path="/trustlist/admin" component={TrustList_admin} />
            <Route exact path="/trustmodified" component={Trustmodifeid} />

            <Route exact path="/contractenroll" component={ContractEnroll} />
            <Route exact path="/contract" component={Contract} />
            <Route exact path="/contractlist" component={ContractList} />  
            <Route exact path="/contractmodified" component={Contractmodified} />            


            <Route exact path="/maintenancefee" component={MaintenanceFee} />
            <Route
              exact
              path="/maintenancefeelist"
              component={MaintenanceFeeList}
            />

            <Route exact path="/footer" component={Footer} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default Main;
