import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Link, PlusSquare } from 'react-feather';
import { Button, Col, Row, Spinner } from 'reactstrap';
import { ORDER_ITEM_TABLE_COLUMNS } from './constants/consts';
import { getOrderItemsTableExpandedRowDetails } from './helpers/HelperFuncsA';



export const OrderItemsTable = (props) => {

    let mainContent = (
        <Col sm="12">
            <div className="order-items-table-container p-4">
                <BootstrapTable
                    bootstrap4
                    bordered={false}
                    keyField="id"
                    data={props.orderItems}
                    columns={ORDER_ITEM_TABLE_COLUMNS}
                    expandRow={getOrderItemsTableExpandedRowDetails()}
                />
            </div>
        </Col>
    );

    if (props.isReadingOrder) {
        mainContent = (
            <Col sm="12">
                <Spinner />
            </Col>
        );
    }


    const orderItemLabelStyle = {
        display: 'inline-block'
    };



    let associateToPurchasesBtnContent = (<><Link size="18" /> associate to purchases</>);
    if (props.isAssociatingToPurchases) {
        associateToPurchasesBtnContent = (<Spinner size="sm" />)
    }


    return (
        <Row className="my-4 py-4">
            <Col sm="12" className="mb-2">
                <h2 style={orderItemLabelStyle} className="mr-2">Order Items</h2>
                
                <Button className="mb-2 mr-2" color="primary" onClick={props.onOrderItemCreate}>
                    <PlusSquare size="18" /> add order-item
                </Button>

                <Button className="mb-2" color="primary" onClick={props.onAssociateToPurchases}>
                    {associateToPurchasesBtnContent}
                </Button>
            </Col>

            {mainContent}
        </Row>
    );
};