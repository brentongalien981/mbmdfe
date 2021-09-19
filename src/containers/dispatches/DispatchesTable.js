import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Circle, ExternalLink, MinusCircle, PlusCircle } from 'react-feather';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { DISPATCHES_TABLE_COLUMNS, DISPATCH_STATUSES } from './constants/consts';



export const DispatchesTable = (props) => {

    let mainContent = (
        <BootstrapTable
            bootstrap4
            bordered={false}
            keyField="id"
            data={modifyDispatchesForDisplay(props.dispatches)}
            columns={DISPATCHES_TABLE_COLUMNS}
            expandRow={getTableExpandedRowDetails()}
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



function modifyDispatchesForDisplay(dispatches) {
    let modifiedDispatches = [];

    for (const d of dispatches) {
        let theModifiedDispatch = d;
        theModifiedDispatch = addColorCodedDispatchStatus(theModifiedDispatch);
        theModifiedDispatch = addDispatchLink(theModifiedDispatch);

        modifiedDispatches.push(theModifiedDispatch);
    }

    return modifiedDispatches;
}



function addColorCodedDispatchStatus(dispatch) {

    let color = 'black';

    switch (parseInt(dispatch.statusCode)) {
        case DISPATCH_STATUSES.EP_BATCH_CREATION_FAILED.code:
        case DISPATCH_STATUSES.OTHER_ERRORS.code:
            color = 'red';
            break;
        case DISPATCH_STATUSES.DEFAULT.code:
        case DISPATCH_STATUSES.EP_BATCH_CREATING.code:
            color = 'rgb(200, 200, 200)'; // GRAY
            break;
        case DISPATCH_STATUSES.EP_BATCH_CREATED.code:
        case DISPATCH_STATUSES.EP_BATCH_UPDATED.code:
        case DISPATCH_STATUSES.EP_BATCH_LABELS_GENERATED.code:
        case DISPATCH_STATUSES.EP_BATCH_SCANFORM_GENERATED.code:
            color = 'blue';
            break;
        case DISPATCH_STATUSES.EP_PICKUP_BOUGHT.code:
        case DISPATCH_STATUSES.DISPATCHING.code:
            color = 'green';
            break;
    }


    const style = {
        backgroundColor: color,
        borderRadius: '9px'
    };

    const colorCodedStatus = (<Circle size={18} className="align-middle" style={style} />);

    dispatch.colorCodedStatus = colorCodedStatus;

    return dispatch;
}



export function addDispatchLink(dispatch) {

    let dispatchUrl = '/dispatches/' + dispatch.id;

    dispatch.dispatchLink = (
        <a href={dispatchUrl} target="_blank">
            <ExternalLink size={18} className="align-middle" />
        </a>
    );

    return dispatch;
}



function getTableExpandedRowDetails() {

    const minusIcon = (<MinusCircle width={16} height={16} />);
    const plusIcon = (<PlusCircle width={16} height={16} />);


    return {
        renderer: (row) => {

            let list = [];

            for (const k in row) {
                list.push(<li key={list.length}>{k}: {row[k]}</li>);
            }

            return (<ul>{list}</ul>);
        },
        showExpandColumn: true,
        expandHeaderColumnRenderer: ({ isAnyExpands }) => isAnyExpands ? (minusIcon) : (plusIcon),
        expandColumnRenderer: ({ expanded }) => expanded ? (minusIcon) : (plusIcon)
    };
};