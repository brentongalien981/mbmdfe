import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Col, Row } from 'reactstrap';
import { ORDER_ITEM_TABLE_COLUMNS } from './constants/consts';
import { getOrderItemsTableExpandedRowDetails } from './helpers/HelperFuncsA';



export const OrderItemsTable = (props) => {

    return (
        <Row className="mb-4">
            <Col sm="12">
                <h2>Order Items</h2>
            </Col>

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

        </Row>
    );
};