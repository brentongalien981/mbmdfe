// import * as actions from '../actions/xxxactions';

import BsCore2 from "../../bs/core/BsCore2";
import BsJLS from "../../bs/core/BsJLS";
import { NUM_OF_DISPLAYED_PURCHASES_PER_PAGE } from "../../containers/purchases/constants/consts";
import * as actions from "../actions/purchases";

/** DEFAULTS */
const DEFAULT_PAGINATION_DATA = {
    totalNumOfPurchasesForQuery: 0,
    numOfPages: 1,
    pageNum: 1
};



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

    let purchases = [];
    let paginationData = { ...DEFAULT_PAGINATION_DATA };

    if (action.callBackData.isResultOk) {

        purchases = action.callBackData.objs.purchases;


        const numOfPages = Math.ceil(action.callBackData.objs.paginationData.totalNumOfPurchasesForQuery / NUM_OF_DISPLAYED_PURCHASES_PER_PAGE);

        paginationData = {
            numOfPages: numOfPages,
            // BMD-TODO
            // pageNum: action.callBackData.params.pageNum
            pageNum: 1
        };


        BsJLS.set('purchases.filters', action.callBackData.params);
    }
    else {
        BsCore2.alertForCallBackDataErrors(action.callBackData);
    }

    action.callBackData.doCallBackFunc();

    return {
        ...state,
        purchases,
        paginationData

    };
};



export default purchases;