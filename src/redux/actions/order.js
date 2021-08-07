import { GENERAL_HTTP_RESPONSE_ERROR_MSG } from "../../bmd/constants/consts";
import BmdAuth from "../../bs/core/BmdAuth";
import BsCore2 from "../../bs/core/BsCore2";
import { showToastr } from "../../helpers/notifications/NotificationsHelper";



/** NAMES */
export const ON_READ_ORDER_RETURN = "ON_READ_ORDER_RETURN";
export const ON_UPDATE_ORDER_RETURN = "ON_UPDATE_ORDER_RETURN";
export const ON_GET_CREATE_ORDER_DATA_RETURN = "ON_GET_CREATE_ORDER_DATA_RETURN";



/** FUNCS */
export const onReadOrderReturn = (callBackData) => ({ type: ON_READ_ORDER_RETURN, callBackData: callBackData });
export const onUpdateOrderReturn = (callBackData) => ({ type: ON_UPDATE_ORDER_RETURN, callBackData: callBackData });
export const onGetCreateOrderDataReturn = (callBackData) => ({ type: ON_GET_CREATE_ORDER_DATA_RETURN, callBackData: callBackData });



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



export const updateOrder = (data) => {

    const bmdAuth = BmdAuth.getInstance();

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/orders/update',
            method: 'post',
            params: { 
                bmdToken: bmdAuth?.bmdToken, 
                authProviderId: bmdAuth?.authProviderId,
                ...data.params
            },
            callBackFunc: (requestData, json) => {
                showToastr({ notificationType: 'success', message: 'Update successful!' });
                 const callBackData = { ...data, ...json };
                dispatch(onUpdateOrderReturn(callBackData));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                
                showToastr({ notificationType: 'error', message: GENERAL_HTTP_RESPONSE_ERROR_MSG });

                const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onUpdateOrderReturn(callBackData));
            }
        });
    };

};



export const getCreateOrderData = (data = {}) => {

    const bmdAuth = BmdAuth.getInstance();

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/orders/create',
            params: { 
                bmdToken: bmdAuth?.bmdToken, 
                authProviderId: bmdAuth?.authProviderId,
                ...data.params
            },
            callBackFunc: (requestData, json) => {
                 const callBackData = { ...data, ...json };
                dispatch(onGetCreateOrderDataReturn(callBackData));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                
                showToastr({ notificationType: 'error', message: GENERAL_HTTP_RESPONSE_ERROR_MSG });

                const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onGetCreateOrderDataReturn(callBackData));
            }
        });
    };

};