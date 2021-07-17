import BsCore2 from "../../bs/core/BsCore2";
import * as actions from "../actions/dailySummary";

/** DEFAULTS */
const DEFAULT_FINANCE_GRAPH_DATA = {
    revenuesByPeriod: [],
    expensesByPeriod: [],
    graphFilterSelectedPeriod: 'daily',
    dateSpanStartDate: '',
    dateSpanEndDate: ''
};



/** CONSTANTS */



/** INITIAL STATE */
const initialState = {
    numOfOrders: 0,
    numOfOrderItems: 0,
    numOfIncompleteOrders: 0,
    revenue: 0.0,
    expenses: 0.0,
    financeGraphData: { ...DEFAULT_FINANCE_GRAPH_DATA }
};



/** REDUCER */
const dailySummary = (state = initialState, action) => {
    switch (action.type) {
        case actions.ON_READ_DAILY_SUMMARY_DATA_RETURN: return onReadDailySummaryDataReturn(state, action);
        case actions.ON_READ_FINANCE_GRAPH_DATA_RETURN: return onReadFinanceGraphDataReturn(state, action);
        default: return state;
    }
}



/** HELPER FUNCS */
const prepareFinanceGraphData = (callBackData) => {
    return {
        revenuesByPeriod: callBackData.objs.financeGraphData.revenuesByPeriod,
        expensesByPeriod: callBackData.objs.financeGraphData.expensesByPeriod,
        graphFilterSelectedPeriod: callBackData.localParams.graphFilterSelectedPeriod,
        dateSpanStartDate: callBackData.params.graphStartDate,
        dateSpanEndDate: callBackData.params.graphEndDate
    };
};



/** NORMAL FUNCS */
const onReadDailySummaryDataReturn = (state, action) => {

    const isResultOk = action.callBackData.isResultOk;

    if (!isResultOk) {
        BsCore2.alertForCallBackDataErrors(action.callBackData);
    }

    action.callBackData.doCallBackFunc();


    let financeGraphData = state.financeGraphData;

    if (action.callBackData.params.shouldIncludeFinanceGraphData && action.callBackData.objs?.financeGraphData) {
        financeGraphData = prepareFinanceGraphData(action.callBackData);
    }


    return {
        ...state,
        numOfOrders: isResultOk ? action.callBackData.objs.numOfOrders : 0,
        numOfOrderItems: isResultOk ? action.callBackData.objs.numOfOrderItems : 0,
        numOfIncompleteOrders: isResultOk ? action.callBackData.objs.numOfIncompleteOrders : 0,
        revenue: isResultOk ? action.callBackData.objs.revenue : 0.0,
        expenses: isResultOk ? action.callBackData.objs.expenses : 0.0,
        financeGraphData: financeGraphData
    };
};



const onReadFinanceGraphDataReturn = (state, action) => {

    const isResultOk = action.callBackData.isResultOk;

    if (!isResultOk) {
        BsCore2.alertForCallBackDataErrors(action.callBackData);
    }

    action.callBackData.doCallBackFunc();

    return {
        ...state
    };
};



export default dailySummary;