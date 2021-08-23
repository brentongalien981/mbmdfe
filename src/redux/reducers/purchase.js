import BsCore2 from "../../bs/core/BsCore2";
import * as actions from "../actions/purchase";



/** DEFAULTS */
const FIRST_DEFAULT_PURCHASE_STATUS = { code: null, name: 'ALL_STATUS' };



/** CONSTANTS */



/** INITIAL STATE */
const initialState = {
    purchase: {},
    purchaseItems: [],
    purchaseStatuses: [FIRST_DEFAULT_PURCHASE_STATUS],
    purchaseItemStatuses: [FIRST_DEFAULT_PURCHASE_STATUS]
};



/** REDUCER */
const purchase = (state = initialState, action) => {
    switch (action.type) {
        case actions.ON_READ_PURCHASE_RETURN: return onReadPurchaseReturn(state, action);
        default: return state;
    }
}



/** HELPER FUNCS */



/** NORMAL FUNCS */
const onReadPurchaseReturn = (state, action) => {

    let purchase = {};
    let purchaseItems = [];
    let updatedPurchaseStatuses = state.purchaseStatuses;
    let updatedPurchaseItemStatuses = state.purchaseItemStatuses;

    if (action.callBackData.isResultOk) {

        purchase = action.callBackData.objs.purchase;

        purchaseItems = action.callBackData.objs.purchase.purchasetems;

        updatedPurchaseStatuses = action.callBackData.objs.purchaseStatuses ?? updatedPurchaseStatuses;
        updatedPurchaseItemStatuses = action.callBackData.objs.purchaseItemStatuses ?? updatedPurchaseItemStatuses;
    }
    else {
        BsCore2.alertForCallBackDataErrors(action.callBackData);
    }


    action.callBackData.doCallBackFunc({
        purchase: purchase,
        purchaseItems: purchaseItems,
    });

    return {
        ...state,
        purchase: purchase,
        purchaseItems: purchaseItems,
        purchaseStatuses: updatedPurchaseStatuses,
        purchaseItemStatuses: updatedPurchaseItemStatuses
    };
};



export default purchase;