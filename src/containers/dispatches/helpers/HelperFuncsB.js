import Bs from "../../../bs/core/Bs";

export function readDispatch(container) {    
    
    if (container.state.isReadingDispatch) { return; }

    container.setState({ isReadingDispatch: true });
    

    const dispatchId = container.props.match.params.id;


    const data = {
        params: {
            dispatchId: dispatchId
        },
        doCallBackFunc: (objs) => {

            container.setState({
                dispatch: objs.dispatch,
                isReadingDispatch: false
            });
        }
    };

    container.props.readDispatch(data);

};



export function isDispatchContainerBusyProcessing(container) {

    if (
        container.state.isReadingDispatch
        || container.state.isRemovingOrderFromDispatch
    ) {
        alert('Please wait for previous process to finish.');
        return true;
    }

    return false;
}