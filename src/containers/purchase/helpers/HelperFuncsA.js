import { NOT_INCLUDED_FIELDS_FOR_CREATE_PURCHASE_FORM } from "../constants/consts";

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