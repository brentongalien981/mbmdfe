export const onPageNumChange = (container, e) => {

    const newPageNum = e.target.value;

    if (container.state.isReadingPurchases) { return; }

    container.setState({ pageNum: newPageNum });

};