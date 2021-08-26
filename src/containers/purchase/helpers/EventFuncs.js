import Bs from "../../../bs/core/Bs";

export const onPurchaseInputChange = (container, e) => {

    const targetName = e.target.name;
    let targetVal = e.target.value;
    
    if (e.target.type === 'date') {
        targetVal += ' 00:00:00';
    }

    let updatedPurchase = container.state.purchase;
    updatedPurchase[targetName] = targetVal;

    container.setState({ purchase: updatedPurchase });

};



export const onPurchaseSave = (container) => {

    if (container.state.isSavingPurchase) { return; }

    container.setState({ isSavingPurchase: true });

    const data = {
        params: { ...container.state.purchase },
        doCallBackFunc: (objs) => {
            container.setState({ 
                isSavingPurchase: false,
                savedPurchaseId: objs.savedPurchaseId
            });
        }
    };

    container.props.savePurchase(data);

};



export const onPurchaseUpdate = (container) => {

    if (container.state.isReadingPurchase || container.state.isUpdatingPurchase) { return; }

    container.setState({ isUpdatingPurchase: true });

    // NOTE: This step is necessary to prevent react from
    // throwing Circular shit error.
    let thePurchase = container.state.purchase;
    thePurchase.purchaseItems = null;


    const data = {
        params: { ...thePurchase },
        doCallBackFunc: () => {
            container.setState({ isUpdatingPurchase: false });
        }
    };

    container.props.updatePurchase(data);

};



export const onPurchaseItemCreate = (container) => {

    if (container.state.isSavingPurchaseItem || container.state.isUpdatingPurchaseItem) { return; }

    container.setState({
        isEditingPurchaseItem: true,
        purchaseItemToEdit: {},
        purchaseItemFormAction: 'create'
    });
};



export const onPurchaseItemFormModalToggle = (container) => {
    container.setState({
        isEditingPurchaseItem: false,
    });
};



export const onPurchaseItemInputChange = (container, e) => {

    const targetName = e.target.name;
    const targetVal = e.target.value;

    let updatedPurchaseItem = container.state.purchaseItemToEdit;
    updatedPurchaseItem[targetName] = targetVal;

    container.setState({ purchaseItemToEdit: updatedPurchaseItem });

};