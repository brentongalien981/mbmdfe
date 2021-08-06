import BsCore2 from "../../bs/core/BsCore2";
import { modifyOrderWithDatePropsToFormat } from "../../containers/order/helpers/HelperFuncsA";
import * as actions from "../actions/order";

/** DEFAULTS */
const FIRST_DEFAULT_ORDER_STATUS = { code: '', name: 'ALL_STATUS' };



/** CONSTANTS */



/** INITIAL STATE */
const initialState = {
    order: {},
    orderItems: [],
    orderStatuses: [FIRST_DEFAULT_ORDER_STATUS]
};



/** REDUCER */
const order = (state = initialState, action) => {
    switch (action.type) {
        case actions.ON_READ_ORDER_RETURN: return onReadOrderReturn(state, action);
        default: return state;
    }
}



/** HELPER FUNCS */



/** NORMAL FUNCS */
const onReadOrderReturn = (state, action) => {

    let order = {};
    let orderItems = [];
    let updatedOrderStatuses = state.orderStatuses;

    if (action.callBackData.isResultOk) {
        order = action.callBackData.objs.order;
        order = modifyOrderWithDatePropsToFormat(order, 'yyyy-mm-dd');
        orderItems = action.callBackData.objs.orderItems;
        updatedOrderStatuses = action.callBackData.objs.orderStatuses ?? updatedOrderStatuses;
    }
    else {
        BsCore2.alertForCallBackDataErrors(action.callBackData);
    }


    action.callBackData.doCallBackFunc({
        order: order,
        orderItems: orderItems,
    });

    return {
        ...state,
        order: order,
        orderItems: orderItems,
        orderStatuses: updatedOrderStatuses
    };
};



export default order;