import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppStateManager from "../bs/helpers/AppStateManager";

// import DashboardLayout from "../layouts/Dashboard";

import ScrollToTop from "../components/ScrollToTop";
import TestContainerA from "../containers/my-test/TestContainerA";
import MBMDFELayoutA from "../layouts/MBMDFELayoutA";


const DailySummary = React.lazy(() => import('../containers/daily-summary/DailySummary'));
const Signin = React.lazy(() => import('../containers/auth/Signin'));


const MBMDFERoutes = () => (
    <Router>
        <AppStateManager />
        <ScrollToTop>
            <MBMDFELayoutA>
                <Switch>
                    <Route path="/" exact render={() => <Suspense fallback={<div>loading...</div>}><DailySummary /></Suspense>} />
                    <Route path="/daily-summary" exact render={() => <Suspense fallback={<div>loading...</div>}><DailySummary /></Suspense>} />

                    <Route path="/signin" exact render={() => <Suspense fallback={<div>loading...</div>}><Signin /></Suspense>} />

                    <Route path="/testcontainer-a" component={TestContainerA} />
                </Switch>
            </MBMDFELayoutA>


        </ScrollToTop>
    </Router>
);

export default MBMDFERoutes;
