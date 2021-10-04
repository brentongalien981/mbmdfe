import React from 'react';
import { Card, CardBody, Col, Form, Spinner, Row, FormGroup, Label, Button } from 'reactstrap';
import { getReadableDateTime } from '../../bmd/helpers/HelperFuncsA';



export const EpBatchPickupInfo = (props) => {

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
            <Col sm="12"><h2>EP-Batch Pickup Info</h2></Col>
            {mainContents}
        </Row>
    );
};



const getFormSections = (props) => {

    if (!props.pickup) {
        return <Label>Please buy a pickup for this batch.</Label>
    }

    const epBatchPickupInfo = prepareEpBatchPickupInfo(props.pickup);


    return epBatchPickupInfo.map((info, i) => {

        let infoValComponent = null;
        if (info.type === 'label') {
            infoValComponent = (<Label sm={8} className="text-sm-left">{info.val}</Label>);
        } else {
            infoValComponent = (<Col sm={8}>{info.val}</Col>);
        }


        return (
            <FormGroup row key={i}>
                <Label sm={4} className="text-sm-right">{info.label}</Label>
                {infoValComponent}
            </FormGroup>
        );
    });
};



function prepareEpBatchPickupInfo(epBatchPickup) {

    return [
        { label: 'ID', val: epBatchPickup.id, type: 'label' },
        { label: 'API Mode', val: epBatchPickup.mode, type: 'label' },
        { label: 'Pickup Status', val: epBatchPickup.status, type: 'label' },
        { label: 'Reference', val: epBatchPickup.reference ?? '-', type: 'label' },
        { label: 'Earliest Pickup', val: getReadableDateTime(epBatchPickup.min_datetime), type: 'label' },
        { label: 'Latest Pickup', val: getReadableDateTime(epBatchPickup.max_datetime), type: 'label' },
        { label: 'Instructions', val: epBatchPickup.instructions ?? '-', type: 'label' },
        { label: 'Messages', val: getPickupMessagesComp(epBatchPickup.messages), type: 'component' },
        { label: 'Pickup Address', val: getPickupAddressComp(epBatchPickup.address), type: 'component' },

        { label: 'Created At', val: getReadableDateTime(epBatchPickup.created_at), type: 'label' },
        { label: 'Updated At', val: getReadableDateTime(epBatchPickup.updated_at), type: 'label' },
    ];
}



function getPickupMessagesComp(messages) {

    return messages?.map((m, i) => {
        return (<p key={i}>{m}</p>);
    });
}



function getPickupAddressComp(address) {

    return (
        <>
            <Label>{address?.name}</Label><br />
            <Label>{address?.company}</Label><br />
            <Label>{address?.street1}</Label><br />
            <Label>{address?.street2}</Label><br />
            <Label>{address?.city}</Label><br />
            <Label>{address?.state}</Label><br />
            <Label>{address?.zip}</Label><br />
            <Label>{address?.country}</Label><br />
            <Label>{address?.phone}</Label><br />
            <Label>{address?.email}</Label><br />

        </>
    );

}



function getBtnsSection(props) {

    if (!props.pickup) {
        return (
            <Col lg="12">
                <Button color="primary" onClick={props.onEpBatchPickupFormShow}>set EP-Batch Pickup</Button>
            </Col>
        );
    }

    return null;
}