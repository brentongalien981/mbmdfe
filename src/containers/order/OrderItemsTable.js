import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Col, Row } from 'reactstrap';
import { ORDER_ITEM_TABLE_COLUMNS } from './constants/consts';



export const OrderItemsTable = (props) => {

    return (
        <Row>
            <Col sm="12">
                <h2>Order Items</h2>
            </Col>

            <Col sm="12">
                <BootstrapTable
                    bootstrap4
                    bordered={false}
                    keyField="id"
                    data={[]}
                    columns={ORDER_ITEM_TABLE_COLUMNS}
                    // expandRow={helperFuncs.getTableExpandedRowDetails()}
                />
            </Col>

        </Row>
    );
};