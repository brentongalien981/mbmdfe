import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { MinusCircle, PlusCircle } from 'react-feather';
import { Col, Row, Spinner } from 'reactstrap';
import { EP_BATCH_SHIPMENTS_TABLE_COLUMNS } from './constants/consts';



export const EpBatchShipmentsTable = (props) => {

    let mainContent = (
        <Col sm="12">
            <div className="ep-batch-shipments-table-container p-4">
                <BootstrapTable
                    bootstrap4
                    bordered={false}
                    keyField="id"
                    columns={EP_BATCH_SHIPMENTS_TABLE_COLUMNS}
                    data={props.epBatchShipments ?? []}
                    expandRow={getTableExpandedRowDetails()}
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
                <h2 className="mr-2 ep-batch-shipments-label">EP-Batch Shipments</h2>
            </Col>

            {mainContent}
        </Row>
    );
};



function getTableExpandedRowDetails() {

    const minusIcon = (<MinusCircle width={16} height={16} />);
    const plusIcon = (<PlusCircle width={16} height={16} />);


    return {
        renderer: (row) => {

            let rowProps = [];

            for (const key in row) {
                rowProps.push(<li key={rowProps.length}>{key}: {row[key]}</li>);
            }


            return (<ul>{rowProps}</ul>);
        },
        showExpandColumn: true,
        expandHeaderColumnRenderer: ({ isAnyExpands }) => isAnyExpands ? (minusIcon) : (plusIcon),
        expandColumnRenderer: ({ expanded }) => expanded ? (minusIcon) : (plusIcon)
    };
}
