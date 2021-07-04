import * as actions from "../actions/dailySummary";

/** DEFAULTS */



/** CONSTANTS */



/** INITIAL STATE */
const initialState = {
    numOfOrders: 0,
    numOfOrderItems: 0,
    numOfIncompleteOrders: 0,
    revenue: 0.0,
    expenses: 0.0
};



/** REDUCER */
const dailySummary = (state = initialState, action) => {
    switch (action.type) {
        case actions.ON_READ_DAILY_SUMMARY_DATA_RETURN: return onReadDailySummaryDataReturn(state, action);
        default: return state;
    }
}



/** HELPER FUNCS */



/** NORMAL FUNCS */
const onReadDailySummaryDataReturn = (state, action) => {

    const isResultOk = action.callBackData.isResultOk;

    action.callBackData.doCallBackFunc();

    return {
        ...state,
        numOfOrders: isResultOk ? action.callBackData.objs.numOfOrders : 0,
        numOfOrderItems: isResultOk ? action.callBackData.objs.numOfOrderItems : 0,
        numOfIncompleteOrders: isResultOk ? action.callBackData.objs.numOfIncompleteOrders : 0,
        revenue: isResultOk ? action.callBackData.objs.revenue : 0.0,
        expenses: isResultOk ? action.callBackData.objs.expenses : 0.0
    };
};



export default dailySummary;