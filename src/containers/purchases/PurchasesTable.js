import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { MinusCircle, PlusCircle } from 'react-feather';
import { Spinner } from 'reactstrap';
import Bs from '../../bs/core/Bs';
import { PURCHASES_TABLE_COLUMNS, PURCHASE_STATUSES } from './constants/consts';



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
        let modifiedPurchase = replaceNullValsWithSlashes(p);
        modifiedPurchase = addRelevantPurchaseItemPropStats(modifiedPurchase);
        modifiedPurchases.push(modifiedPurchase);
    }

    return modifiedPurchases;
}



function addRelevantPurchaseItemPropStats(purchase) {
    let modifiedPurchase = purchase;

    let numOfPurchaseItems = purchase.purchaseItems.length;
    let totalQuantityOfPurchaseItems = 0;

    let numOfPurchaseItemsIncompletelyReceived = 0;
    let numOfPurchaseItemsToBePurchased = 0;
    let numOfPurchaseItemsToBeReceived = 0;
    let numOfPurchaseItemsReceived = 0;
    let numOfPurchaseItemsWithOtherStatus = 0;


    for (const pi of purchase.purchaseItems) {

        totalQuantityOfPurchaseItems += pi.quantity;

        switch (pi.statusCode) {
            case PURCHASE_STATUSES.PURCHASE_INCOMPLETELY_RECEIVED.code:
                ++numOfPurchaseItemsIncompletelyReceived;
                break;
            case PURCHASE_STATUSES.TO_BE_PURCHASED.code:
                ++numOfPurchaseItemsToBePurchased;
                break;
            case PURCHASE_STATUSES.TO_BE_PURCHASE_RECEIVED.code:
                ++numOfPurchaseItemsToBeReceived;
                break;
            case PURCHASE_STATUSES.PURCHASE_RECEIVED.code:
                ++numOfPurchaseItemsReceived;
                break;
            default:
                ++numOfPurchaseItemsWithOtherStatus;
                break;
        }
    }


    modifiedPurchase.numOfPurchaseItems = numOfPurchaseItems;
    modifiedPurchase.numOfPurchaseItemsIncompletelyReceived = numOfPurchaseItemsIncompletelyReceived + ' / ' + numOfPurchaseItems;
    modifiedPurchase.numOfPurchaseItemsToBePurchased = numOfPurchaseItemsToBePurchased + ' / ' + numOfPurchaseItems;
    modifiedPurchase.numOfPurchaseItemsToBeReceived = numOfPurchaseItemsToBeReceived + ' / ' + numOfPurchaseItems;
    modifiedPurchase.numOfPurchaseItemsReceived = numOfPurchaseItemsReceived + ' / ' + numOfPurchaseItems;
    modifiedPurchase.numOfPurchaseItemsWithOtherStatus = numOfPurchaseItemsWithOtherStatus + ' / ' + numOfPurchaseItems;
    modifiedPurchase.totalQuantityOfPurchaseItems = totalQuantityOfPurchaseItems;



    return modifiedPurchase;
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

            let firstList = [];
            let secondList = [];
            let currentList = firstList;

            for (const k in row) {

                if (k === 'purchaseItems') { continue; }
                if (k === 'numOfPurchaseItems') { currentList = secondList; }

                currentList.push(<li key={currentList.length}>{k}: {row[k]}</li>);
            }

            return (
                <>
                    <ul>{firstList}</ul>
                    <ul>{secondList}</ul>
                </>
            );
        },
        showExpandColumn: true,
        expandHeaderColumnRenderer: ({ isAnyExpands }) => isAnyExpands ? (minusIcon) : (plusIcon),
        expandColumnRenderer: ({ expanded }) => expanded ? (minusIcon) : (plusIcon)
    };
};