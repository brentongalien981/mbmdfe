import Bs from "../../bs/core/Bs";
import BsCore2 from "../../bs/core/BsCore2";
import BsJLS from "../../bs/core/BsJLS";
import { NUM_OF_DISPLAYED_ORDERS_PER_PAGE } from "../../containers/orders/constants/consts";
import * as actions from "../actions/orders";

/** DEFAULTS */
const DEFAULT_PAGINATION_DATA = {
    totalNumOfProductsForQuery: 0,
    numOfPages: 1,
    pageNum: 1
};

const FIRST_DEFAULT_ORDER_STATUS = { code: '', name: 'ALL_STATUS' };



/** CONSTANTS */



/** INITIAL STATE */
const initialState = {
    orders: [],
    paginationData: {},
    orderStatuses: [FIRST_DEFAULT_ORDER_STATUS]
};



/** REDUCER */
const orders = (state = initialState, action) => {
    switch (action.type) {
        case actions.ON_READ_ORDERS_RETURN: return onReadOrdersReturn(state, action);
        case actions.ON_READ_ORDER_STATUSES_RETURN: return onReadOrderStatusesReturn(state, action);
        default: return state;
    }
}



/** HELPER FUNCS */



/** NORMAL FUNCS */
const onReadOrderStatusesReturn = (state, action) => {

    let updatedOrderStatuses = [FIRST_DEFAULT_ORDER_STATUS];
    if (action.callBackData.isResultOk) {
        updatedOrderStatuses = [
            ...updatedOrderStatuses, 
            ...action.callBackData.objs.orderStatuses
        ];
    }

    return {
        ...state,
        orderStatuses: updatedOrderStatuses
    };
};



const onReadOrdersReturn = (state, action) => {

    let orders = [];
    let paginationData = { ...DEFAULT_PAGINATION_DATA };

    if (action.callBackData.isResultOk) {

        orders = action.callBackData.objs.orders;

        const numOfPages = Math.ceil(action.callBackData.objs.paginationData.totalNumOfProductsForQuery / NUM_OF_DISPLAYED_ORDERS_PER_PAGE);

        paginationData = {
            numOfPages: numOfPages,
            pageNum: action.callBackData.params.pageNum
        };


        BsJLS.set('orders.readQueryParams', action.callBackData.params);
    }
    else {
        BsCore2.alertForCallBackDataErrors(action.callBackData);
    }


    action.callBackData.doCallBackFunc();


    return {
        ...state,
        orders,
        paginationData
    };
};



export default orders;