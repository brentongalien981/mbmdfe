import Bs from "../../../bs/core/Bs";

export const readOrders = (container) => {
    const data = {
        params: {
            queryFilters: {
                startDate: '',
                endDate: '',
                pageNum: 1
            }
        },
        doCallBackFunc: () => {

        }
    };

    container.props.readOrders(data);

};