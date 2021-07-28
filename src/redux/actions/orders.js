import { GENERAL_HTTP_RESPONSE_ERROR_MSG } from "../../bmd/constants/consts";
import BmdAuth from "../../bs/core/BmdAuth";
import BsCore2 from "../../bs/core/BsCore2";
import { showToastr } from "../../helpers/notifications/NotificationsHelper";



/** NAMES */
export const ON_READ_ORDERS_RETURN = "ON_READ_ORDERS_RETURN";
export const ON_READ_ORDER_STATUSES_RETURN = "ON_READ_ORDER_STATUSES_RETURN";



/** FUNCS */
export const onReadOrdersReturn = (callBackData) => ({ type: ON_READ_ORDERS_RETURN, callBackData: callBackData });
export const onReadOrderStatusesReturn = (callBackData) => ({ type: ON_READ_ORDER_STATUSES_RETURN, callBackData: callBackData });



/** AJAX FUNCS */
export const readOrders = (data) => {

    const bmdAuth = BmdAuth.getInstance();

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/orders',
            params: {
                bmdToken: bmdAuth?.bmdToken,
                authProviderId: bmdAuth?.authProviderId,
                ...data.params
            },
            callBackFunc: (requestData, json) => {
                const callBackData = { ...data, ...json };
                dispatch(onReadOrdersReturn(callBackData));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {

                showToastr({ notificationType: 'error', message: GENERAL_HTTP_RESPONSE_ERROR_MSG });

                const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onReadOrdersReturn(callBackData));
            }
        });
    };

};



export const readOrderStatuses = () => {

    const bmdAuth = BmdAuth.getInstance();

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/order-statuses',
            params: {
                bmdToken: bmdAuth?.bmdToken,
                authProviderId: bmdAuth?.authProviderId
            },
            callBackFunc: (requestData, json) => {
                const callBackData = { ...json };
                dispatch(onReadOrderStatusesReturn(callBackData));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                const callBackData = { errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onReadOrderStatusesReturn(callBackData));
            }
        });
    };

};