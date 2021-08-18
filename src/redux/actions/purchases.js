import { GENERAL_HTTP_RESPONSE_ERROR_MSG } from "../../bmd/constants/consts";
import BmdAuth from "../../bs/core/BmdAuth";
import BsCore2 from "../../bs/core/BsCore2";
import { showToastr } from "../../helpers/notifications/NotificationsHelper";



/** NAMES */
export const ON_READ_PURCHASES_RETURN = "ON_READ_PURCHASES_RETURN";



/** FUNCS */
export const onReadPurchasesReturn = (callBackData) => ({ type: ON_READ_PURCHASES_RETURN, callBackData: callBackData });



/** AJAX FUNCS */
export const readPurchases = (data) => {

    const bmdAuth = BmdAuth.getInstance();

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/purchases',
            params: {
                bmdToken: bmdAuth?.bmdToken,
                authProviderId: bmdAuth?.authProviderId,
                ...data.params
            },
            callBackFunc: (requestData, json) => {
                const callBackData = { ...data, ...json };
                dispatch(onReadPurchasesReturn(callBackData));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {

                showToastr({ notificationType: 'error', message: GENERAL_HTTP_RESPONSE_ERROR_MSG });

                const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onReadPurchasesReturn(callBackData));
            }
        });
    };

};