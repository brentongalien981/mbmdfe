import * as actions from '../actions/user';

/** DEFAULTS */



/** CONSTANTS */



/** INITIAL STATE */
const initialState = {
    // BMD-DELETE
    theShit: 'Value of theShit',
    testCount: 0,
    testDispatchVal: 0
};



/** REDUCER */
const user = (state = initialState, action) => {
    switch (action.type) {
        // BMD-DELETE
        case actions.ON_TEST_DISPATCH_RETURN: return onTestDispatchReturn(state, action);
        case actions.TEST_INCREMENT: return testIncrement(state, action);
        case actions.DO_SHIT: return doShit(state, action);

        default: return state;
    }
}



/** NORMAL FUNCS */
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