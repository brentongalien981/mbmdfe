import BsCore2 from "../../bs/core/BsCore2";

/** NAMES */
export const ON_GET_USER_ROLES_RETURN = "ON_GET_USER_ROLES_RETURN";

// BMD-DELETE
export const ON_TEST_DISPATCH_RETURN = "ON_TEST_DISPATCH_RETURN";
export const TEST_INCREMENT = "TEST_INCREMENT";
export const DO_SHIT = "DO_SHIT";



/** FUNCS */
export const onGetUserRolesReturn = (callBackData) => ({ type: ON_GET_USER_ROLES_RETURN, callBackData: callBackData });

// BMD-DELETE
export const onTestDispatchReturn = (callBackData) => ({ type: ON_TEST_DISPATCH_RETURN, callBackData: callBackData });
export const testIncrement = () => ({ type: TEST_INCREMENT });
export const doShit = (callBackData) => ({ type: DO_SHIT, callBackData: callBackData });



/** AJAX FUNCS */
export const getUserRoles = () => {

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/roles/getRoles',
            callBackFunc: (requestData, json) => {
                const callBackData = { ...json };
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