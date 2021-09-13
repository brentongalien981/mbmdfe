import BsCore2 from "../../bs/core/BsCore2";
import * as actions from "../actions/dispatches";

/** DEFAULTS */
const FIRST_DEFAULT_DISPATCH_STATUS = { code: null, name: '---' };



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
        case actions.ON_SAVE_DISPATCH_RETURN: return onSaveDispatchReturn(state, action);        
        default: return state;
    }
}



/** HELPER FUNCS */



/** NORMAL FUNCS */
const onSaveDispatchReturn = (state, action) => {

    // let hasPurchaseBeenSaved = false;
    let savedDispatchId = 0;


    if (action.callBackData.isResultOk) {
        // hasPurchaseBeenSaved = true;
        // savedPurchaseId = action.callBackData.objs.purchase?.id;
    } else {
        BsCore2.alertForCallBackDataErrors(action.callBackData);
    }


    action.callBackData.doCallBackFunc({
        savedDispatchId: savedDispatchId
    });


    return {
        ...state,
        // hasPurchaseBeenSaved: hasPurchaseBeenSaved
    };
};



const resetCreateDispatchFlags = (state, action) => {
    return {
        ...state,
        hasNewDispatchBeenSaved: false
    };
};



export default dispatches;