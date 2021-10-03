import BmdAuth from "../../bs/core/BmdAuth";
import BsCore2 from "../../bs/core/BsCore2";
import { showToastr } from "../../helpers/notifications/NotificationsHelper";

/** NAMES */
export const RESET_CREATE_DISPATCH_FLAGS = "RESET_CREATE_DISPATCH_FLAGS";
export const ON_SAVE_DISPATCH_RETURN = "ON_SAVE_DISPATCH_RETURN";
export const ON_READ_DISPATCH_STATUSES_RETURN = "ON_READ_DISPATCH_STATUSES_RETURN";
export const ON_READ_DISPATCHES_RETURN = "ON_READ_DISPATCHES_RETURN";
export const ON_READ_DISPATCH_RETURN = "ON_READ_DISPATCH_RETURN";
export const ON_REMOVE_ORDER_FROM_DISPATCH_RETURN = "ON_REMOVE_ORDER_FROM_DISPATCH_RETURN";



/** FUNCS */
export const resetCreateDispatchFlags = (callBackData) => ({ type: RESET_CREATE_DISPATCH_FLAGS, callBackData: callBackData });
export const onSaveDispatchReturn = (callBackData) => ({ type: ON_SAVE_DISPATCH_RETURN, callBackData: callBackData });
export const onReadDispatchStatusesReturn = (callBackData) => ({ type: ON_READ_DISPATCH_STATUSES_RETURN, callBackData: callBackData });
export const onReadDispatchesReturn = (callBackData) => ({ type: ON_READ_DISPATCHES_RETURN, callBackData: callBackData });
export const onReadDispatchReturn = (callBackData) => ({ type: ON_READ_DISPATCH_RETURN, callBackData: callBackData });
export const onRemoveOrderFromDispatchReturn = (callBackData) => ({ type: ON_REMOVE_ORDER_FROM_DISPATCH_RETURN, callBackData: callBackData });



/** AJAX FUNCS */
export const saveDispatch = (data) => {

    const bmdAuth = BmdAuth.getInstance();

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/dispatches/store',
            method: 'post',
            params: {
                bmdToken: bmdAuth?.bmdToken,
                authProviderId: bmdAuth?.authProviderId,
                ...data.params
            },
            callBackFunc: (requestData, json) => {
                if (json.isResultOk) {
                    showToastr({ notificationType: 'success', message: 'Creation successful!' });
                }
                
                const callBackData = { ...data, ...json };
                dispatch(onSaveDispatchReturn(callBackData));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {

                const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onSaveDispatchReturn(callBackData));
            }
        });
    };
};



export const readDispatchStatuses = () => {

    const bmdAuth = BmdAuth.getInstance();

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/dispatch-statuses',
            params: {
                bmdToken: bmdAuth?.bmdToken,
                authProviderId: bmdAuth?.authProviderId
            },
            callBackFunc: (requestData, json) => {
                const callBackData = { ...json };
                dispatch(onReadDispatchStatusesReturn(callBackData));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                const callBackData = { errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onReadDispatchStatusesReturn(callBackData));
            }
        });
    };

};



export const readDispatches = (data) => {

    const bmdAuth = BmdAuth.getInstance();

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/dispatches',
            params: {
                bmdToken: bmdAuth?.bmdToken,
                authProviderId: bmdAuth?.authProviderId,
                ...data.params
            },
            callBackFunc: (requestData, json) => {
                const callBackData = { ...data, ...json };
                dispatch(onReadDispatchesReturn(callBackData));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onReadDispatchesReturn(callBackData));
            }
        });
    };

};



export const readDispatch = (data) => {

    const bmdAuth = BmdAuth.getInstance();

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/dispatches/show',
            params: {
                bmdToken: bmdAuth?.bmdToken,
                authProviderId: bmdAuth?.authProviderId,
                ...data.params
            },
            callBackFunc: (requestData, json) => {
                const callBackData = { ...data, ...json };
                dispatch(onReadDispatchReturn(callBackData));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onReadDispatchReturn(callBackData));
            }
        });
    };

};



export const removeOrderFromDispatch = (data) => {

    const bmdAuth = BmdAuth.getInstance();

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/dispatches/removeOrderFromDispatch',
            method: 'post',
            params: {
                bmdToken: bmdAuth?.bmdToken,
                authProviderId: bmdAuth?.authProviderId,
                ...data.params
            },
            callBackFunc: (requestData, json) => {
                const callBackData = { ...data, ...json };
                dispatch(onRemoveOrderFromDispatchReturn(callBackData));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onRemoveOrderFromDispatchReturn(callBackData));
            }
        });
    };

};