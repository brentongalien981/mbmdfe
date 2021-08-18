// import * as actions from '../actions/xxxactions';

/** DEFAULTS */



/** CONSTANTS */



/** INITIAL STATE */
const initialState = {
    purchases: []
};



/** REDUCER */
const purchases = (state = initialState, action) => {
    switch (action.type) {
        // case actions.TRY_RESET_SYSTEM: return tryResetSystem(state, action);
        default: return state;
    }
}



/** HELPER FUNCS */



/** NORMAL FUNCS */
const zzz = (state, action) => {
    return {
        ...state
    };
};



export default purchases;