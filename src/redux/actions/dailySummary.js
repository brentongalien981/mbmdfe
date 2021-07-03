import BmdAuth from "../../bs/core/BmdAuth";
import BsCore2 from "../../bs/core/BsCore2";



/** NAMES */
export const ON_READ_DAILY_SUMMARY_DATA_RETURN = "ON_READ_DAILY_SUMMARY_DATA_RETURN";



/** FUNCS */
export const onReadDailySummaryDataReturn = (callBackData) => ({ type: ON_READ_DAILY_SUMMARY_DATA_RETURN, callBackData: callBackData });



/** AJAX FUNCS */
export const readDailySummaryData = (data) => {

    const bmdAuth = BmdAuth.getInstance();

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/daily-summary/readDailySummaryData',
            params: { bmdToken: bmdAuth?.bmdToken, authProviderId: bmdAuth?.authProviderId },
            callBackFunc: (requestData, json) => {
                 const callBackData = { ...data, ...json };
                dispatch(onReadDailySummaryDataReturn(callBackData));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onReadDailySummaryDataReturn(callBackData));
            }
        });
    };

};