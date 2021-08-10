import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Col, Row, Spinner } from 'reactstrap';
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


    return (
        <Row className="my-4 py-4">
            <Col sm="12">
                <h2>Order Items</h2>
            </Col>

            {mainContent}
        </Row>
    );
};