import * as actions from "../actions/order";

/** DEFAULTS */



/** CONSTANTS */



/** INITIAL STATE */
const initialState = {
    order: {},
    orderItems: []
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

    if (action.callBackData.isResultOk) {
        order = action.callBackData.objs.order;
        orderItems = action.callBackData.objs.orderItems;
    }


    action.callBackData.doCallBackFunc();

    return {
        ...state,
        order: order,
        orderItems: orderItems
    };
};



export default order;