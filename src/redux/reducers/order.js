import { OK } from "../../bmd/constants/bmdHttpResponseCodes";
import Bs from "../../bs/core/Bs";
import BsCore2 from "../../bs/core/BsCore2";
import { addActionsPropToOrderItems, modifyOrderWithDatePropsToFormat } from "../../containers/order/helpers/HelperFuncsA";
import * as actions from "../actions/order";

/** DEFAULTS */
const FIRST_DEFAULT_ORDER_STATUS = { code: '', name: 'ALL_STATUS' };



/** CONSTANTS */



/** INITIAL STATE */
const initialState = {
    order: {},
    orderItems: [],
    orderStatuses: [FIRST_DEFAULT_ORDER_STATUS],
    orderItemStatuses: [FIRST_DEFAULT_ORDER_STATUS],
    newlySavedOrderId: '',
    hasOrderBeenSaved: false
};



/** REDUCER */
const order = (state = initialState, action) => {
    switch (action.type) {
        case actions.ON_READ_ORDER_RETURN: return onReadOrderReturn(state, action);
        case actions.ON_UPDATE_ORDER_RETURN: return onUpdateOrderReturn(state, action);
        case actions.ON_SAVE_ORDER_RETURN: return onSaveOrderReturn(state, action);
        case actions.RESET_ORDER_REDUCER_FLAGS: return resetOrderReducerFlags(state, action);
        case actions.ON_SAVE_ORDER_ITEM_RETURN: return onSaveOrderItemReturn(state, action);
        case actions.ON_ASSOCIATE_TO_PURCHASES_RETURN: return onAssociateToPurchasesReturn(state, action);
        case actions.ON_REFRESH_ORDER_RETURN: return onRefreshOrderReturn(state, action);
        default: return state;
    }
}



/** HELPER FUNCS */
const replaceUpdatedOrderItem = (updatedOrderItems, savedOrderItem) => {

    let theUpdatedOrderItems = [];

    for (const oi of updatedOrderItems) {
        if (oi.id === savedOrderItem.id) {
            theUpdatedOrderItems.push(savedOrderItem);
        } else {
            theUpdatedOrderItems.push(oi);
        }
    }

    return theUpdatedOrderItems;
};



/** NORMAL FUNCS */
const onReadOrderReturn = (state, action) => {

    let order = {};
    let orderItems = [];
    let updatedOrderStatuses = state.orderStatuses;
    let updatedOrderItemStatuses = state.orderItemStatuses;

    if (action.callBackData.isResultOk) {
        order = action.callBackData.objs.order;
        // order = modifyOrderWithDatePropsToFormat(order, 'yyyy-mm-dd');

        orderItems = action.callBackData.objs.orderItems;

        updatedOrderStatuses = action.callBackData.objs.orderStatuses ?? updatedOrderStatuses;
        updatedOrderItemStatuses = action.callBackData.objs.orderItemStatuses ?? updatedOrderItemStatuses;
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
        orderStatuses: updatedOrderStatuses,
        orderItemStatuses: updatedOrderItemStatuses
    };
};



const onUpdateOrderReturn = (state, action) => {

    if (!action.callBackData.isResultOk) {
        BsCore2.alertForCallBackDataErrors(action.callBackData);
    }


    action.callBackData.doCallBackFunc();


    return {
        ...state
    };
};



const onSaveOrderReturn = (state, action) => {

    let newlySavedOrderId = state.newlySavedOrderId;
    let hasOrderBeenSaved = false;


    if (action.callBackData.isResultOk) {
        newlySavedOrderId = action.callBackData.objs.order.id;
        hasOrderBeenSaved = true;
    } else {
        BsCore2.alertForCallBackDataErrors(action.callBackData);
    }


    action.callBackData.doCallBackFunc();


    return {
        ...state,
        newlySavedOrderId: newlySavedOrderId,
        hasOrderBeenSaved: hasOrderBeenSaved
    };
};



const resetOrderReducerFlags = (state, action) => {

    return {
        ...state,
        hasOrderBeenSaved: false
    };
};



const onSaveOrderItemReturn = (state, action) => {

    let updatedOrderItems = state.orderItems;

    if (action.callBackData.isResultOk) {

        const savedOrderItem = action.callBackData.objs.savedOrderItem;

        if (action.callBackData.localParams.orderItemFormAction === 'create') {
            updatedOrderItems = [...updatedOrderItems, savedOrderItem];
        } else {
            updatedOrderItems = replaceUpdatedOrderItem(updatedOrderItems, savedOrderItem);
        }

    } else {
        BsCore2.alertForCallBackDataErrors(action.callBackData);
    }


    action.callBackData.doCallBackFunc({ updatedOrderItems: updatedOrderItems });


    return {
        ...state,
        orderItems: updatedOrderItems
    };
};



const onAssociateToPurchasesReturn = (state, action) => {

    let updatedOrderItems = state.orderItems;

    if (action.callBackData.isResultOk) {
        alert(action.callBackData.resultCode.readableMessage);

        if (action.callBackData.resultCode.code == OK.code) {
            updatedOrderItems = action.callBackData.objs.orderItems;
        }
    } else {
        BsCore2.alertForCallBackDataErrors(action.callBackData);
    }


    action.callBackData.doCallBackFunc({ orderItems: updatedOrderItems });


    return {
        ...state,
        orderItems: updatedOrderItems
    };
};



const onRefreshOrderReturn = (state, action) => {

    let updateOrder = state.order;

    if (action.callBackData.isResultOk) {
        updateOrder = action.callBackData.objs.order;
    } else {
        BsCore2.alertForCallBackDataErrors(action.callBackData);
    }

    action.callBackData.doCallBackFunc({
        order: updateOrder
    });

    return {
        ...state,
        order: updateOrder
    };
};



export default order;