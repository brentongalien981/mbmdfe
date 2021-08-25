import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Circle, ExternalLink, MinusCircle, PlusCircle } from 'react-feather';
import { Link } from 'react-router-dom';
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
        modifiedPurchase = addColorCodedPurchaseStatus(modifiedPurchase);
        modifiedPurchase = setPurchaseIdLink(modifiedPurchase);

        modifiedPurchases.push(modifiedPurchase);
    }

    return modifiedPurchases;
}



function setPurchaseIdLink(purchase) {
    const purchaseLink = 'purchases/' + purchase.id;
    purchase.purchaseLink = (
        <Link to={purchaseLink} target="_blank">
            <ExternalLink size={18} className="align-middle" />
        </Link>
    );
    return purchase;
}



function addColorCodedPurchaseStatus(purchase) {

    let color = 'black';

    switch (purchase.statusCode) {
        case PURCHASE_STATUSES.EVALUATED_INCOMPLETELY_FOR_PURCHASE.code:
            color = 'orange';
            break;
        case PURCHASE_STATUSES.PURCHASE_INCOMPLETELY_RECEIVED.code:
            color = 'red';
            break;
        case PURCHASE_STATUSES.DEFAULT.code:
            color = 'white';
            break;
        case PURCHASE_STATUSES.TO_BE_PURCHASED.code:
            color = 'rgb(200, 200, 200)';
            break;
        case PURCHASE_STATUSES.PURCHASED.code:
        case PURCHASE_STATUSES.TO_BE_PURCHASE_RECEIVED.code:
            color = 'blue';
            break;
        case PURCHASE_STATUSES.PURCHASE_RECEIVED.code:
            color = 'green';
            break;
    }

    const style = {
        backgroundColor: color,
        borderRadius: '9px'
    };
    const colorCodedStatus = (<Circle size={18} className="align-middle" style={style} />);

    purchase.colorCodedStatus = colorCodedStatus;

    return purchase;
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

                currentList.push(<li key={currentList.length}>{getStyledAttribKey(k)}: {row[k]}</li>);
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



function getStyledAttribKey(key) {
    switch (key) {
        case 'numOfPurchaseItemsIncompletelyReceived': return (<span className="purchase-row-details-purchase-item-stat-attrib-key numOfPurchaseItemsIncompletelyReceived">{key}</span>);
        case 'numOfPurchaseItemsToBePurchased': return (<span className="purchase-row-details-purchase-item-stat-attrib-key numOfPurchaseItemsToBePurchased">{key}</span>);
        case 'numOfPurchaseItemsToBeReceived': return (<span className="purchase-row-details-purchase-item-stat-attrib-key numOfPurchaseItemsToBeReceived">{key}</span>);
        case 'numOfPurchaseItemsReceived': return (<span className="purchase-row-details-purchase-item-stat-attrib-key numOfPurchaseItemsReceived">{key}</span>);
        case 'numOfPurchaseItemsWithOtherStatus': return (<span className="purchase-row-details-purchase-item-stat-attrib-key numOfPurchaseItemsWithOtherStatus">{key}</span>);
        default: return key;
    }
}