import Bs from "../../../bs/core/Bs";
import { isDispatchContainerBusyProcessing } from "./HelperFuncsB";

export const onDispatchUpdate = (container) => {

    Bs.log('TODO: onDispatchUpdate()');
    // if (container.state.isSavingDispatch) { return; }

    // container.setState({ isSavingDispatch: true });

    // const data = {
    //     params: { ...removeReactComponentsFromDispatch(container.state.dispatch) },
    //     doCallBackFunc: (objs) => {
    //         container.setState({ 
    //             isSavingDispatch: false,
    //             savedDispatchId: objs.savedDispatchId
    //         });
    //     }
    // };

    // container.props.saveDispatch(data);

};



export function onRemoveOrderFromDispatch(container, event, orderId) {

    event.stopPropagation();

    if (isDispatchContainerBusyProcessing(container)) { return; }
    
    if (!window.confirm('Are you sure you wanna remove order from dispatch?')) { return; }


    container.setState({ 
        isRemovingOrderFromDispatch: true,
        orderIdBeingRemovedFromDispatch: orderId
    });


    const data = {
        params: { 
            orderId: orderId,
            dispatchId: container.state.dispatch.id
        },
        doCallBackFunc: (objs) => {
            container.setState({
                isRemovingOrderFromDispatch: false,
                orderIdBeingRemovedFromDispatch: 0,
                dispatch: objs.dispatch
            });
        }
    };

    container.props.removeOrderFromDispatch(data);


}



export function onEpBatchPickupFormShow(container) {

    container.setState({ isEpBatchPickupInfoFormModalShown: true });

}



export function onEpBatchPickupInfoSave(container) {

    Bs.log('TODO: onEpBatchPickupInfoSave()');

}



export function onEpBatchPickupInfoFormModalToggle(container) {

    container.setState({ isEpBatchPickupInfoFormModalShown: !container.state.isEpBatchPickupInfoFormModalShown });
};



export function onEpBatchPickupInfoFormModalClose(container) {

    container.setState({ isEpBatchPickupInfoFormModalShown: false });
};