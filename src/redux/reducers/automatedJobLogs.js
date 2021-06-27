import * as actions from "../actions/automatedJobLogs";

/** DEFAULTS */



/** CONSTANTS */



/** INITIAL STATE */
const initialState = {
    logs: []
};



/** REDUCER */
const automatedJobLogs = (state = initialState, action) => {
    switch (action.type) {
        case actions.ON_READ_LOGS_RETURN: return onReadLogsReturn(state, action);
        default: return state;
    }
}



/** HELPER FUNCS */



/** NORMAL FUNCS */
const onReadLogsReturn = (state, action) => {

    action.callBackData.doCallBackFunc();

    return {
        ...state,
        logs: action.callBackData.objs.logs ?? []
    };
};



export default automatedJobLogs;