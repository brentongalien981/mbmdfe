import BsCore2 from "../../bs/core/BsCore2";
import BsJLS from "../../bs/core/BsJLS";
import * as actions from "../actions/dispatches";

/** DEFAULTS */
const FIRST_DEFAULT_DISPATCH_STATUS = { code: '', name: '---' };
const NUM_OF_DISPLAYED_DISPATCHES_PER_PAGE = 10;

const DEFAULT_PAGINATION_DATA = {
    totalNumOfDispatchesForQuery: 0,
    numOfPages: 1,
    pageNum: 1
};



/** CONSTANTS */



/** INITIAL STATE */
const initialState = {
    dispatches: [],
    dispatchStatuses: [FIRST_DEFAULT_DISPATCH_STATUS],
    hasNewDispatchBeenSaved: false,
    paginationData: {...DEFAULT_PAGINATION_DATA}
};



/** REDUCER */
const dispatches = (state = initialState, action) => {
    switch (action.type) {
        case actions.RESET_CREATE_DISPATCH_FLAGS: return resetCreateDispatchFlags(state, action);
        case actions.ON_SAVE_DISPATCH_RETURN: return onSaveDispatchReturn(state, action);
        case actions.ON_READ_DISPATCH_STATUSES_RETURN: return onReadDispatchStatusesReturn(state, action);
        case actions.ON_READ_DISPATCHES_RETURN: return onReadDispatchesReturn(state, action);        
        default: return state;
    }
}



/** HELPER FUNCS */



/** NORMAL FUNCS */
const onSaveDispatchReturn = (state, action) => {

    let hasNewDispatchBeenSaved = false;
    let savedDispatchId = 0;


    if (action.callBackData.isResultOk) {
        hasNewDispatchBeenSaved = true;
        savedDispatchId = action.callBackData.objs.dispatch.id;
    } else {
        BsCore2.alertForCallBackDataErrors(action.callBackData);
    }


    action.callBackData.doCallBackFunc({
        savedDispatchId: savedDispatchId
    });


    return {
        ...state,
        hasNewDispatchBeenSaved: hasNewDispatchBeenSaved
    };
};



const resetCreateDispatchFlags = (state, action) => {
    return {
        ...state,
        hasNewDispatchBeenSaved: false
    };
};



const onReadDispatchStatusesReturn = (state, action) => {

    let updatedDispatchStatuses = [FIRST_DEFAULT_DISPATCH_STATUS];

    if (action.callBackData.isResultOk) {
        updatedDispatchStatuses = [
            ...updatedDispatchStatuses, 
            ...action.callBackData.objs.dispatchStatuses
        ];
    }

    return {
        ...state,
        dispatchStatuses: updatedDispatchStatuses
    };
};



const onReadDispatchesReturn = (state, action) => {

    let dispatches = [];
    let paginationData = { ...DEFAULT_PAGINATION_DATA };

    if (action.callBackData.isResultOk) {

        dispatches = action.callBackData.objs.dispatches;


        const numOfPages = Math.ceil(action.callBackData.objs.paginationData.totalNumOfDispatchesForQuery / NUM_OF_DISPLAYED_DISPATCHES_PER_PAGE);

        paginationData = {
            numOfPages: numOfPages,
            pageNum: action.callBackData.params.pageNum
        };


        BsJLS.set('dispatches.filters', action.callBackData.params);
    }
    else {
        BsCore2.alertForCallBackDataErrors(action.callBackData);
    }

    action.callBackData.doCallBackFunc();

    return {
        ...state,
        dispatches,
        paginationData

    };
};



export default dispatches;