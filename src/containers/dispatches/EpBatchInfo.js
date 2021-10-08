import React from 'react';
import { ExternalLink } from 'react-feather';
import { Link } from 'react-router-dom';
import { Card, CardBody, Col, Form, Spinner, Row, FormGroup, Label, Button } from 'reactstrap';
import { getReadableDateTime } from '../../bmd/helpers/HelperFuncsA';



export const EpBatchInfo = (props) => {

    let mainContents = (
        <>
            <Col lg="12">
                <Card>
                    <CardBody>
                        <Form className="p-4">{getFormSections(props)}</Form>
                    </CardBody>
                </Card>
            </Col>

            {getBtnsSection(props)}
        </>
    );


    if (props.isReadingDispatch) {
        mainContents = (
            <Col sm="12">
                <Spinner />
            </Col>
        );
    }


    return (
        <Row className="mb-4 py-4">
            <Col sm="12"><h2>EP-Batch Info</h2></Col>
            {mainContents}
        </Row>
    );
};



function getBtnsSection(props) {

    if (props.epBatch?.pickup?.status === 'scheduled'
        && props.epBatch?.state !== 'label_generating'
        && props.epBatch?.state !== 'label_generated'
    ) {

        const btnContent = (props.isGeneratingBatchLabels ? <Spinner size="sm" /> : 'generate all shipment labels');

        return (
            <Col lg="12">
                <Button color="primary" onClick={props.onGenerateBatchLabels}>{btnContent}</Button>
            </Col>
        );
    }

    return null;

}



const getFormSections = (props) => {

    if (!props.epBatch) {
        return <Label>n/a</Label>
    }

    const epBatchInfo = prepareEpBatchInfo(props.epBatch);


    return epBatchInfo.map((info, i) => {

        return (
            <FormGroup row key={i}>
                <Label sm={4} className="text-sm-right">{info.label}</Label>
                <Label sm={8} className="text-sm-left">{info.val}</Label>
            </FormGroup>
        );
    });
};



function prepareEpBatchInfo(epBatch) {

    return [
        { field: 'id', label: 'ID', val: epBatch.id },
        { field: 'label_url', label: 'All Shipment Labels Link', val: epBatch.label_url ? getEpBatchLabelUrlComp(epBatch.label_url) : '-' },
        { field: 'mode', label: 'API Mode', val: epBatch.mode },
        { field: 'reference', label: 'Reference', val: epBatch.reference ?? '-' },
        { field: 'state', label: 'Batch State', val: epBatch.state },
        { field: 'created_at', label: 'Created At', val: getReadableDateTime(epBatch.created_at) },
        { field: 'updated_at', label: 'Updated At', val: getReadableDateTime(epBatch.updated_at) },
        { field: 'num_shipments', label: '# of Total Shipments', val: epBatch.num_shipments },
        { field: 'num_of_postage_purchased', label: '# of Current Purchased Shipments', val: epBatch.status.postage_purchased },
        { field: 'num_of_created_purchase', label: '# of Current Created Shipments', val: epBatch.status.created },
        { field: 'num_of_queued_purchase', label: '# of Current Queued Shipments for Purchase', val: epBatch.status.queued_for_purchase },
        { field: 'num_of_creation_failed', label: '# of Current Shipments with Failed Creation', val: epBatch.status.creation_failed },
        { field: 'num_of_postage_purchase_failed', label: '# of Current Shipments with Purchase Failed', val: epBatch.status.postage_purchase_failed }
    ];
}



function getEpBatchLabelUrlComp(url) {

    return (
        <a href={url} target="_blank">
            <ExternalLink size={18} className="align-middle" />
        </a>
    );

}