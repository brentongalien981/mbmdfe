import { GENERAL_HTTP_RESPONSE_ERROR_MSG } from "../../bmd/constants/consts";
import BmdAuth from "../../bs/core/BmdAuth";
import BsCore2 from "../../bs/core/BsCore2";
import { showToastr } from "../../helpers/notifications/NotificationsHelper";



/** NAMES */
export const ON_READ_ORDER_RETURN = "ON_READ_ORDER_RETURN";
export const ON_UPDATE_ORDER_RETURN = "ON_UPDATE_ORDER_RETURN";
export const ON_SAVE_ORDER_RETURN = "ON_SAVE_ORDER_RETURN";
export const RESET_ORDER_REDUCER_FLAGS = "RESET_ORDER_REDUCER_FLAGS";
export const ON_SAVE_ORDER_ITEM_RETURN = "ON_SAVE_ORDER_ITEM_RETURN";
export const ON_ASSOCIATE_TO_PURCHASES_RETURN = "ON_ASSOCIATE_TO_PURCHASES_RETURN";



/** FUNCS */
export const onReadOrderReturn = (callBackData) => ({ type: ON_READ_ORDER_RETURN, callBackData: callBackData });
export const onUpdateOrderReturn = (callBackData) => ({ type: ON_UPDATE_ORDER_RETURN, callBackData: callBackData });
export const onSaveOrderReturn = (callBackData) => ({ type: ON_SAVE_ORDER_RETURN, callBackData: callBackData });
export const resetOrderReducerFlags = (callBackData) => ({ type: RESET_ORDER_REDUCER_FLAGS, callBackData: callBackData });
export const onSaveOrderItemReturn = (callBackData) => ({ type: ON_SAVE_ORDER_ITEM_RETURN, callBackData: callBackData });
export const onAssociateToPurchasesReturn = (callBackData) => ({ type: ON_ASSOCIATE_TO_PURCHASES_RETURN, callBackData: callBackData });



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



export const saveOrder = (data) => {

    const bmdAuth = BmdAuth.getInstance();

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/orders/store',
            method: 'post',
            params: { 
                bmdToken: bmdAuth?.bmdToken, 
                authProviderId: bmdAuth?.authProviderId,
                ...data.params
            },
            callBackFunc: (requestData, json) => {
                showToastr({ notificationType: 'success', message: 'Creation successful!' });
                 const callBackData = { ...data, ...json };
                dispatch(onSaveOrderReturn(callBackData));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                
                showToastr({ notificationType: 'error', message: GENERAL_HTTP_RESPONSE_ERROR_MSG });

                const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onSaveOrderReturn(callBackData));
            }
        });
    };
};



export const saveOrderItem = (data) => {

    const bmdAuth = BmdAuth.getInstance();

    return (dispatch) => {

        let url = '/order-items/store' ;
        if (data.localParams.orderItemFormAction === 'edit') {
            url = '/order-items/update';
        }


        BsCore2.ajaxCrud({
            url: url,
            method: 'post',
            params: { 
                bmdToken: bmdAuth?.bmdToken, 
                authProviderId: bmdAuth?.authProviderId,
                ...data.params
            },
            callBackFunc: (requestData, json) => {
                showToastr({ notificationType: 'success', message: 'Item saved.' });
                 const callBackData = { ...data, ...json };
                dispatch(onSaveOrderItemReturn(callBackData));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onSaveOrderItemReturn(callBackData));
            }
        });
    };
};



export const associateToPurchases = (data) => {

    const bmdAuth = BmdAuth.getInstance();

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/order-items/associateToPurchases',
            method: 'post',
            params: { 
                bmdToken: bmdAuth?.bmdToken, 
                authProviderId: bmdAuth?.authProviderId,
                ...data.params
            },
            callBackFunc: (requestData, json) => {
                 const callBackData = { ...data, ...json };
                dispatch(onAssociateToPurchasesReturn(callBackData));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onAssociateToPurchasesReturn(callBackData));
            }
        });
    };
};