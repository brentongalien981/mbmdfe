import Bs from "../../../bs/core/Bs";
import { getEpBatchPickupInfoFormInitialData, isDispatchContainerBusyProcessing } from "./HelperFuncsB";

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

    if (!window.confirm('Are you sure about the date and time?')) { return; }

    if (isDispatchContainerBusyProcessing(container)) { return; }

    container.setState({ isSavingEpBatchPickupInfo: true });


    const data = {
        params: {
            dispatchId: container.state.dispatch.id,
            referenceString: container.state.epBatchPickupInfoFormData.referenceString,
            carrierNotes: container.state.epBatchPickupInfoFormData.carrierNotes,
            epBatchEarliestPickupDatetime: container.state.epBatchPickupInfoFormData.epBatchEarliestPickupDatetime.toUTCString(),
            epBatchLatestPickupDatetime: container.state.epBatchPickupInfoFormData.epBatchLatestPickupDatetime.toUTCString(),
        },

        doCallBackFunc: (objs) => {

            if (objs.isResultOk) {
                container.setState({
                    isSavingEpBatchPickupInfo: false,
                    epBatchPickupInfoFormData: getEpBatchPickupInfoFormInitialData(),
                    isEpBatchPickupInfoFormModalShown: false,
                    dispatch: objs.dispatch
                });
            }
            else {
                container.setState({ isSavingEpBatchPickupInfo: false });
            }

        }
    };


    container.props.saveEpBatchPickupInfo(data);



}



export function onEpBatchPickupInfoFormModalToggle(container) {

    container.setState({ isEpBatchPickupInfoFormModalShown: !container.state.isEpBatchPickupInfoFormModalShown });
};



export function onEpBatchPickupInfoFormModalClose(container) {

    container.setState({ isEpBatchPickupInfoFormModalShown: false });
};



export function onEpBatchPickupInfoInputChange(container, e) {

    const targetName = e.target.name;
    const targetVal = e.target.value;

    let updatedEpBatchPickupInfoFormData = container.state.epBatchPickupInfoFormData;
    updatedEpBatchPickupInfoFormData[targetName] = targetVal;

    container.setState({ epBatchPickupInfoFormData: updatedEpBatchPickupInfoFormData });

};



export const onPickupDateChange = (container, calendarName, moment) => {

    let updatedEpBatchPickupInfoFormData = container.state.epBatchPickupInfoFormData;

    switch (calendarName) {
        case 'EpBatchPickupInfoFormCalendar-earliestPickup':
            updatedEpBatchPickupInfoFormData.epBatchEarliestPickupDatetime = moment._d;
            break;
        case 'EpBatchPickupInfoFormCalendar-latestPickup':
            updatedEpBatchPickupInfoFormData.epBatchLatestPickupDatetime = moment._d;
            break;
    }

    container.setState({ epBatchPickupInfoFormData: updatedEpBatchPickupInfoFormData });
};