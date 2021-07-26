import Bs from "../../bs/core/Bs";
import * as actions from "../actions/orders";

/** DEFAULTS */
const DEFAULT_PAGINATION_DATA = {
    totalNumOfProductsForQuery: 0,
    pageNum: 1
};



/** CONSTANTS */



/** INITIAL STATE */
const initialState = {
    orders: [],
    paginationData: {}
};



/** REDUCER */
const orders = (state = initialState, action) => {
    switch (action.type) {
        case actions.ON_READ_ORDERS_RETURN: return onReadOrdersReturn(state, action);
        default: return state;
    }
}



/** HELPER FUNCS */



/** NORMAL FUNCS */
const onReadOrdersReturn = (state, action) => {

    let orders = [];
    let paginationData = { ...DEFAULT_PAGINATION_DATA };

    if (action.callBackData.isResultOk) {
        orders = action.callBackData.objs.orders;
        paginationData = action.callBackData.objs.paginationData;
    }


    return {
        ...state,
        orders,
        paginationData
    };
};



export default orders;