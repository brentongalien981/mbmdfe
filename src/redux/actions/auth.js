import BmdAuth from "../../bs/core/BmdAuth";
import BsCore2 from "../../bs/core/BsCore2";
import { showToastr } from "../../helpers/notifications/NotificationsHelper";



/** NAMES */
export const CLEAR_SENSITIVE_DATA_FOR_AUTH_REDUX_STORE = "CLEAR_SENSITIVE_DATA_FOR_AUTH_REDUX_STORE";
export const RESET_FLAGS = "RESET_FLAGS";
export const ON_SIGN_IN_RETURN = "ON_SIGN_IN_RETURN";
export const ON_LOGIN_AS_DEMO_USER_RETURN = "ON_LOGIN_AS_DEMO_USER_RETURN";



/** FUNCS */
export const clearSensitiveDataForAuthReduxStore = () => ({ type: CLEAR_SENSITIVE_DATA_FOR_AUTH_REDUX_STORE });
export const resetFlags = () => ({ type: RESET_FLAGS });
export const onSignInReturn = (callBackData) => ({ type: ON_SIGN_IN_RETURN, callBackData: callBackData });
export const onLoginAsDemoUserReturn = (callBackData) => ({ type: ON_LOGIN_AS_DEMO_USER_RETURN, callBackData: callBackData });



/** AJAX FUNCS */
export const signOut = () => {
    return (dispatch) => {
        showToastr({ notificationType: 'info', message: 'See yah!' });
        dispatch(clearSensitiveDataForAuthReduxStore());
    };

};



export const signIn = (data) => {

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/auth/signIn',
            method: 'post',
            params: { email: data.params.email, password: data.params.password },
            callBackFunc: (requestData, json) => {
                const callBackData = { ...data, ...json };

                let notificationData = { notificationType: 'error', message: 'Invalid Credentials' };
                if (callBackData.isResultOk) {
                    notificationData = { message: 'Welcome!' };
                }
                showToastr(notificationData);

                dispatch(onSignInReturn(callBackData));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onSignInReturn(callBackData));
            }
        });
    };

};



export const loginAsDemoUser = (data) => {

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/auth/loginAsDemoUser',
            method: 'post',
            callBackFunc: (requestData, json) => {

                if (json.isResultOk) {
                    showToastr({ message: 'Welcome!' });
                }

                const callBackData = { ...data, ...json };

                dispatch(onLoginAsDemoUserReturn(callBackData));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onLoginAsDemoUserReturn(callBackData));
            }
        });
    };

};