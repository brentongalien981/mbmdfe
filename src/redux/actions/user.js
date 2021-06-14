import BmdAuth from "../../bs/core/BmdAuth";
import BsCore2 from "../../bs/core/BsCore2";
import { showToastr } from "../../helpers/notifications/NotificationsHelper";

/** NAMES */
export const ON_CREATE_USER_RETURN = "ON_CREATE_USER_RETURN";
export const ON_GET_USER_ROLES_RETURN = "ON_GET_USER_ROLES_RETURN";



/** FUNCS */
export const onCreateUserReturn = (callBackData) => ({ type: ON_CREATE_USER_RETURN, callBackData: callBackData });
export const onGetUserRolesReturn = (callBackData) => ({ type: ON_GET_USER_ROLES_RETURN, callBackData: callBackData });



/** AJAX FUNCS */
export const createUser = (data) => {

    const bmdAuth = BmdAuth.getInstance();

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/users/create',
            method: 'post',
            params: { 
                bmdToken: bmdAuth?.bmdToken, authProviderId: bmdAuth?.authProviderId,
                ...data.params 
            },
            callBackFunc: (requestData, json) => {
                const callBackData = { ...data, ...json };
                dispatch(onCreateUserReturn(callBackData));

                if (callBackData.isResultOk) {
                    const notificationData = { message: 'User created' };
                    showToastr(notificationData);
                }
                
            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onCreateUserReturn(callBackData));
            }
        });
    };

};



export const getUserRoles = (data) => {

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/roles/getRoles',
            callBackFunc: (requestData, json) => {
                const callBackData = { ...data, ...json };
                dispatch(onGetUserRolesReturn(callBackData));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                const callBackData = { errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onGetUserRolesReturn(callBackData));
            }
        });
    };

};