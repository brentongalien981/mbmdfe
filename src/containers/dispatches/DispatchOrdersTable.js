import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { FileMinus } from 'react-feather';
import { Button, Col, Row, Spinner, UncontrolledTooltip } from 'reactstrap';
import { addColorCodedOrderStatus, addOrderLinkPropToOrder } from '../orders/helpers/HelperFuncsA';
import { DISPATCH_ORDERS_TABLE_COLUMNS } from './constants/consts';



export const DispatchOrdersTable = (props) => {

    let mainContent = (
        <Col sm="12">
            <div className="dispatch-orders-table-container p-4">
                <BootstrapTable
                    bootstrap4
                    bordered={false}
                    keyField="id"
                    columns={DISPATCH_ORDERS_TABLE_COLUMNS}
                    data={modifyDispatchOrders(props)}
                // expandRow={getPurchaseItemsTableExpandedRowDetails()}
                />
            </div>
        </Col>
    );


    if (props.isReadingDispatch) {
        mainContent = (
            <Col sm="12">
                <Spinner />
            </Col>
        );
    }


    return (
        <Row className="my-4 py-4">
            <Col sm="12" className="mb-2">
                <h2 className="mr-2 dispatch-orders-label">Dispatch Orders</h2>
            </Col>

            {mainContent}
        </Row>
    );
};



function modifyDispatchOrders(props) {

    const dispatchOrders = props.dispatchOrders ?? [];

    let modifiedDispatchOrders = [];

    for (const o of dispatchOrders) {

        let aModifiedDispatchOrder = addActionBtnsField(o, props.onRemoveOrderFromDispatch);
        aModifiedDispatchOrder = addColorCodedOrderStatus(aModifiedDispatchOrder);
        aModifiedDispatchOrder = addOrderLinkPropToOrder(aModifiedDispatchOrder);

        modifiedDispatchOrders.push(aModifiedDispatchOrder);
    }


    return modifiedDispatchOrders;
}



function addActionBtnsField(order, onRemoveOrderFromDispatch) {

    const btnId = 'removeOrderFromDispatchBtn' + order.id;

    const actionsComponent = (
        <>
            <Button id={btnId} className="mr-1 mb-1" outline color="danger" size="sm">
                <FileMinus size={14} onClick={onRemoveOrderFromDispatch} />
            </Button>

            <UncontrolledTooltip
                placement="top"
                target={btnId}
            >
                Remove order from dispatch
            </UncontrolledTooltip>
        </>
    );


    order.actions = actionsComponent;
    return order;
}