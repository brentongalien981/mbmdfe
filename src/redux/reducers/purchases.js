// import * as actions from '../actions/xxxactions';

import * as actions from "../actions/purchases";

/** DEFAULTS */



/** CONSTANTS */



/** INITIAL STATE */
const initialState = {
    purchases: []
};



/** REDUCER */
const purchases = (state = initialState, action) => {
    switch (action.type) {
        case actions.ON_READ_PURCHASES_RETURN: return onReadPurchasesReturn(state, action);
        default: return state;
    }
}



/** HELPER FUNCS */



/** NORMAL FUNCS */
const onReadPurchasesReturn = (state, action) => {

    action.callBackData.doCallBackFunc();

    return {
        ...state,
        
    };
};



export default purchases;