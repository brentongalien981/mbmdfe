import React from 'react';
import { Circle, Edit3, MinusCircle, PlusCircle, Trash2 } from "react-feather";
import { Button } from 'reactstrap';
import { parseDateToStr } from '../../../bmd/helpers/HelperFuncsA';
import { ORDER_FORM_FIELDS, ORDER_ITEM_FORM_FIELDS, ORDER_ITEM_STATUSES } from '../constants/consts';
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



export const addActionsPropToOrderItem = (container, oi) => {

    const actionsComponent = (
        <>
            <Button className="mr-1 mb-1" outline color="primary" size="sm">
                <Edit3 size={14} onClick={() => onOrderItemEdit(container, oi)} />
            </Button>
        </>
    );

    oi.actions = actionsComponent;

    return oi;
};



export function modifyOrderItemsForDisplay(container) {
    let modifiedOrderItems = [];

    for (const oi of container.state.orderItems) {
        let modifiedOrderItem = addColorCodedOrderItemStatus(oi);
        modifiedOrderItem = addActionsPropToOrderItem(container, oi);
        // modifiedOrderItem = addOrderLinkPropToOrder(modifiedOrderItem);

        modifiedOrderItems.push(modifiedOrderItem);
    }

    return modifiedOrderItems;
}



function addColorCodedOrderItemStatus(orderItem) {

    let color = 'black';

    switch (parseInt(orderItem.status_code)) {
        case ORDER_ITEM_STATUSES.EVALUATED_INCOMPLETELY_FOR_PURCHASE.code:
            color = 'orange';
            break;
        case ORDER_ITEM_STATUSES.PURCHASE_INCOMPLETELY_RECEIVED.code:
            color = 'red';
            break;
        case ORDER_ITEM_STATUSES.DEFAULT.code:
            color = 'white';
            break;
        case ORDER_ITEM_STATUSES.TO_BE_PURCHASED.code:
            color = 'rgb(200, 200, 200)';
            break;
        case ORDER_ITEM_STATUSES.PURCHASED.code:
        case ORDER_ITEM_STATUSES.TO_BE_PURCHASE_RECEIVED.code:
            color = 'blue';
            break;
        case ORDER_ITEM_STATUSES.PURCHASE_RECEIVED.code:
            color = 'green';
            break;
    }


    const style = {
        backgroundColor: color,
        borderRadius: '9px'
    };

    const colorCodedStatus = (<Circle size={18} className="align-middle" style={style} />);

    orderItem.colorCodedStatus = colorCodedStatus;

    return orderItem;
}



export const extractDefaultOrderItemStatus = (statuses) => {

    for (const s of statuses) {
        if (s.name === 'DEFAULT') { return s; }
    }

    return null;

};



export function removeReactComponentsFromOrder(order) {

    let updatedOrder = {};

    for (const field of ORDER_FORM_FIELDS) {
        if (field.isMetaField) { continue; }
        updatedOrder[field.field] = order[field.field];
    }

    return updatedOrder;
}



export function removeReactComponentsFromOrderItem(orderItem) {

    let updatedOrderItem = {};

    for (const field of ORDER_ITEM_FORM_FIELDS) {
        if (field.isMetaField) { continue; }
        updatedOrderItem[field.name] = orderItem[field.name];
    }

    return updatedOrderItem;
}