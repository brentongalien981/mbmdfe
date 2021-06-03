import * as actions from '../actions/user';

/** DEFAULTS */



/** CONSTANTS */



/** INITIAL STATE */
const initialState = {
    theShit: 'Value of theShit'
};



/** REDUCER */
const user = (state = initialState, action) => {
    switch (action.type) {
        // case actions.TRY_RESET_SYSTEM: return tryResetSystem(state, action);
        case actions.DO_SHIT: return doShit(state, action);
        default: return state;
    }
}



/** NORMAL FUNCS */
const doShit = (state, action) => {
    return {
        ...state
    };
};



export default user;