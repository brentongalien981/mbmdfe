import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import DashboardLayout from "../layouts/Dashboard";

import ScrollToTop from "../components/ScrollToTop";
import TestContainerA from "../containers/my-test/TestContainerA";
import MBMDFELayoutA from "../layouts/MBMDFELayoutA";



const MBMDFERoutes = () => (
    <Router>
        <ScrollToTop>
            <MBMDFELayoutA>
                <Switch>
                    <Route path="/" exact render={() => (<h2>Default</h2>)} />
                    <Route path="/testcontainer-a" component={TestContainerA} />
                </Switch>
            </MBMDFELayoutA>


        </ScrollToTop>
    </Router>
);

export default MBMDFERoutes;
