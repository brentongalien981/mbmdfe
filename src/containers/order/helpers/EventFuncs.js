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
    
};