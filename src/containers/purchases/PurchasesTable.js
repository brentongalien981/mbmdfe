import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Spinner } from 'reactstrap';
import { PURCHASES_TABLE_COLUMNS } from './constants/consts';



export const PurchasesTable = (props) => {

    let mainContent = (
        <BootstrapTable
            bootstrap4
            bordered={false}
            keyField="id"
            // data={helperFuncs.addOrderLinkPropsToOrders(this.props.orders)}
            data={modifyPurchasesForDisplay(props.purchases)}
            columns={PURCHASES_TABLE_COLUMNS}
        // expandRow={helperFuncs.getTableExpandedRowDetails()}
        />
    );

    if (props.isReadingPurchases) {
        mainContent = (<Spinner />);
    }


    return (
        <div className="position-relative purchases-table-section p-2">
            <div className="chat-messages p-4 purchases-table-container">
                {mainContent}
            </div>
        </div>
    );
};



function modifyPurchasesForDisplay(purchases) {
    let modifiedPurchases = [];

    for (const p of purchases) {
        modifiedPurchases.push(replaceNullValsWithSlashes(p));    
    }

    return modifiedPurchases;
}



function replaceNullValsWithSlashes(purchase) {

    let p = {};

    for (const k in purchase) {
        let v = purchase[k];
        if (!v) {
            v = '-';
        }
        p[k] = v;
    }

    return p;
}