import { GENERAL_HTTP_RESPONSE_ERROR_MSG } from "../../bmd/constants/consts";
import BmdAuth from "../../bs/core/BmdAuth";
import BsCore2 from "../../bs/core/BsCore2";
import { showToastr } from "../../helpers/notifications/NotificationsHelper";



/** NAMES */
export const RESET_CREATE_PURCHASE_FLAGS = "RESET_CREATE_PURCHASE_FLAGS";
export const ON_READ_PURCHASE_RETURN = "ON_READ_PURCHASE_RETURN";
export const ON_SAVE_PURCHASE_RETURN = "ON_SAVE_PURCHASE_RETURN";
export const ON_UPDATE_PURCHASE_RETURN = "ON_UPDATE_PURCHASE_RETURN";
export const ON_SAVE_PURCHASE_ITEM_RETURN = "ON_SAVE_PURCHASE_ITEM_RETURN";



/** FUNCS */
export const resetCreatePurchaseFlags = (callBackData) => ({ type: RESET_CREATE_PURCHASE_FLAGS, callBackData: callBackData });
export const onReadPurchaseReturn = (callBackData) => ({ type: ON_READ_PURCHASE_RETURN, callBackData: callBackData });
export const onSavePurchaseReturn = (callBackData) => ({ type: ON_SAVE_PURCHASE_RETURN, callBackData: callBackData });
export const onUpdatePurchaseReturn = (callBackData) => ({ type: ON_UPDATE_PURCHASE_RETURN, callBackData: callBackData });
export const onSavePurchaseItemReturn = (callBackData) => ({ type: ON_SAVE_PURCHASE_ITEM_RETURN, callBackData: callBackData });



/** AJAX FUNCS */
export const readPurchase = (data) => {

    const bmdAuth = BmdAuth.getInstance();

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/purchases/show',
            params: {
                bmdToken: bmdAuth?.bmdToken,
                authProviderId: bmdAuth?.authProviderId,
                ...data.params
            },
            callBackFunc: (requestData, json) => {
                const callBackData = { ...data, ...json };
                dispatch(onReadPurchaseReturn(callBackData));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {

                showToastr({ notificationType: 'error', message: GENERAL_HTTP_RESPONSE_ERROR_MSG });

                const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onReadPurchaseReturn(callBackData));
            }
        });
    };

};



export const savePurchase = (data) => {

    const bmdAuth = BmdAuth.getInstance();

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/purchases/store',
            method: 'post',
            params: {
                bmdToken: bmdAuth?.bmdToken,
                authProviderId: bmdAuth?.authProviderId,
                ...data.params
            },
            callBackFunc: (requestData, json) => {
                showToastr({ notificationType: 'success', message: 'Creation successful!' });
                const callBackData = { ...data, ...json };
                dispatch(onSavePurchaseReturn(callBackData));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {

                const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onSavePurchaseReturn(callBackData));
            }
        });
    };
};



export const updatePurchase = (data) => {

    const bmdAuth = BmdAuth.getInstance();

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/purchases/update',
            method: 'post',
            params: {
                bmdToken: bmdAuth?.bmdToken,
                authProviderId: bmdAuth?.authProviderId,
                ...data.params
            },
            callBackFunc: (requestData, json) => {
                
                if (json.isResultOk) {
                    showToastr({ notificationType: 'success', message: 'Update successful!' });
                }

                const callBackData = { ...data, ...json };
                dispatch(onUpdatePurchaseReturn(callBackData));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {

                const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onUpdatePurchaseReturn(callBackData));
            }
        });
    };
};



export const savePurchaseItem = (data) => {

    const bmdAuth = BmdAuth.getInstance();

    return (dispatch) => {

        let url = '/purchase-items/store';
        if (data.localParams.purchaseItemFormAction === 'edit') {
            url = '/purchase-items/update';
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

                if (json.isResultOk) {
                    showToastr({ notificationType: 'success', message: 'Item saved.' });
                }
                
                const callBackData = { ...data, ...json };
                dispatch(onSavePurchaseItemReturn(callBackData));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onSavePurchaseItemReturn(callBackData));
            }
        });
    };
};