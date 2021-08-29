import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Circle, Edit3, Link, MinusCircle, PlusCircle, PlusSquare } from 'react-feather';
import { Button, Col, Row, Spinner } from 'reactstrap';
import { PURCHASE_STATUSES } from '../purchases/constants/consts';
import { PURCHASE_ITEMS_TABLE_COLUMNS } from './constants/consts';
import './PurchaseItemsTable.css';



export const PurchaseItemsTable = (props) => {

    let mainContent = (
        <Col sm="12">
            <div className="purchase-items-table-container p-4">
                <BootstrapTable
                    bootstrap4
                    bordered={false}
                    keyField="id"
                    columns={PURCHASE_ITEMS_TABLE_COLUMNS}
                    data={modifyPurchaseItems(props)}
                    expandRow={getPurchaseItemsTableExpandedRowDetails()}
                />
            </div>
        </Col>
    );

    
    if (props.isReadingPurchase) {
        mainContent = (
            <Col sm="12">
                <Spinner />
            </Col>
        );
    }


    return (
        <Row className="my-4 py-4">
            <Col sm="12" className="mb-2">
                <h2 className="mr-2 purchase-item-label">Purchase Items</h2>
                
                <Button className="mb-2 mr-2" color="primary" onClick={props.onPurchaseItemCreate}>
                    <PlusSquare size="18" /> add purhase-item
                </Button>
            </Col>

            {mainContent}
        </Row>
    );
};



function modifyPurchaseItems(props) {

    const purchaseItems = props.purchaseItems ?? [];

    let modifiedPurchaseItems = [];

    for (const pi of purchaseItems) {

        let updatedPurchaseItem = addActionBtnsField(pi, props.onPurchaseItemEdit);
        updatedPurchaseItem = addColorCodedPurchaseItemStatus(updatedPurchaseItem);

        modifiedPurchaseItems.push(updatedPurchaseItem);
    }


    return modifiedPurchaseItems;
}



function addColorCodedPurchaseItemStatus(purchaseItem) {

    let color = 'black';

    switch (parseInt(purchaseItem.statusCode)) {
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

    purchaseItem.colorCodedStatus = colorCodedStatus;

    return purchaseItem;
}



function addActionBtnsField(purchaseItem, onPurchaseItemEdit) {
    
    const actionsComponent = (
        <>
            <Button className="mr-1 mb-1" outline color="primary" size="sm">
                <Edit3 size={14} onClick={() => onPurchaseItemEdit(purchaseItem)} />
            </Button>
        </>
    );


    purchaseItem.actions = actionsComponent;
    return purchaseItem;
}



function getPurchaseItemsTableExpandedRowDetails() {

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
}