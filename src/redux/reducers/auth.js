import BmdAuth from "../../bs/core/BmdAuth";
import BsCore2 from "../../bs/core/BsCore2";
import BsJLS from "../../bs/core/BsJLS";
import BsJLSOLM from "../../bs/core/BsJLSOLM";
import { LOGIN_RESULT_CODE_INVALID_BMD_AUTH_PROVIDER, LOGIN_RESULT_CODE_INVALID_PASSWORD } from "../../containers/auth/constants/consts";
import * as actions from "../actions/auth";

/** DEFAULTS */



/** CONSTANTS */



/** INITIAL STATE */
const initialState = {
    userEmail: BmdAuth.getInstance()?.email ?? 'Guest',
    // FLAGS
    shouldDoOnLoginProcessFinalization: false
};



/** REDUCER */
const auth = (state = initialState, action) => {
    switch (action.type) {
        case actions.CLEAR_SENSITIVE_DATA_FOR_AUTH_REDUX_STORE: return clearSensitiveDataForAuthReduxStore(state, action);
        case actions.RESET_FLAGS: return resetFlags(state, action);
        case actions.ON_SIGN_IN_RETURN: return onSignInReturn(state, action);
        default: return state;
    }
}



/** HELPER FUNCS */
const clearSensitiveBsJLSSearchQueryObjsData = () => {

    for (const k in BsJLSOLM.searchQueryObjs) {
        const v = BsJLSOLM.searchQueryObjs[k];

        if (v.isSensitiveInfo) {

            const bsJlsObjVal = BsJLS.get(k);

            switch (typeof bsJlsObjVal) {
                case 'string':
                    BsJLS.set(k, '');
                    break;
                case 'object':
                    if (isNaN(bsJlsObjVal.length)) {
                        // It's an object.
                        BsJLS.set(k, {});
                    } else {
                        // It's an array.
                        BsJLS.set(k, []);
                    }
                    break;

                default:
                    BsJLS.set(k, '');
                    break;
            }
        }
    }
};



/** NORMAL FUNCS */
const clearSensitiveDataForAuthReduxStore = (state, action) => {

    BmdAuth.clearAuth();
    clearSensitiveBsJLSSearchQueryObjsData();

    return {
        ...state,
        userEmail: 'Guest'
    };
};



const resetFlags = (state, action) => {

    return {
        ...state,
        shouldDoOnLoginProcessFinalization: false
    };
};



const onSignInReturn = (state, action) => {

    let shouldDoOnLoginProcessFinalization = false;
    let userEmail = 'Guest';

    if (action.callBackData.isResultOk) {

        const currentAuthUserData = {
            email: action.callBackData.objs.email,
            bmdToken: action.callBackData.objs.bmdToken,
            bmdRefreshToken: action.callBackData.objs.bmdRefreshToken,
            authProviderId: action.callBackData.objs.authProviderId,
            expiresIn: action.callBackData.objs.expiresIn,
            stayLoggedIn: true
        };

        BmdAuth.set(currentAuthUserData);
        userEmail = currentAuthUserData.email;

        shouldDoOnLoginProcessFinalization = true;
    } else {
        BsCore2.alertForCallBackDataErrors(action.callBackData);
    }

    action.callBackData.doCallBackFunc();

    return {
        ...state,
        userEmail: userEmail,
        shouldDoOnLoginProcessFinalization: shouldDoOnLoginProcessFinalization
    };
};



export default auth;