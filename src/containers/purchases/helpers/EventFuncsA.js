import { getResetPurchaseFilters } from "./HelperFuncsA";

export const onPageNumChange = (container, e) => {

    const newPageNum = e.target.value;

    if (container.state.isReadingPurchases) { return; }

    container.setState({ pageNum: newPageNum });

};



export const onPageNumEnter = (container, e) => {

    if (e.key === 'Enter') {

        e.preventDefault();

        const newPageNum = container.state.pageNum;

        if (container.state.isReadingPurchases) { return; }
        if (newPageNum < 1) { return; }
        if (newPageNum > container.props.paginationData.numOfPages) { return; }

        container.setState({ shouldRefreshPurchases: true });
    }

};



export const onPageNavBtnClick = (container, prevOrNext) => {

    if (container.state.isReadingPurchases) { return; }

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
        shouldRefreshPurchases: true
    });
};



export const onPurchaseFilterInputChange = (container, e) => {

    const targetName = e.target.name;
    const targetVal = e.target.value;

    let updatedPurchaseFilters = container.state.purchaseFilters;
    updatedPurchaseFilters[targetName] = targetVal;

    container.setState({ purchaseFilters: updatedPurchaseFilters });

};



export const onPurchaseFiltersApply = (container) => {

    if (container.state.isReadingPurchases) { return; }

    container.setState({ 
        pageNum: 1,
        shouldRefreshPurchases: true 
    });

};



export const onPurchaseFiltersReset = (container) => {

    if (container.state.isReadingPurchases) { return; }

    container.setState({ 
        pageNum: 1,
        purchaseFilters: getResetPurchaseFilters(),
        shouldRefreshPurchases: true 
    });

};