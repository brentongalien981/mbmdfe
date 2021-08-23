import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Link, PlusSquare } from 'react-feather';
import { Button, Col, Row, Spinner } from 'reactstrap';
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
                    data={props.purchaseItems ?? []} // BMD-TODO: Set the purchase-item-row's action-btn                    
                    // expandRow={getOrderItemsTableExpandedRowDetails()} // BMD-TODO
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
                
                <Button className="mb-2 mr-2" color="primary">
                    <PlusSquare size="18" /> add purhase-item
                </Button>
            </Col>

            {mainContent}
        </Row>
    );
};