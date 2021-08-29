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
    purchaseItemStatuses: [FIRST_DEFAULT_PURCHASE_STATUS],
    hasPurchaseBeenSaved: false
};



/** REDUCER */
const purchase = (state = initialState, action) => {
    switch (action.type) {
        case actions.RESET_CREATE_PURCHASE_FLAGS: return resetCreatePurchaseFlags(state, action);        
        case actions.ON_READ_PURCHASE_RETURN: return onReadPurchaseReturn(state, action);
        case actions.ON_SAVE_PURCHASE_RETURN: return onSavePurchaseReturn(state, action);
        case actions.ON_UPDATE_PURCHASE_RETURN: return onUpdatePurchaseReturn(state, action);
        case actions.ON_SAVE_PURCHASE_ITEM_RETURN: return onSavePurchaseItemReturn(state, action);        
        default: return state;
    }
}



/** HELPER FUNCS */



/** NORMAL FUNCS */
const onUpdatePurchaseReturn = (state, action) => {

    if (!action.callBackData.isResultOk) {

        const resultCode = action.callBackData.resultCode;
        if (resultCode) {
            alert(resultCode.readableMessage);
        } else {
            BsCore2.alertForCallBackDataErrors(action.callBackData);
        }        
    }


    action.callBackData.doCallBackFunc();


    return {
        ...state
    };
};



const onReadPurchaseReturn = (state, action) => {

    let purchase = {};
    let purchaseItems = [];
    let updatedPurchaseStatuses = state.purchaseStatuses;
    let updatedPurchaseItemStatuses = state.purchaseItemStatuses;

    if (action.callBackData.isResultOk) {

        purchase = action.callBackData.objs.purchase;

        purchaseItems = action.callBackData.objs.purchase.purchaseItems;

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



const onSavePurchaseReturn = (state, action) => {

    let hasPurchaseBeenSaved = false;
    let savedPurchaseId = 0;


    if (action.callBackData.isResultOk) {
        hasPurchaseBeenSaved = true;
        savedPurchaseId = action.callBackData.objs.purchase?.id;
    } else {
        BsCore2.alertForCallBackDataErrors(action.callBackData);
    }


    action.callBackData.doCallBackFunc({
        savedPurchaseId: savedPurchaseId
    });


    return {
        ...state,
        hasPurchaseBeenSaved: hasPurchaseBeenSaved
    };
};



const onSavePurchaseItemReturn = (state, action) => {

    let updatedPurchaseItems = state.purchaseItems;

    if (action.callBackData.isResultOk) {

        const savedPurchaseItem = action.callBackData.objs.savedPurchaseItem ?? {};

        if (action.callBackData.localParams.purchaseItemFormAction === 'create') {
            updatedPurchaseItems = [...updatedPurchaseItems, savedPurchaseItem];
        } else {
            // BMD-TODO
            // updatedOrderItems = replaceUpdatedOrderItem(updatedOrderItems, savedOrderItem);
        }

    } else {

        const resultCode = action.callBackData.resultCode;

        if (resultCode) {
            alert(resultCode.readableMessage);
        } else {
            BsCore2.alertForCallBackDataErrors(action.callBackData);
        }        
    }


    action.callBackData.doCallBackFunc({ updatedPurchaseItems: updatedPurchaseItems });


    return {
        ...state,
        purchaseItems: updatedPurchaseItems
    };
};



const resetCreatePurchaseFlags = (state, action) => {

    return {
        ...state,
        hasPurchaseBeenSaved: false
    };
};



export default purchase;