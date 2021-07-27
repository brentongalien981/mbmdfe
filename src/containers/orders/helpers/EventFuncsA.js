import Bs from "../../../bs/core/Bs";
import { readOrders } from "./HelperFuncsA";

export const onPageNumChange = () => {
    
};



export const onPageNavBtnClick = (container, prevOrNext) => {

    if (container.state.isReadingOrders) { return; }
    if (container.state.pageNum >= container.props.paginationData.numOfPages) { return; }


    let newPageNum = container.state.pageNum;

    if (prevOrNext == 'previous') {
        if (newPageNum == 1) { return; }
        --newPageNum;
    }
    else {
        ++newPageNum;
    }


    container.setState({ pageNum: newPageNum });


    const data = {
        pageNum: newPageNum
    };

    readOrders(container, data);
};