import BmdAuth from "../../bs/core/BmdAuth";
import BsCore2 from "../../bs/core/BsCore2";



/** NAMES */
export const ON_READ_LOGS_RETURN = "ON_READ_LOGS_RETURN";



/** FUNCS */
export const onReadLogsReturn = (callBackData) => ({ type: ON_READ_LOGS_RETURN, callBackData: callBackData });



/** AJAX FUNCS */
export const readLogs = (data) => {

    const bmdAuth = BmdAuth.getInstance();

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/automated-job-logs/read',
            params: { bmdToken: bmdAuth?.bmdToken, authProviderId: bmdAuth?.authProviderId, ...data.params },
            callBackFunc: (requestData, json) => {
                 const callBackData = { ...data, ...json };
                dispatch(onReadLogsReturn(callBackData));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onReadLogsReturn(callBackData));
            }
        });
    };

};