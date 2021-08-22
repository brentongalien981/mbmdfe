// import * as actions from '../actions/xxxactions';

/** DEFAULTS */
const FIRST_DEFAULT_PURCHASE_STATUS = { code: null, name: 'ALL_STATUS' };



/** CONSTANTS */



/** INITIAL STATE */
const initialState = {
    purchaseStatuses: [FIRST_DEFAULT_PURCHASE_STATUS]
};



/** REDUCER */
const purchase = (state = initialState, action) => {
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



export default purchase;