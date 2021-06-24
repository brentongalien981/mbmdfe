// import * as actions from '../actions/xxxactions';

import * as actions from "../actions/automatedJobs";


/** DEFAULTS */



/** CONSTANTS */



/** INITIAL STATE */
const initialState = {
    automatedJobs: []
};



/** REDUCER */
const automatedJobs = (state = initialState, action) => {
    switch (action.type) {
        case actions.ON_READ_AUTOMATED_JOBS_RETURN: return onReadAutomatedJobsReturn(state, action);
        default: return state;
    }
}



/** HELPER FUNCS */



/** NORMAL FUNCS */
const onReadAutomatedJobsReturn = (state, action) => {
    return {
        ...state,
        automatedJobs: action.callBackData.isResultOk ? action.callBackData.objs.automatedJobs : []
    };
};



export default automatedJobs;