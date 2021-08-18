import React from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import { Spinner } from "reactstrap";
import { PURCHASES_TABLE_COLUMNS } from "../constants/consts";



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