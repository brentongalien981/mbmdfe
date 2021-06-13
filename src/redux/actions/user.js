import BsCore2 from "../../bs/core/BsCore2";
import { showToastr } from "../../helpers/notifications/NotificationsHelper";

/** NAMES */
export const ON_CREATE_USER_RETURN = "ON_CREATE_USER_RETURN";
export const ON_GET_USER_ROLES_RETURN = "ON_GET_USER_ROLES_RETURN";

// BMD-DELETE
export const ON_TEST_DISPATCH_RETURN = "ON_TEST_DISPATCH_RETURN";
export const TEST_INCREMENT = "TEST_INCREMENT";
export const DO_SHIT = "DO_SHIT";



/** FUNCS */
export const onCreateUserReturn = (callBackData) => ({ type: ON_CREATE_USER_RETURN, callBackData: callBackData });
export const onGetUserRolesReturn = (callBackData) => ({ type: ON_GET_USER_ROLES_RETURN, callBackData: callBackData });

// BMD-DELETE
export const onTestDispatchReturn = (callBackData) => ({ type: ON_TEST_DISPATCH_RETURN, callBackData: callBackData });
export const testIncrement = () => ({ type: TEST_INCREMENT });
export const doShit = (callBackData) => ({ type: DO_SHIT, callBackData: callBackData });



/** AJAX FUNCS */
export const createUser = (data) => {

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/users/create',
            method: 'post',
            params: { ...data.params },
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



// BMD-DELETE
export const testDispatch = () => {

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/mytest/forMBMDBE',
            params: { a: 1, b: 'p' },
            callBackFunc: (requestData, json) => {
                const callBackData = { ...json };
                dispatch(onTestDispatchReturn(callBackData));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                const callBackData = { errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onTestDispatchReturn(callBackData));
            }
        });
    };

};