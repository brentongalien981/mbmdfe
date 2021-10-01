import React from "react";
import { Circle, ExternalLink, MinusCircle, PlusCircle } from "react-feather";
import { Link } from "react-router-dom";
import Bs from "../../../bs/core/Bs";
import BsJLS from "../../../bs/core/BsJLS";
import * as consts from "../constants/consts";



export const getInitialOrderReadQueryParams = () => {

    const initialReadQueryParams = BsJLS.get('orders.readQueryParams');

    return {
        pageNum: initialReadQueryParams?.pageNum ?? 1,

        orderIdFilter: initialReadQueryParams?.orderIdFilter ?? '',
        userIdFilter: initialReadQueryParams?.userIdFilter ?? '',
        stripePaymentIntentIdFilter: initialReadQueryParams?.stripePaymentIntentIdFilter ?? '',

        firstNameFilter: initialReadQueryParams?.firstNameFilter ?? '',
        lastNameFilter: initialReadQueryParams?.lastNameFilter ?? '',
        phoneFilter: initialReadQueryParams?.phoneFilter ?? '',
        emailFilter: initialReadQueryParams?.emailFilter ?? '',

        streetFilter: initialReadQueryParams?.streetFilter ?? '',
        cityFilter: initialReadQueryParams?.cityFilter ?? '',
        provinceFilter: initialReadQueryParams?.provinceFilter ?? '',
        countryFilter: initialReadQueryParams?.countryFilter ?? '',
        postalCodeFilter: initialReadQueryParams?.postalCodeFilter ?? '',

        statusFilter: initialReadQueryParams?.statusFilter ?? '',
        deliveryDaysFilter: initialReadQueryParams?.deliveryDaysFilter ?? '',

        earlyDeliveryDateFilter: initialReadQueryParams?.earlyDeliveryDateFilter ?? consts.INIT_DATE_FILTERS_IN_STR,
        lateDeliveryDateFilter: initialReadQueryParams?.lateDeliveryDateFilter ?? consts.INIT_DATE_FILTERS_IN_STR,
        createDateFilter: initialReadQueryParams?.createDateFilter ?? consts.INIT_DATE_FILTERS_IN_STR,
        updateDateFilter: initialReadQueryParams?.updateDateFilter ?? consts.INIT_DATE_FILTERS_IN_STR
    };
};



export const getResetReadQueryParams = () => {

    return {
        pageNum: 1,

        orderIdFilter: '',
        userIdFilter: '',
        stripePaymentIntentIdFilter: '',

        firstNameFilter: '',
        lastNameFilter: '',
        phoneFilter: '',
        emailFilter: '',

        streetFilter: '',
        cityFilter: '',
        provinceFilter: '',
        countryFilter: '',
        postalCodeFilter: '',

        statusFilter: '',
        deliveryDaysFilter: '',

        earlyDeliveryDateFilter: consts.INIT_DATE_FILTERS_IN_STR,
        lateDeliveryDateFilter: consts.INIT_DATE_FILTERS_IN_STR,
        createDateFilter: consts.INIT_DATE_FILTERS_IN_STR,
        updateDateFilter: consts.INIT_DATE_FILTERS_IN_STR
    };
};



