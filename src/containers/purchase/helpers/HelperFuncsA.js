import { NOT_INCLUDED_FIELDS_FOR_CREATE_PURCHASE_FORM, PURCHASE_FORM_FIELDS, PURCHASE_ITEM_FORM_FIELDS } from "../constants/consts";

export const readPurchase = (container) => {

    if (container.state.isReadingPurchase) { return; }

    container.setState({ isReadingPurchase: true });


    const data = {
        params: {
            purchaseId: container.props.match.params.id
        },
        doCallBackFunc: (objs) => {

            container.setState({
                isReadingPurchase: false,
                purchase: objs.purchase,
                purchaseItems: objs.purchaseItems
            });
        }
    };

    container.props.readPurchase(data);

};



export function shouldNotIncludeForPurchaseForm(fieldName, formActionName = 'create') {

    if (formActionName === 'update') { return false; }

    if (NOT_INCLUDED_FIELDS_FOR_CREATE_PURCHASE_FORM.includes(fieldName)) { 
        return true;
    }
    return false;
}



export const extractDefaultPurchaseItemStatus = (statuses) => {

    for (const s of statuses) {
        if (s.name === 'DEFAULT') { return s; }
    }

    return null;

};



export function extractPurePurchaseItemObj(purchaseItem) {

    let purePurchaseItem = {};

    for (const field of PURCHASE_ITEM_FORM_FIELDS) {
        purePurchaseItem[field.field] = purchaseItem[field.field];
    }

    return purePurchaseItem;
}



export function removeReactComponentsFromPurchase(purchase) {

    let updatedPurchase = {};

    for (const field of PURCHASE_FORM_FIELDS) {
        if (field.isMetaField) { continue; }
        updatedPurchase[field.field] = purchase[field.field];
    }

    return updatedPurchase;
}