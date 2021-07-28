import Bs from "../../../bs/core/Bs";
import { readOrders } from "./HelperFuncsA";



export const onPageNumEnter = (container, e) => {

    if (e.key === 'Enter') {

        e.preventDefault();

        const newPageNum = container.state.pageNum;

        if (container.state.isReadingOrders) { return; }
        if (newPageNum < 1) { return; }
        if (newPageNum > container.props.paginationData.numOfPages) { return; }

        container.setState({ shouldRefreshOrders: true });
    }

};



export const onPageNumChange = (container, e) => {

    const newPageNum = e.target.value;

    if (container.state.isReadingOrders) { return; }

    container.setState({ pageNum: newPageNum });

};



export const onPageNavBtnClick = (container, prevOrNext) => {

    if (container.state.isReadingOrders) { return; }

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
        shouldRefreshOrders: true
    });
};