export const onOrderInputChange = (container, e) => {

    if (container.state.isReadingOrder || container.state.isUpdatingOrder) { return; }

    const targetName = e.target.name;
    const targetVal = e.target.value;

    let updatedOrder = container.state.order;
    updatedOrder[targetName] = targetVal;

    container.setState({ order: updatedOrder });

};



export const onOrderUpdate = (container) => {

    if (container.state.isReadingOrder || container.state.isUpdatingOrder) { return; }

    container.setState({ isUpdatingOrder: true });

    const data = {
        params: { ...container.state.order },
        doCallBackFunc: () => {
            container.setState({ isUpdatingOrder: false });
        }
    };

    container.props.updateOrder(data);

};



export const onOrderSave = (container) => {

    if (container.state.isSavingOrder) { return; }

    container.setState({ isSavingOrder: true });

    const data = {
        params: { ...container.state.order },
        doCallBackFunc: () => {
            container.setState({ isSavingOrder: false });
        }
    };

    container.props.saveOrder(data);

};



export const onOrderItemEdit = (container, orderItemToEdit) => {

    if (container.state.isSavingOrderItem) { return; }

    container.setState({ 
        isEditingOrderItem: true,
        orderItemToEdit: orderItemToEdit
    });
};



export const onOrderItemFormModalToggle = (container) => {
    container.setState({ 
        isEditingOrderItem: false,
    });
};



export const onOrderItemInputChange = (container, e) => {

    const targetName = e.target.name;
    const targetVal = e.target.value;

    let updatedOrderItem = container.state.orderItemToEdit;
    updatedOrderItem[targetName] = targetVal;

    container.setState({ orderItemToEdit: updatedOrderItem });

};