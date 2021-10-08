import Bs from "../../../bs/core/Bs";
import { getEpBatchPickupInfoFormInitialData, isDispatchContainerBusyProcessing } from "./HelperFuncsB";



export function onDispatchInputChange(container, e) {

    const targetName = e.target.name;
    const targetVal = e.target.value;

    let updatedDispatch = container.state.dispatch;
    updatedDispatch[targetName] = targetVal;

    container.setState({ dispatch: updatedDispatch });

};



export const onDispatchUpdate = (container) => {

    if (isDispatchContainerBusyProcessing(container)) { return; }

    container.setState({ isUpdatingDispatch: true });


    const data = {
        params: {
            dispatchId: container.state.dispatch.id,
            dispatchStatusCode: container.state.dispatch.statusCode
        },
        doCallBackFunc: (objs) => {
            container.setState({ 
                isUpdatingDispatch: false,
                dispatch: (objs.isResultOk ? objs.dispatch : container.state.dispatch)
            });
        }
    };

    container.props.updateDispatch(data);

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



export function onChoosePickupRate(container) {

    container.setState({ isEpPickupRateOptionsModalShown: true });

};



export function onPickupRateOptionChange(container, e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    container.setState({ selectedPickupRateId: value });
}



export function onBuyPickupRate(container) {

    if (container.state.selectedPickupRateId === '') { alert('Please select a Pickup Rate.'); return; }
    if (!window.confirm('Are you sure?')) { return; }
    if (isDispatchContainerBusyProcessing(container)) { return; }

    container.setState({ isBuyingPickupRate: true });


    const data = {
        params: {
            dispatchId: container.state.dispatch.id,
            epPickupId: container.props.epBatch?.pickup?.id,
            epPickupRateId: container.state.selectedPickupRateId
        },

        doCallBackFunc: (objs) => {

            if (objs.isResultOk) {
                container.setState({
                    isBuyingPickupRate: false,
                    isEpPickupRateOptionsModalShown: false,
                    dispatch: objs.dispatch
                });
            }
            else {
                container.setState({ isBuyingPickupRate: false });
            }

        }
    };


    container.props.buyPickupRate(data);

}



export function onCancelPickup(container) {

    if (!window.confirm('Are you sure?')) { return; }
    if (isDispatchContainerBusyProcessing(container)) { return; }

    container.setState({ isCancellingPickup: true });


    const data = {
        params: {
            dispatchId: container.state.dispatch.id,
            epPickupId: container.props.epBatch?.pickup?.id
        },

        doCallBackFunc: (objs) => {

            if (objs.isResultOk) {
                container.setState({
                    isCancellingPickup: false,
                    dispatch: objs.dispatch
                });
            }
            else {
                container.setState({ isCancellingPickup: false });
            }

        }
    };


    container.props.cancelPickup(data);

}



export function onGenerateBatchLabels(container) {

    if (!window.confirm('Are all shipments batched?')) { return; }
    if (isDispatchContainerBusyProcessing(container)) { return; }

    container.setState({ isGeneratingBatchLabels: true });


    const data = {
        params: {
            dispatchId: container.state.dispatch.id,
            epBatchId: container.props.epBatch?.id
        },

        doCallBackFunc: (objs) => {

            if (objs.isResultOk) {
                container.setState({
                    isGeneratingBatchLabels: false,
                    dispatch: objs.dispatch
                });
            }
            else {
                container.setState({ isGeneratingBatchLabels: false });
            }

        }
    };


    container.props.generateBatchLabels(data);

}