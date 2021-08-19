import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { MinusCircle, PlusCircle } from 'react-feather';
import { Spinner } from 'reactstrap';
import Bs from '../../bs/core/Bs';
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
            expandRow={getTableExpandedRowDetails()}
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



function getTableExpandedRowDetails() {

    const minusIcon = (<MinusCircle width={16} height={16} />);
    const plusIcon = (<PlusCircle width={16} height={16} />);


    return {
        renderer: (row) => {

            let rowProps = [];

            for (const k in row) {
                if (k == 'purchaseItems') { continue; }
                rowProps.push(<li key={rowProps.length}>{k}: {row[k]}</li>);
            }

            return (<ul>{rowProps}</ul>);
        },
        showExpandColumn: true,
        expandHeaderColumnRenderer: ({ isAnyExpands }) => isAnyExpands ? (minusIcon) : (plusIcon),
        expandColumnRenderer: ({ expanded }) => expanded ? (minusIcon) : (plusIcon)
    };
};