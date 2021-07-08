import BsCore2 from "../../bs/core/BsCore2";
import { RESULT_CODE_COMMAND_DOES_NOT_EXIST, RESULT_CODE_COMMAND_UNAVAILABLE } from "../../containers/automated-jobs/constants/consts";
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
        case actions.ON_EXECUTE_JOB_RETURN: return onExecuteJobReturn(state, action);
        case actions.ON_READ_AUTOMATED_JOBS_RETURN: return onReadAutomatedJobsReturn(state, action);
        case actions.ON_RESET_JOB_STATUS_RETURN: return onResetJobStatusReturn(state, action);
        default: return state;
    }
}



/** HELPER FUNCS */



/** NORMAL FUNCS */
const onResetJobStatusReturn = (state, action) => {

    if (!action.callBackData.isResultOk) {
        BsCore2.alertForCallBackDataErrors(action.callBackData);
    }

    action.callBackData.doCallBackFunc();

    return {
        ...state
    };
};



const onExecuteJobReturn = (state, action) => {

    if (!action.callBackData.isResultOk) {
        switch (action.callBackData.resultCode) {
            case RESULT_CODE_COMMAND_DOES_NOT_EXIST:
                alert('Command does not exist.')
                break;
            case RESULT_CODE_COMMAND_UNAVAILABLE:
                alert('Command is not available.')
                break;
            default:
                BsCore2.alertForCallBackDataErrors(action.callBackData);
                break;
        }
    }

    if (action.callBackData.doCallBackFunc) {
        action.callBackData.doCallBackFunc(action.callBackData.isResultOk);
    }
    

    return {
        ...state
    };
};




const onReadAutomatedJobsReturn = (state, action) => {

    if (!action.callBackData.isResultOk) {
        BsCore2.alertForCallBackDataErrors(action.callBackData);
    }

    action.callBackData.doCallBackFunc();

    return {
        ...state,
        automatedJobs: action.callBackData?.isResultOk ? action.callBackData.objs.automatedJobs : []
    };
};



export default automatedJobs;