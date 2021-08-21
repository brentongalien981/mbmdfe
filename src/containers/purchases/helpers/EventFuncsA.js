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