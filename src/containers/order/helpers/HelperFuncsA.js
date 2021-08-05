import React from 'react';
import { MinusCircle, PlusCircle } from "react-feather";



export const readOrder = (container) => {

    if (container.state.isReadingOrder) { return; }

    container.setState({ isReadingOrder: true });


    const data = {
        params: {
            orderId: container.props.match.params.id
        },
        doCallBackFunc: (objs) => {
            container.setState({ 
                isReadingOrder: false,
                order: objs.order,
                orderItems: objs.orderItems
            });
        }
    };

    container.props.readOrder(data);

};



export const getOrderItemsTableExpandedRowDetails = () => {

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