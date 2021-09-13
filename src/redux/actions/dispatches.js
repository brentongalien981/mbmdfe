import BmdAuth from "../../bs/core/BmdAuth";
import BsCore2 from "../../bs/core/BsCore2";
import { showToastr } from "../../helpers/notifications/NotificationsHelper";

/** NAMES */
export const RESET_CREATE_DISPATCH_FLAGS = "RESET_CREATE_DISPATCH_FLAGS";
export const ON_SAVE_DISPATCH_RETURN = "ON_SAVE_DISPATCH_RETURN";



/** FUNCS */
export const resetCreateDispatchFlags = (callBackData) => ({ type: RESET_CREATE_DISPATCH_FLAGS, callBackData: callBackData });
export const onSaveDispatchReturn = (callBackData) => ({ type: ON_SAVE_DISPATCH_RETURN, callBackData: callBackData });



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
                showToastr({ notificationType: 'success', message: 'Creation successful!' });
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