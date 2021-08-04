import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppStateManager from "../bs/helpers/AppStateManager";

// import DashboardLayout from "../layouts/Dashboard";

import ScrollToTop from "../components/ScrollToTop";
import TestContainerA from "../containers/my-test/TestContainerA";
import MBMDFEAuthLayout from "../layouts/MBMDFEAuthLayout";
import MBMDFELayoutA from "../layouts/MBMDFELayoutA";


const DailySummary = React.lazy(() => import('../containers/daily-summary/DailySummary'));
const Signin = React.lazy(() => import('../containers/auth/Signin'));
const CreateUser = React.lazy(() => import('../containers/user/CreateUser'));
const AutomatedJobs = React.lazy(() => import('../containers/automated-jobs/AutomatedJobs'));
const AutomatedJobLogs = React.lazy(() => import('../containers/automated-job-logs/AutomatedJobLogs'));
const Orders = React.lazy(() => import('../containers/orders/Orders'));
const Order = React.lazy(() => import('../containers/order/Order'));



const MBMDFERoutes = () => (
    <Router>
        <AppStateManager />
        <ScrollToTop>

            <Switch>


                <Route path="/" exact render={() => <MBMDFELayoutA><Suspense fallback={<div>loading...</div>}><DailySummary /></Suspense></MBMDFELayoutA>} />
                <Route path="/daily-summary" exact render={() => <MBMDFELayoutA><Suspense fallback={<div>loading...</div>}><DailySummary /></Suspense></MBMDFELayoutA>} />
                <Route path="/testcontainer-a" render={() => <MBMDFELayoutA><TestContainerA /></MBMDFELayoutA>} />
                <Route path="/users/create" exact render={() => <MBMDFELayoutA><Suspense fallback={<div>loading...</div>}><CreateUser /></Suspense></MBMDFELayoutA>} />

                <Route path="/automated-jobs" exact render={() => <MBMDFELayoutA><Suspense fallback={<div>loading...</div>}><AutomatedJobs /></Suspense></MBMDFELayoutA>} />
                <Route path="/automated-job-logs" render={() => <MBMDFELayoutA><Suspense fallback={<div>loading...</div>}><AutomatedJobLogs /></Suspense></MBMDFELayoutA>} />

                <Route path="/orders" exact render={() => <MBMDFELayoutA><Suspense fallback={<div>loading...</div>}><Orders /></Suspense></MBMDFELayoutA>} />
                <Route path="/orders/:id" exact render={() => <MBMDFELayoutA><Suspense fallback={<div>loading...</div>}><Order /></Suspense></MBMDFELayoutA>} />
                {/* <Route path="/xxx" component={TestContainerA} /> */}


                <Route path="/signin" exact render={() => <MBMDFEAuthLayout><Suspense fallback={<div>loading...</div>}><Signin /></Suspense></MBMDFEAuthLayout>} />
            </Switch>



        </ScrollToTop>
    </Router>
);

export default MBMDFERoutes;
