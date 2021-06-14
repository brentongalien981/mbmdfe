import BmdAuth from "../../bs/core/BmdAuth";
import { LOGIN_RESULT_CODE_INVALID_BMD_AUTH_PROVIDER, LOGIN_RESULT_CODE_INVALID_PASSWORD } from "../../containers/auth/constants/consts";
import * as actions from "../actions/auth";

/** DEFAULTS */



/** CONSTANTS */



/** INITIAL STATE */
const initialState = {
    // FLAGS
    shouldDoOnLoginProcessFinalization: false
};



/** REDUCER */
const auth = (state = initialState, action) => {
    switch (action.type) {
        case actions.RESET_FLAGS: return resetFlags(state, action);
        case actions.ON_SIGN_IN_RETURN: return onSignInReturn(state, action);
        default: return state;
    }
}



/** NORMAL FUNCS */
const resetFlags = (state, action) => {

    return {
        ...state,
        shouldDoOnLoginProcessFinalization: false
    };
};



const onSignInReturn = (state, action) => {

    let shouldDoOnLoginProcessFinalization = false;

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

        shouldDoOnLoginProcessFinalization = true;
    }

    action.callBackData.doCallBackFunc();

    return {
        ...state,
        shouldDoOnLoginProcessFinalization: shouldDoOnLoginProcessFinalization
    };
};



export default auth;