import { GENERAL_HTTP_RESPONSE_ERROR_MSG } from "../../bmd/constants/consts";
import BmdAuth from "../../bs/core/BmdAuth";
import BsCore2 from "../../bs/core/BsCore2";
import { showToastr } from "../../helpers/notifications/NotificationsHelper";



/** NAMES */
export const ON_READ_ORDER_RETURN = "ON_READ_ORDER_RETURN";



/** FUNCS */
export const onReadOrderReturn = (callBackData) => ({ type: ON_READ_ORDER_RETURN, callBackData: callBackData });



/** AJAX FUNCS */
export const readOrder = (data) => {

    const bmdAuth = BmdAuth.getInstance();

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/orders/show',
            params: { 
                bmdToken: bmdAuth?.bmdToken, 
                authProviderId: bmdAuth?.authProviderId,
                ...data.params
            },
            callBackFunc: (requestData, json) => {
                 const callBackData = { ...data, ...json };
                dispatch(onReadOrderReturn(callBackData));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                
                showToastr({ notificationType: 'error', message: GENERAL_HTTP_RESPONSE_ERROR_MSG });

                const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onReadOrderReturn(callBackData));
            }
        });
    };

};