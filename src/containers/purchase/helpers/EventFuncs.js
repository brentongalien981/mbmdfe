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

    const data = {
        params: { ...container.state.purchase },
        doCallBackFunc: () => {
            container.setState({ isUpdatingPurchase: false });
        }
    };

    container.props.updatePurchase(data);

};