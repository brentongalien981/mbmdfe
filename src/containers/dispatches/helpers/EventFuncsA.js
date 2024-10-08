import { getResetDispatchFilters, removeReactComponentsFromDispatch } from "./HelperFuncsA";



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



export const onPageNumChange = (container, e) => {

    if (container.state.isReadingDispatches) { return; }

    const newPageNum = e.target.value;    

    container.setState({ pageNum: newPageNum });

};



export const onPageNumEnter = (container, e) => {

    if (e.key === 'Enter') {

        e.preventDefault();

        const newPageNum = container.state.pageNum;

        if (container.state.isReadingDispatches) { return; }
        if (newPageNum == '') { return; }
        if (newPageNum < 1) { return; }
        if (newPageNum > container.props.paginationData.numOfPages) { return; }

        container.setState({ shouldRefreshDispatches: true });
    }

};



export const onPageNavBtnClick = (container, prevOrNext) => {

    if (container.state.isReadingDispatches) { return; }

    let newPageNum = container.state.pageNum;

    if (prevOrNext == 'previous') {
        if (newPageNum == 1) { return; }
        --newPageNum;
    }
    else {
        ++newPageNum;
    }


    if (newPageNum > container.props.paginationData.numOfPages) { return; }

    container.setState({
        pageNum: newPageNum,
        shouldRefreshDispatches: true
    });
};



export const onDispatchFilterInputChange = (container, e) => {

    const targetName = e.target.name;
    const targetVal = e.target.value;

    let updatedDispatchFilters = container.state.dispatchFilters;
    updatedDispatchFilters[targetName] = targetVal;

    container.setState({ dispatchFilters: updatedDispatchFilters });

};



export const onDispatchFiltersApply = (container) => {

    if (container.state.isReadingDispatches) { return; }

    container.setState({ 
        pageNum: 1,
        shouldRefreshDispatches: true 
    });

};



export const onDispatchFiltersReset = (container) => {

    if (container.state.isReadingDispatches) { return; }

    container.setState({ 
        pageNum: 1,
        dispatchFilters: getResetDispatchFilters(),
        shouldRefreshDispatches: true 
    });

};