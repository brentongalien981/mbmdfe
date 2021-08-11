import React from 'react';
import { Edit3, MinusCircle, PlusCircle, Trash2 } from "react-feather";
import { Button } from 'reactstrap';
import { parseDateToStr } from '../../../bmd/helpers/HelperFuncsA';
import { onOrderItemEdit } from './EventFuncs';



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
                if (key === 'actions') { continue; }
                rowProps.push(<li key={rowProps.length}>{key}: {row[key]}</li>);
            }

            return (<ul>{rowProps}</ul>);
        },
        showExpandColumn: true,
        expandHeaderColumnRenderer: ({ isAnyExpands }) => isAnyExpands ? (minusIcon) : (plusIcon),
        expandColumnRenderer: ({ expanded }) => expanded ? (minusIcon) : (plusIcon)
    };
};



export const modifyOrderWithDatePropsToFormat = (order, format = 'yyyy-mm-dd') => {

    let updatedOrder = {};

    for (const key in order) {
        let val = order[key];

        switch (key) {
            case 'earliest_delivery_date':
            case 'latest_delivery_date':
            case 'created_at':
            case 'updated_at':
                val = parseDateToStr(new Date(val), format);
                break;
        }


        updatedOrder[key] = val;
    }

    return updatedOrder;
};



export const addActionsPropToOrderItems = (container) => {

    let modifiedOrderItems = [];

    for (const oi of container.state.orderItems) {

        const actionsComponent = (
            <>
                <Button className="mr-1 mb-1" outline color="primary" size="sm">
                    <Edit3 size={14} onClick={() => onOrderItemEdit(container, oi)} />
                </Button>
            </>
        );


        const actionsProp = { actions: actionsComponent };


        modifiedOrderItems.push({
            ...oi,
            ...actionsProp
        });
    }

    return modifiedOrderItems;
};



export const extractDefaultOrderItemStatus = (statuses) => {

    for (const s of statuses) {
        if (s.name === 'DEFAULT') { return s; }
    }

    return null;

};