import * as actions from "../actions/dispatches";

/** DEFAULTS */
const FIRST_DEFAULT_DISPATCH_STATUS = { code: null, name: 'ALL_STATUS' };



/** CONSTANTS */



/** INITIAL STATE */
const initialState = {
    dispatchStatuses: [FIRST_DEFAULT_DISPATCH_STATUS],
    hasNewDispatchBeenSaved: false
};



/** REDUCER */
const dispatches = (state = initialState, action) => {
    switch (action.type) {
        case actions.RESET_CREATE_DISPATCH_FLAGS: return resetCreateDispatchFlags(state, action);        
        default: return state;
    }
}



/** HELPER FUNCS */



/** NORMAL FUNCS */
const resetCreateDispatchFlags = (state, action) => {
    return {
        ...state,
        hasNewDispatchBeenSaved: false
    };
};



export default dispatches;