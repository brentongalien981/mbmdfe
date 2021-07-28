import React from "react";
import { MinusCircle, PlusCircle } from "react-feather";
import Bs from "../../../bs/core/Bs";



export const refreshOrders = (container) => {
    if (container.state.isReadingOrders) { return; }

    container.setState({ isReadingOrders: true });


    const requestData = {
        params: {
            startDate: '',
            endDate: '',
            pageNum: container.state.pageNum
        },
        doCallBackFunc: () => {
            container.setState({ 
                isReadingOrders: false,
                shouldRefreshOrders: false
            });
        }
    };

    container.props.readOrders(requestData);
};



export const readOrders = (container, data = null) => {

    if (container.state.isReadingOrders) { return; }

    container.setState({ isReadingOrders: true });


    const requestData = {
        params: {
            startDate: '',
            endDate: '',
            pageNum: data?.pageNum ?? 1
        },
        doCallBackFunc: () => {
            container.setState({ isReadingOrders: false });
        }
    };

    container.props.readOrders(requestData);

};



export const getTableExpandedRowDetails = () => {

    const minusIcon = (<MinusCircle width={16} height={16} />);
    const plusIcon = (<PlusCircle width={16} height={16} />);


    return {
        renderer: (row) => {

            let rowProps = [];
            for (const key in row) {
                rowProps.push(<li key={rowProps.length}>{key}: {row[key]}</li>);
            }

            return (<ul>{rowProps}</ul>);
        },
        showExpandColumn: true,
        expandHeaderColumnRenderer: ({ isAnyExpands }) => isAnyExpands ? (minusIcon) : (plusIcon),
        expandColumnRenderer: ({ expanded }) => expanded ? (minusIcon) : (plusIcon)
    };
};