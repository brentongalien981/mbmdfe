import BmdAuth from "../../bs/core/BmdAuth";
import BsCore2 from "../../bs/core/BsCore2";
import { showToastr } from "../../helpers/notifications/NotificationsHelper";



/** NAMES */
export const ON_READ_AUTOMATED_JOBS_RETURN = "ON_READ_AUTOMATED_JOBS_RETURN";
export const ON_EXECUTE_JOB_RETURN = "ON_EXECUTE_JOB_RETURN";
export const ON_RESET_JOB_STATUS_RETURN = "ON_RESET_JOB_STATUS_RETURN";



/** FUNCS */
export const onReadAutomatedJobsReturn = (callBackData) => ({ type: ON_READ_AUTOMATED_JOBS_RETURN, callBackData: callBackData });
export const onExecuteJobReturn = (callBackData) => ({ type: ON_EXECUTE_JOB_RETURN, callBackData: callBackData });
export const onResetJobStatusReturn = (callBackData) => ({ type: ON_RESET_JOB_STATUS_RETURN, callBackData: callBackData });




/** AJAX FUNCS */
export const resetJobStatus = (data) => {

    const bmdAuth = BmdAuth.getInstance();

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/automated-jobs/resetJobStatus',
            method: 'post',
            params: {
                bmdToken: bmdAuth?.bmdToken, authProviderId: bmdAuth?.authProviderId,
                ...data.params
            },
            callBackFunc: (requestData, json) => {
                const callBackData = { ...data, ...json };
                if (callBackData.isResultOk) {
                    showToastr({ message: 'Automated Job has been reset.' });
                }
                dispatch(onResetJobStatusReturn(callBackData));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onResetJobStatusReturn(callBackData));
            }
        });
    };

};



export const executeJob = (data) => {

    const bmdAuth = BmdAuth.getInstance();

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/automated-jobs/execute',
            method: 'post',
            params: {
                bmdToken: bmdAuth?.bmdToken, authProviderId: bmdAuth?.authProviderId,
                ...data.params
            },
            callBackFunc: (requestData, json) => {
                const callBackData = { ...data, ...json };
                if (callBackData.isResultOk) {
                    showToastr({ message: 'Automated Job has been executed in the background.' });
                }
                dispatch(onExecuteJobReturn(callBackData));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onExecuteJobReturn(callBackData));
            }
        });
    };

};




export const readAutomatedJobs = () => {

    const bmdAuth = BmdAuth.getInstance();

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/automated-jobs',
            params: { bmdToken: bmdAuth?.bmdToken, authProviderId: bmdAuth?.authProviderId },
            callBackFunc: (requestData, json) => {
                const callBackData = { ...json };
                dispatch(onReadAutomatedJobsReturn(callBackData));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                const callBackData = { errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onReadAutomatedJobsReturn(callBackData));
            }
        });
    };

};