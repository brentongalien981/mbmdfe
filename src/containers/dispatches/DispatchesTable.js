import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Circle, ExternalLink, MinusCircle, PlusCircle } from 'react-feather';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { DISPATCHES_TABLE_COLUMNS } from './constants/consts';



export const DispatchesTable = (props) => {

    let mainContent = (
        <BootstrapTable
            bootstrap4
            bordered={false}
            keyField="id"
            data={modifyDispatchesForDisplay(props.dispatches)}
            columns={DISPATCHES_TABLE_COLUMNS}
            // BMD-TODO
            // expandRow={getTableExpandedRowDetails()}
        />
    );


    if (props.isReadingDispatches) {
        mainContent = (<Spinner />);
    }


    return (
        <div className="position-relative dispatches-table-section p-2">
            <div className="chat-messages p-4 dispatches-table-container">
                {mainContent}
            </div>
        </div>
    );
};


// BMD-TODO
function modifyDispatchesForDisplay(dispatches) {
    let modifiedDispatches = [];

    for (const d of dispatches) {
        let theModifiedDispatch = d;
        // theModifiedDispatch = replaceNullValsWithSlashes(d);
        // theModifiedDispatch = addColorCodedPurchaseStatus(theModifiedDispatch);

        modifiedDispatches.push(theModifiedDispatch);
    }

    return modifiedDispatches;
}