import * as actions from '../actions/user';

/** DEFAULTS */



/** CONSTANTS */



/** INITIAL STATE */
const initialState = {

    userRoles: [],

    // BMD-DELETE
    theShit: 'Value of theShit',
    testCount: 0,
    testDispatchVal: 0
};



/** REDUCER */
const user = (state = initialState, action) => {
    switch (action.type) {
        case actions.ON_CREATE_USER_RETURN: return onCreateUserReturn(state, action);
        case actions.ON_GET_USER_ROLES_RETURN: return onGetUserRolesReturn(state, action);

        // BMD-DELETE
        case actions.ON_TEST_DISPATCH_RETURN: return onTestDispatchReturn(state, action);
        case actions.TEST_INCREMENT: return testIncrement(state, action);
        case actions.DO_SHIT: return doShit(state, action);

        default: return state;
    }
}



/** NORMAL FUNCS */
// BMD-ISH
const onCreateUserReturn = (state, action) => {

    if (action.callBackData.isResultOk) {
        
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

// BMD-DELETE
const onTestDispatchReturn = (state, action) => {
    return {
        ...state,
        testDispatchVal: action.callBackData?.isResultOk ? action.callBackData.objs.testDispatchVal : state.testDispatchVal
    };
};


// BMD-DELETE
const testIncrement = (state, action) => {
    return {
        ...state,
        testCount: ++state.testCount
    };
};


// BMD-DELETE
const doShit = (state, action) => {
    return {
        ...state
    };
};



export default user;