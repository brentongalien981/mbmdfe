import React from "react";
import { ExternalLink, MinusCircle, PlusCircle } from "react-feather";
import { Link } from "react-router-dom";
import Bs from "../../../bs/core/Bs";
import BsJLS from "../../../bs/core/BsJLS";
import { INIT_DATE_FILTERS_IN_STR } from "../constants/consts";



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

        earlyDeliveryDateFilter: initialReadQueryParams?.earlyDeliveryDateFilter ?? INIT_DATE_FILTERS_IN_STR,
        lateDeliveryDateFilter: initialReadQueryParams?.lateDeliveryDateFilter ?? INIT_DATE_FILTERS_IN_STR,
        createDateFilter: initialReadQueryParams?.createDateFilter ?? INIT_DATE_FILTERS_IN_STR,
        updateDateFilter: initialReadQueryParams?.updateDateFilter ?? INIT_DATE_FILTERS_IN_STR
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

        earlyDeliveryDateFilter: INIT_DATE_FILTERS_IN_STR,
        lateDeliveryDateFilter: INIT_DATE_FILTERS_IN_STR,
        createDateFilter: INIT_DATE_FILTERS_IN_STR,
        updateDateFilter: INIT_DATE_FILTERS_IN_STR
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