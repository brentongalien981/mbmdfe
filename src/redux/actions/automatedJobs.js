import BmdAuth from "../../bs/core/BmdAuth";
import BsCore2 from "../../bs/core/BsCore2";



/** NAMES */
export const ON_READ_AUTOMATED_JOBS_RETURN = "ON_READ_AUTOMATED_JOBS_RETURN";



/** FUNCS */
export const onReadAutomatedJobsReturn = (callBackData) => ({ type: ON_READ_AUTOMATED_JOBS_RETURN, callBackData: callBackData });



/** AJAX FUNCS */
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