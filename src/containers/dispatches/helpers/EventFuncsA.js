import { removeReactComponentsFromDispatch } from "./HelperFuncsA";



export const onDispatchSave = (container) => {

    if (container.state.isSavingDispatch) { return; }

    container.setState({ isSavingDispatch: true });

    const data = {
        params: { ...removeReactComponentsFromDispatch(container.state.dispatch) },
        doCallBackFunc: (objs) => {
            container.setState({ 
                isSavingDispatch: false,
                savedDispatchId: objs.savedDispatchId
            });
        }
    };

    container.props.saveDispatch(data);

};