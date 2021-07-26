import React from "react";
import { MinusCircle, PlusCircle } from "react-feather";
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