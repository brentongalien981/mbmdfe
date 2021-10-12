import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppStateManager from "../bs/helpers/AppStateManager";

// import DashboardLayout from "../layouts/Dashboard";

import ScrollToTop from "../components/ScrollToTop";
import TestContainerA from "../containers/my-test/TestContainerA";
import MBMDFEAuthLayout from "../layouts/MBMDFEAuthLayout";
import MBMDFELayoutA from "../layouts/MBMDFELayoutA";

const PageNotFound = React.lazy(() => import('../pages/auth/Page404'));

const DailySummary = React.lazy(() => import('../containers/daily-summary/DailySummary'));
const Signin = React.lazy(() => import('../containers/auth/Signin'));
const CreateUser = React.lazy(() => import('../containers/user/CreateUser'));
const AutomatedJobs = React.lazy(() => import('../containers/automated-jobs/AutomatedJobs'));
const AutomatedJobLogs = React.lazy(() => import('../containers/automated-job-logs/AutomatedJobLogs'));

const Orders = React.lazy(() => import('../containers/orders/Orders'));
const Order = React.lazy(() => import('../containers/order/Order'));
const CreateOrder = React.lazy(() => import('../containers/order/CreateOrder'));

const Purchases = React.lazy(() => import('../containers/purchases/Purchases'));
const Purchase = React.lazy(() => import('../containers/purchase/Purchase'));
const CreatePurchase = React.lazy(() => import('../containers/purchase/CreatePurchase'));

const CreateDispatch = React.lazy(() => import('../containers/dispatches/CreateDispatch'));
const Dispatch = React.lazy(() => import('../containers/dispatches/Dispatch'));
const Dispatches = React.lazy(() => import('../containers/dispatches/Dispatches'));



const MBMDFERoutes = () => (
    <Router>
        <AppStateManager />
        <ScrollToTop>

            <Switch>


                <Route path="/" exact render={() => <MBMDFELayoutA><Suspense fallback={<div>loading...</div>}><DailySummary /></Suspense></MBMDFELayoutA>} />
                <Route path="/daily-summary" exact render={() => <MBMDFELayoutA><Suspense fallback={<div>loading...</div>}><DailySummary /></Suspense></MBMDFELayoutA>} />
                <Route path="/users/create" exact render={() => <MBMDFELayoutA><Suspense fallback={<div>loading...</div>}><CreateUser /></Suspense></MBMDFELayoutA>} />

                <Route path="/automated-jobs" exact render={() => <MBMDFELayoutA><Suspense fallback={<div>loading...</div>}><AutomatedJobs /></Suspense></MBMDFELayoutA>} />
                <Route path="/automated-job-logs" render={() => <MBMDFELayoutA><Suspense fallback={<div>loading...</div>}><AutomatedJobLogs /></Suspense></MBMDFELayoutA>} />

                <Route path="/orders" exact render={() => <MBMDFELayoutA><Suspense fallback={<div>loading...</div>}><Orders /></Suspense></MBMDFELayoutA>} />
                <Route path="/orders/create" exact render={() => <MBMDFELayoutA><Suspense fallback={<div>loading...</div>}><CreateOrder /></Suspense></MBMDFELayoutA>} />
                <Route path="/orders/:id" exact render={() => <MBMDFELayoutA><Suspense fallback={<div>loading...</div>}><Order /></Suspense></MBMDFELayoutA>} />

                <Route path="/purchases" exact render={() => <MBMDFELayoutA><Suspense fallback={<div>loading...</div>}><Purchases /></Suspense></MBMDFELayoutA>} />
                <Route path="/purchases/create" exact render={() => <MBMDFELayoutA><Suspense fallback={<div>loading...</div>}><CreatePurchase /></Suspense></MBMDFELayoutA>} />
                <Route path="/purchases/:id" exact render={() => <MBMDFELayoutA><Suspense fallback={<div>loading...</div>}><Purchase /></Suspense></MBMDFELayoutA>} />

                <Route path="/dispatches" exact render={() => <MBMDFELayoutA><Suspense fallback={<div>loading...</div>}><Dispatches /></Suspense></MBMDFELayoutA>} />
                <Route path="/dispatches/create" exact render={() => <MBMDFELayoutA><Suspense fallback={<div>loading...</div>}><CreateDispatch /></Suspense></MBMDFELayoutA>} />
                <Route path="/dispatches/:id" exact render={() => <MBMDFELayoutA><Suspense fallback={<div>loading...</div>}><Dispatch /></Suspense></MBMDFELayoutA>} />

                {/* BMD-ON-STAGING: Comment-out. */}
                <Route path="/testcontainer-a" exact render={() => <MBMDFELayoutA><TestContainerA /></MBMDFELayoutA>} />
                {/* <Route path="/xxx" component={TestContainerA} /> */}


                <Route path="/signin" exact render={() => <MBMDFEAuthLayout><Suspense fallback={<div>loading...</div>}><Signin /></Suspense></MBMDFEAuthLayout>} />

                <Route path="/" render={() => <MBMDFELayoutA><Suspense fallback={<div>loading...</div>}><PageNotFound /></Suspense></MBMDFELayoutA>} />
            </Switch>



        </ScrollToTop>
    </Router>
);

export default MBMDFERoutes;
