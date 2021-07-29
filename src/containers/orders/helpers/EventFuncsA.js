import Bs from "../../../bs/core/Bs";
import { readOrders } from "./HelperFuncsA";



export const onPageNumEnter = (container, e) => {

    if (e.key === 'Enter') {

        e.preventDefault();

        const newPageNum = container.state.readQueryParams.pageNum;

        if (container.state.isReadingOrders) { return; }
        if (newPageNum < 1) { return; }
        if (newPageNum > container.props.paginationData.numOfPages) { return; }

        container.setState({ shouldRefreshOrders: true });
    }

};



export const onPageNumChange = (container, e) => {

    const newPageNum = e.target.value;

    if (container.state.isReadingOrders) { return; }

    let updatedReadQueryParams = container.state.readQueryParams;
    updatedReadQueryParams.pageNum = newPageNum;

    container.setState({ readQueryParams: updatedReadQueryParams });

};



export const onPageNavBtnClick = (container, prevOrNext) => {

    if (container.state.isReadingOrders) { return; }

    let updatedReadQueryParams = container.state.readQueryParams;
    let newPageNum = updatedReadQueryParams.pageNum;

    if (prevOrNext == 'previous') {
        if (newPageNum == 1) { return; }
        --newPageNum;
    }
    else {
        ++newPageNum;
    }


    if (newPageNum > container.props.paginationData.numOfPages) { return; }


    updatedReadQueryParams.pageNum = newPageNum;

    container.setState({
        readQueryParams: updatedReadQueryParams,
        shouldRefreshOrders: true
    });
};