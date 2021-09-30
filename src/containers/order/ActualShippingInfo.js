import React from 'react';
import { ExternalLink } from 'react-feather';
import { Card, CardBody, Col, Form, FormGroup, Label, Row } from 'reactstrap';
import { getReadableDate2 } from '../../bmd/helpers/HelperFuncsA';



export const ActualShippingInfo = (props) => {

    if (!props.actualEpShipment) { return null; }


    let mainContents = (
        <>
            <Col lg="12">
                <Card>
                    <CardBody>
                        <Form>

                            <FormGroup row>
                                <Label sm={3} className="text-sm-right">EP Shipment ID</Label>
                                <Label sm={9} className="text-sm-left">{props.actualEpShipment.id}</Label>
                            </FormGroup>


                            <FormGroup row>
                                <Label sm={3} className="text-sm-right">Selected Rate</Label>
                                <Label sm={9} className="text-sm-left">{getShipmentRateDescription(props)}</Label>
                            </FormGroup>


                            <FormGroup row>
                                <Label sm={3} className="text-sm-right">Postage Label Link</Label>
                                <Label sm={9} className="text-sm-left">{getPostageLabelComp(props)}</Label>
                            </FormGroup>
                            
                            <FormGroup row>
                                <Label sm={3} className="text-sm-right">Shipment Tracker Link</Label>
                                <Label sm={9} className="text-sm-left">{getTrackerComp(props)}</Label>
                            </FormGroup>

                            {/* TODO: shipment.options.currency */}

                        </Form>

                    </CardBody>
                </Card>
            </Col>
        </>
    );


    return (
        <Row className="mb-4 pb-4">
            <Col sm="12"><h2>Actual Shipping Info</h2></Col>
            {mainContents}
        </Row>
    );
};



function getShipmentRateDescription(props) {

    const r = props.actualEpShipment.selected_rate;

    let shipmentRateDescription = r.carrier;
    shipmentRateDescription += ' / ' + r.service;
    shipmentRateDescription += ' / $' + r.rate;
    shipmentRateDescription += ' / ' + r.delivery_days + ' Days';
    shipmentRateDescription += ' / ' + getReadableDate2(r.delivery_date);
    shipmentRateDescription += ' / Guaranteed: ' + (r.delivery_date_guaranteed ? 'Yes' : 'No');

    return shipmentRateDescription;

}



function getPostageLabelComp(props) {

    const link = props.actualEpShipment.postage_label.label_url;

    return (
        <a href={link} target="_blank">
            <ExternalLink size={18} className="align-middle" />
        </a>
    );
}



function getTrackerComp(props) {
    
    const link = props.actualEpShipment.tracker.public_url;

    return (
        <a href={link} target="_blank">
            <ExternalLink size={18} className="align-middle" />
        </a>
    );
}