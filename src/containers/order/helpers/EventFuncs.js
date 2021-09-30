import Bs from "../../../bs/core/Bs";
import { extractDefaultOrderItemStatus, isOrderContainerBusyProcessing, removeReactComponentsFromOrder, removeReactComponentsFromOrderItem } from "./HelperFuncsA";

export const onOrderInputChange = (container, e) => {

    if (container.state.isReadingOrder || container.state.isUpdatingOrder) { return; }

    const targetName = e.target.name;
    let targetVal = e.target.value;

    if (e.target.type === 'date') {
        targetVal += ' 00:00:00';
    }

    let updatedOrder = container.state.order;
    updatedOrder[targetName] = targetVal;

    container.setState({ order: updatedOrder });

};



export const onOrderUpdate = (container) => {

    if (container.state.isReadingOrder || container.state.isUpdatingOrder || container.state.isRefreshingOrder) { return; }

    container.setState({ isUpdatingOrder: true });

    const data = {
        params: { ...removeReactComponentsFromOrder(container.state.order) },
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
        params: { ...removeReactComponentsFromOrder(container.state.order) },
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

    if (container.state.isSavingOrderItem || container.state.isAssociatingToPurchases) { return; }

    container.setState({ isSavingOrderItem: true });

    const orderItemFormAction = container.state.orderItemFormAction;

    const orderItemToEdit = {
        ...removeReactComponentsFromOrderItem(container.state.orderItemToEdit),
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



export const onAssociateToPurchases = (container) => {

    if (container.state.isSavingOrderItem || container.state.isAssociatingToPurchases) { return; }

    container.setState({ isAssociatingToPurchases: true });

    const data = {
        params: { orderId: container.state.order.id },
        doCallBackFunc: (objs) => {
            container.setState({
                isAssociatingToPurchases: false,
                orderItems: objs.orderItems
            });
        }
    };

    container.props.associateToPurchases(data);
};



export const onOrderRefresh = (container) => {

    if (container.state.isUpdatingOrder || container.state.isRefreshingOrder) { return; }

    container.setState({ isRefreshingOrder: true });

    const data = {
        params: { orderId: container.state.order.id },
        doCallBackFunc: (objs) => {
            container.setState({
                order: objs.order,
                isRefreshingOrder: false
            });
        }
    };

    container.props.refreshOrder(data);
};



export const onCheckPossibleShipping = (container) => {

    if (isOrderContainerBusyProcessing(container)) { return; }

    container.setState({ isCheckingPossibleShipping: true });

    const data = {
        params: { orderId: container.state.order.id },
        doCallBackFunc: (objs) => { container.setState({ isCheckingPossibleShipping: false }); }
    };

    container.props.checkPossibleShipping(data);
};



export const onBuyShippingLabel = (container) => {

    if (isOrderContainerBusyProcessing(container)) { return; }

    const selectedShippingRateId = container.state.selectedShippingRateId;
    if (selectedShippingRateId === '') { return; }

    if (!window.confirm('Are you sure?')) { return; }


    container.setState({ isBuyingShippingLabel: true });


    const data = {
        params: {
            orderId: container.state.order.id,
            selectedShippingRateId: selectedShippingRateId,
            probableShippingId: container.props.probableShippingId
        },
        doCallBackFunc: (objs) => {
            container.setState({
                isBuyingShippingLabel: false
            });
        }
    };

    container.props.buyShippingLabel(data);
};



export const onSelectedShippingRateChange = (container, e) => {

    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    const data = { selectedShippingRateId: value };
    container.setState(data);

    container.props.changeSelectedShippingRate(data);

}



export const onSelectedDispatchIdChange = (container, e) => {

    const targetName = e.target.name;
    let targetVal = e.target.value;

    container.setState({ selectedDispatchId: targetVal });

};