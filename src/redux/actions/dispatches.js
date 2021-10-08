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
export const ON_SAVE_EP_BATCH_PICKUP_INFO_RETURN = "ON_SAVE_EP_BATCH_PICKUP_INFO_RETURN";
export const ON_BUY_PICKUP_RATE_RETURN = "ON_BUY_PICKUP_RATE_RETURN";
export const ON_CANCEL_PICKUP_RETURN = "ON_CANCEL_PICKUP_RETURN";
export const ON_UPDATE_DISPATCH_RETURN = "ON_UPDATE_DISPATCH_RETURN";
export const ON_GENERATE_BATCH_LABELS_RETURN = "ON_GENERATE_BATCH_LABELS_RETURN";



/** FUNCS */
export const resetCreateDispatchFlags = (callBackData) => ({ type: RESET_CREATE_DISPATCH_FLAGS, callBackData: callBackData });
export const onSaveDispatchReturn = (callBackData) => ({ type: ON_SAVE_DISPATCH_RETURN, callBackData: callBackData });
export const onReadDispatchStatusesReturn = (callBackData) => ({ type: ON_READ_DISPATCH_STATUSES_RETURN, callBackData: callBackData });
export const onReadDispatchesReturn = (callBackData) => ({ type: ON_READ_DISPATCHES_RETURN, callBackData: callBackData });
export const onReadDispatchReturn = (callBackData) => ({ type: ON_READ_DISPATCH_RETURN, callBackData: callBackData });
export const onRemoveOrderFromDispatchReturn = (callBackData) => ({ type: ON_REMOVE_ORDER_FROM_DISPATCH_RETURN, callBackData: callBackData });
export const onSaveEpBatchPickupInfoReturn = (callBackData) => ({ type: ON_SAVE_EP_BATCH_PICKUP_INFO_RETURN, callBackData: callBackData });
export const onBuyPickupRateReturn = (callBackData) => ({ type: ON_BUY_PICKUP_RATE_RETURN, callBackData: callBackData });
export const onCancelPickupReturn = (callBackData) => ({ type: ON_CANCEL_PICKUP_RETURN, callBackData: callBackData });
export const onUpdateDispatchReturn = (callBackData) => ({ type: ON_UPDATE_DISPATCH_RETURN, callBackData: callBackData });
export const onGenerateBatchLabelsReturn = (callBackData) => ({ type: ON_GENERATE_BATCH_LABELS_RETURN, callBackData: callBackData });



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



export const saveEpBatchPickupInfo = (data) => {

    const bmdAuth = BmdAuth.getInstance();

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/dispatches/saveEpBatchPickupInfo',
            method: 'post',
            params: {
                bmdToken: bmdAuth?.bmdToken,
                authProviderId: bmdAuth?.authProviderId,
                ...data.params
            },
            callBackFunc: (requestData, json) => {
                if (json.isResultOk) {
                    showToastr({ notificationType: 'success', message: 'EP-Batch Pickup Info saved! Now set the pickup rate to finish.' });
                }

                const callBackData = { ...data, ...json };
                dispatch(onSaveEpBatchPickupInfoReturn(callBackData));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onSaveEpBatchPickupInfoReturn(callBackData));
            }
        });
    };

};



export const buyPickupRate = (data) => {

    const bmdAuth = BmdAuth.getInstance();

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/dispatches/buyPickupRate',
            method: 'post',
            params: {
                bmdToken: bmdAuth?.bmdToken,
                authProviderId: bmdAuth?.authProviderId,
                ...data.params
            },
            callBackFunc: (requestData, json) => {

                if (json.isResultOk) {
                    showToastr({ notificationType: 'success', message: 'Pickup Rate Bought!' });
                }

                const callBackData = { ...data, ...json };
                dispatch(onBuyPickupRateReturn(callBackData));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onBuyPickupRateReturn(callBackData));
            }
        });
    };

};



export const cancelPickup = (data) => {

    const bmdAuth = BmdAuth.getInstance();

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/dispatches/cancelPickup',
            method: 'post',
            params: {
                bmdToken: bmdAuth?.bmdToken,
                authProviderId: bmdAuth?.authProviderId,
                ...data.params
            },
            callBackFunc: (requestData, json) => {

                if (json.isResultOk) {
                    showToastr({ notificationType: 'success', message: 'Pickup Cancelled.' });
                }

                const callBackData = { ...data, ...json };
                dispatch(onCancelPickupReturn(callBackData));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onCancelPickupReturn(callBackData));
            }
        });
    };

};



export const updateDispatch = (data) => {

    const bmdAuth = BmdAuth.getInstance();

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/dispatches/update',
            method: 'post',
            params: {
                bmdToken: bmdAuth?.bmdToken,
                authProviderId: bmdAuth?.authProviderId,
                ...data.params
            },
            callBackFunc: (requestData, json) => {

                if (json.isResultOk) {
                    showToastr({ notificationType: 'success', message: 'Dispatch Updated.' });
                }

                const callBackData = { ...data, ...json };
                dispatch(onUpdateDispatchReturn(callBackData));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onUpdateDispatchReturn(callBackData));
            }
        });
    };

};



export const generateBatchLabels = (data) => {

    const bmdAuth = BmdAuth.getInstance();

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/dispatches/generateBatchLabels',
            method: 'post',
            params: {
                bmdToken: bmdAuth?.bmdToken,
                authProviderId: bmdAuth?.authProviderId,
                ...data.params
            },
            callBackFunc: (requestData, json) => {

                if (json.isResultOk) {
                    showToastr({ notificationType: 'success', message: 'Batch Labels Generated.' });
                }

                const callBackData = { ...data, ...json };
                dispatch(onGenerateBatchLabelsReturn(callBackData));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onGenerateBatchLabelsReturn(callBackData));
            }
        });
    };

};