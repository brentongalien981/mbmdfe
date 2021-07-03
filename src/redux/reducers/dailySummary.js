import * as actions from "../actions/dailySummary";

/** DEFAULTS */



/** CONSTANTS */



/** INITIAL STATE */
const initialState = {
    msg: ''
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

    action.callBackData.doCallBackFunc();

    return {
        ...state
    };
};



export default dailySummary;