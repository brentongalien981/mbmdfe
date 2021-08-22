import { combineReducers } from "redux";

import sidebar from "./sidebarReducers";
import layout from "./layoutReducer";
import theme from "./themeReducer";
import user from "./user";
import auth from "./auth";
import automatedJobs from "./automatedJobs";
import automatedJobLogs from "./automatedJobLogs";
import dailySummary from "./dailySummary";
import orders from "./orders";
import order from "./order";
import purchases from "./purchases";
import purchase from "./purchase";

import { reducer as toastr } from "react-redux-toastr";

export default combineReducers({
  sidebar,
  layout,
  theme,
  toastr,

  user,
  auth,
  automatedJobs,
  automatedJobLogs,
  dailySummary,
  orders,
  order,
  purchases,
  purchase
});