export const refreshOrders = (container) => {
    if (container.state.isReadingOrders) { return; }

    container.setState({ isReadingOrders: true });


    const requestData = {
        params: { ...container.state.readQueryParams },
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
            ...container.state.readQueryParams
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



export const addOrderLinkPropsToOrders = (orders) => {

    let updatedOrders = [];

    for (const o of orders) {
        updatedOrders.push(addOrderLinkPropToOrder(o));
    }

    return updatedOrders;
};



const addOrderLinkPropToOrder = (o) => {

    const orderUrl = '/orders/' + o.id;

    const linkComponent = (
        <Link to={orderUrl} target="_blank">
            <ExternalLink size={18} className="align-middle" />
        </Link>
    );


    return {
        // order_id_link: orderUrl,
        order_id_link: linkComponent,
        ...o
    };
};



export function modifyOrdersForDisplay(orders) {
    let modifiedOrders = [];

    for (const o of orders) {
        let modifiedOrder = addColorCodedOrderStatus(o);
        modifiedOrder = addOrderLinkPropToOrder(modifiedOrder);
        // modifiedOrder = addRelevantOrderItemPropStats(modifiedOrder);

        modifiedOrders.push(modifiedOrder);
    }

    return modifiedOrders;
}



function addRelevantOrderItemPropStats(order) {
    let modifiedOrder = order;

    let numOfOrderItems = order.orderItems.length;
    let totalQuantityOfOrderItems = 0;

    let numOfOrderItemsIncompletelyReceived = 0;
    let numOfOrderItemsToBePurchased = 0;
    let numOfOrderItemsToBeReceived = 0;
    let numOfOrderItemsReceived = 0;
    let numOfOrderItemsWithOtherStatus = 0;


    for (const oi of order.orderItems) {

        totalQuantityOfOrderItems += oi.quantity;

        // switch (pi.statusCode) {
        //     case PURCHASE_STATUSES.PURCHASE_INCOMPLETELY_RECEIVED.code:
        //         ++numOfOrderItemsIncompletelyReceived;
        //         break;
        //     case PURCHASE_STATUSES.TO_BE_PURCHASED.code:
        //         ++numOfOrderItemsToBePurchased;
        //         break;
        //     case PURCHASE_STATUSES.TO_BE_PURCHASE_RECEIVED.code:
        //         ++numOfOrderItemsToBeReceived;
        //         break;
        //     case PURCHASE_STATUSES.PURCHASE_RECEIVED.code:
        //         ++numOfOrderItemsReceived;
        //         break;
        //     default:
        //         ++numOfOrderItemsWithOtherStatus;
        //         break;
        // }
    }


    modifiedOrder.numOfOrderItems = numOfOrderItems;
    modifiedOrder.totalQuantityOfOrderItems = totalQuantityOfOrderItems;

    modifiedOrder.numOfOrderItemsIncompletelyReceived = numOfOrderItemsIncompletelyReceived + ' / ' + numOfOrderItems;
    modifiedOrder.numOfOrderItemsToBePurchased = numOfOrderItemsToBePurchased + ' / ' + numOfOrderItems;
    modifiedOrder.numOfOrderItemsToBeReceived = numOfOrderItemsToBeReceived + ' / ' + numOfOrderItems;
    modifiedOrder.numOfOrderItemsReceived = numOfOrderItemsReceived + ' / ' + numOfOrderItems;
    modifiedOrder.numOfOrderItemsWithOtherStatus = numOfOrderItemsWithOtherStatus + ' / ' + numOfOrderItems;


    return modifiedOrder;
}



export function addColorCodedOrderStatus(order) {

    let color = 'black';


    switch (parseInt(order.status_code)) {
        // Order Error
        case consts.PAYMENT_METHOD_NOT_CHARGED:
        case consts.INVALID_CART:
        case consts.CART_HAS_NO_ITEM:
        case consts.INVALID_PAYMENT_METHOD:
        case consts.ORDER_FINALIZATION_FAILED:
        case consts.ORDER_FINALIZATION_EXCEPTION:
        case consts.ORDER_FINALIZATION_INCOMPLETE:
        case consts.POSSIBLE_DOUBLE_PAYMENT:
        case consts.MISSING_STRIPE_PAYMENT_INTENT_LINK:
        case consts.CUSTOMER_HAS_TO_BE_REFUNDED:
            color = 'red';
            break;

        // Payment Processing
        case consts.WAITING_FOR_PAYMENT:
        case consts.PAYMENT_METHOD_VALIDATED:
        case consts.STRIPE_PAYMENT_INTENT_CREATED:
        case consts.START_OF_FINALIZING_ORDER_WITH_PREDEFINED_PAYMENT:
        case consts.DB_CART_CREATED:
        case consts.CACHE_CART_UPDATED_TO_LATEST_VERSION:
        case consts.DB_CART_ITEMS_CREATED:

        // Payment Received            
        case consts.PAYMENT_METHOD_CHARGED:
        case consts.START_OF_FINALIZING_ORDER:
        case consts.VALID_CART:
        case consts.CART_HAS_ITEM:
        case consts.CART_CHECKEDOUT_OK:
            color = 'white';
            break;

        // Order Confirmed            
        case consts.ORDER_CREATED:
        case consts.ORDER_ITEMS_CREATED:
        case consts.INVENTORY_QUANTITIES_UPDATED:
        case consts.INVENTORY_ORDER_LIMITS_UPDATED:
        case consts.CACHE_CART_RESET_OK:
        case consts.ORDER_CONFIRMED:
        case consts.ORDER_DETAILS_EMAILED_TO_USER:
            color = 'rgb(200, 200, 200)';
            break;

        // Order Processing
        case consts.PROCESSING_FOR_SHIPMENT:
        case consts.BEING_SHIPPED:
        case consts.BEING_EVALUATED_FOR_PURCHASE:
        case consts.TO_BE_PURCHASED:
            color = 'blue';
            break;


        // Order has been purchased
        case consts.PURCHASED:
        case consts.TO_BE_PURCHASE_RECEIVED:
        case consts.PURCHASE_RECEIVED:
        case consts.IN_STOCK:
        case consts.TO_BE_PACKAGED:
        case consts.PACKAGED:
        case consts.TO_BE_DISPATCHED:
        case consts.BEING_PACKAGED:
        case consts.SHIPPING_LABEL_BOUGHT:
            color = 'rgb(52, 232, 235)';
            break;

        // Order Processing - with hiccup
        case consts.EVALUATED_INCOMPLETELY_FOR_PURCHASE:
        case consts.PURCHASE_INCOMPLETELY_RECEIVED:
            color = 'orange';
            break;

        // Order Dispatched            
        case consts.DISPATCHED:
        case consts.DELIVERED:
        case consts.FINALIZED:
            color = 'green';
            break;

        // Errors, Refunds and Cancellation
        case consts.CANCELLED:
        case consts.ORDER_APPLIED_FOR_REFUND:
        case consts.ORDER_TO_BE_PICKED_UP_BY_CARRIER_FOR_REFUND:
        case consts.ORDER_BEING_RETURNED_FOR_REFUND:
        case consts.RETURNED:
        case consts.MISSING_ORDER_ITEM:
        case consts.BROKEN_ORDER_ITEM:
        case consts.TOO_LATE_TO_DELIVER:
        case consts.TOO_EXPENSIVE_TO_DELIVER:
        case consts.OTHER_ORDER_PROBLEMS:
            color = 'red';
            break;
    }



    const style = {
        backgroundColor: color,
        borderRadius: '9px'
    };
    const colorCodedStatus = (<Circle size={18} className="align-middle" style={style} />);

    order.colorCodedStatus = colorCodedStatus;

    return order;

}