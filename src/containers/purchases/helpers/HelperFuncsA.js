import React from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import { Spinner } from "reactstrap";
import BsJLS from '../../../bs/core/BsJLS';
import { INITIAL_DATE_FILTER_IN_STR, PURCHASES_TABLE_COLUMNS, PURCHASE_FILTERS_FORM_FIELDS } from "../constants/consts";



export const gePurchasesTable = (purchases, isReadingPurchases) => {

    if (isReadingPurchases) {
        return (<Spinner />);
    }

    return (
        <BootstrapTable
            bootstrap4
            bordered={false}
            keyField="id"
            // data={helperFuncs.addOrderLinkPropsToOrders(this.props.orders)}
            data={purchases}
            columns={PURCHASES_TABLE_COLUMNS}
        // expandRow={helperFuncs.getTableExpandedRowDetails()}
        />
    );
};



export const getInitialPurchaseFilters = () => {

    const initialFilters = BsJLS.get('purchases.filters');

    let filters = {};

    for (const formField of PURCHASE_FILTERS_FORM_FIELDS) {
        
        const filterName = formField.name;
        const defaultFilterVal = formField.type == 'date' ? INITIAL_DATE_FILTER_IN_STR : '';
        const filterVal = initialFilters?.[filterName] ?? defaultFilterVal;

        filters[filterName] = filterVal;
    }

    return filters;
};



export const readPurchases = (container) => {

    if (container.state.isReadingPurchases) { return; }

    container.setState({ isReadingPurchases: true });


    const requestData = {
        params: {
            ...container.state.purchaseFilters
        },
        doCallBackFunc: () => {
            container.setState({ isReadingPurchases: false });
        }
    };

    container.props.readPurchases(requestData);

};