import { extractDefaultOrderItemStatus } from "./HelperFuncsA";

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
        orderItemToEdit: orderItemToEdit,
        orderItemFormAction: 'edit'
    });
};



export const onOrderItemCreate = (container) => {

    if (container.state.isSavingOrderItem) { return; }

    container.setState({ 
        isEditingOrderItem: true,
        orderItemToEdit: {},
        orderItemFormAction: 'create'
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



export const onOrderItemSave = (container) => {

    if (container.state.isSavingOrderItem) { return; }

    container.setState({ isSavingOrderItem: true });

    const orderItemFormAction = container.state.orderItemFormAction;

    const orderItemToEdit = {
        ...container.state.orderItemToEdit,
        orderId: container.state.order.id,
        status_code: container.state.orderItemToEdit.status_code ?? extractDefaultOrderItemStatus(container.props.orderItemStatuses).code
    };

    const data = {
        localParams: { orderItemFormAction: orderItemFormAction },
        params: { ...orderItemToEdit },
        doCallBackFunc: (objs) => {
            container.setState({ 
                orderItems: objs.updatedOrderItems,
                isSavingOrderItem: false 
            });
        }
    };

    container.props.saveOrderItem(data);

};