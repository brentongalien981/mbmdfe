import BsCore2 from '../../bs/core/BsCore2';
import * as actions from '../actions/user';

/** DEFAULTS */



/** CONSTANTS */



/** INITIAL STATE */
const initialState = {

    userRoles: []
};



/** REDUCER */
const user = (state = initialState, action) => {
    switch (action.type) {
        case actions.ON_CREATE_USER_RETURN: return onCreateUserReturn(state, action);
        case actions.ON_GET_USER_ROLES_RETURN: return onGetUserRolesReturn(state, action);
        default: return state;
    }
}



/** NORMAL FUNCS */
const onCreateUserReturn = (state, action) => {

    if (!action.callBackData.isResultOk) {
        BsCore2.alertForCallBackDataErrors(action.callBackData);
    }

    action.callBackData.doCallBackFunc();


    return {
        ...state
    };
};



const onGetUserRolesReturn = (state, action) => {

    const roles = action.callBackData.objs?.roles ?? [];

    action.callBackData.doCallBackFunc(roles);


    return {
        ...state,
        userRoles: roles
    };
};



export default user;