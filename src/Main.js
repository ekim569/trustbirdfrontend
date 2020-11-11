import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import Navbar from "./component/Navbar/Navbar";

import Home from "./pages/main/Home";
import FoundationIntro from "./pages/main/FoundationIntro";
import ServiceIntro from "./pages/main/ServiceIntro";

import SignIn from "./pages/user/SignIn";
import SignUp from "./pages/user/SignUp";
import Userlist from "./pages/user/Userlist";
import SignModified from "./pages/user/SignModified";
import Membership from "./pages/user/Membership";
import Withdrawal from "./pages/user/Withdrawal";
import CreateUser from "./pages/user/CreateUser";
import MembershipAdmin from "./pages/user/MembershipAdmin";
import BalanceAdmin from "./pages/user/BalanceAdmin";
import Transfer from "./pages/user/Transfer"

import TrustWay from "./pages/trust/TrustWay";
import TrustSub from "./pages/trust/TrustSub";
import Trust from "./pages/trust/Trust";
import TrustList from "./pages/trust/TrustList";
import TrustListAdmin from "./pages/trust/TrustListAdmin";
import TrustModified from "./pages/trust/TrustModified";

import ContractEnroll from "./pages/contract/ContractEnroll";
import Contract from "./pages/contract/Contract";
import ContractList from "./pages/contract/ContractList";
import ContractModified from "./pages/contract/ContractModified";

import MaintenanceFee from "./pages/maintenanaceFee/MaintenanceFee";
import MaintenanceFeeInput from "./pages/maintenanaceFee/MaintenanceFeeInput";
import MaintenanceFeeModified from "./pages/maintenanaceFee/MaintenanceFeeModified";
import MaintenanceFeeList from "./pages/maintenanaceFee/MaintenanceFeeList";
import MaintenanceFeeListAdmin from "./pages/maintenanaceFee/MaintenanceFeeListAdmin";

import RecentTrustList from "./pages/user/RecentTrustList"
import Footer from "./component/Footer";


const Main = (props) => {
  return (
    <div>
      <Router>
        <Navbar />
        <div style={{ marginTop: 80 }}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/serviceintro" component={ServiceIntro} />
            <Route exact path="/fundationintro" component={FoundationIntro} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signmodified" component={SignModified} />
            <Route exact path="/userlist/admin" component={Userlist} />
            <Route exact path="/membership" component={Membership} />
            <Route exact path="/withdrawal" component={Withdrawal} />
            <Route exact path="/createuser/admin" component={CreateUser} />

            <Route exact path="/trustway" component={TrustWay} />
            <Route exact path="/trustsub" component={TrustSub} />
            <Route exact path="/trust" component={Trust} />
            <Route exact path="/trustlist" component={TrustList} />
            <Route exact path="/trustlist/admin" component={TrustListAdmin} />
            <Route exact path="/trustmodified" component={TrustModified} />

            <Route exact path="/contractenroll/admin" component={ContractEnroll} />
            <Route exact path="/contract" component={Contract} />
            <Route exact path="/contractlist/admin" component={ContractList} />
            <Route exact path="/contractmodified/admin" component={ContractModified} />

            <Route exact path="/maintenancefee" component={MaintenanceFee} />
            <Route exact path="/maintenancefeelist" component={MaintenanceFeeList}/>
            <Route exact path="/maintenancefeeinput/admin" component={MaintenanceFeeInput} />
            <Route exact path="/maintenancefeemodified/admin" component={MaintenanceFeeModified} />
            <Route exact path="/maintenancefeelist/admin"  component={MaintenanceFeeListAdmin} />

            <Route exact path="/recenttrustlist" component={RecentTrustList} />
            <Route exact path="/transfer" component={Transfer} />
            <Route exact path="/membership/admin" component={MembershipAdmin} />
            <Route exact path="/balance/admin" component={BalanceAdmin} />
            <Route exact path="/footer" component={Footer} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default Main;
