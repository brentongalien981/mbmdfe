import React from 'react';
import { Button, Card, CardBody, Col, Form, FormGroup, Input, Label, Row, Spinner } from 'reactstrap';
import { getReadableDate2 } from '../../bmd/helpers/HelperFuncsA';
import { BEING_PACKAGED, TO_BE_PACKAGED } from '../orders/constants/consts';



export const ProbableShippingRatesForm = (props) => {

    if (!doesShippingRatesHaveData(props)) { return null; }
    if (!isOrderStatusAllowed(props)) { return null; }


    let mainContents = (
        <>
            <Col lg="12">
                <Card>
                    <CardBody>
                        <Form>{getFormSections(props)}</Form>
                    </CardBody>
                </Card>
            </Col>

            <Col sm="12">
                {getBtnsSection(props)}
            </Col>
        </>
    );


    return (
        <Row className="mb-4 pb-4">
            <Col sm="12"><h2>Probable Shipping-Rates</h2></Col>
            {mainContents}
        </Row>
    );
};



function doesShippingRatesHaveData(props) {

    if (props.probableShippingRates?.length > 0) { return true; }
    return false;
}



function isOrderStatusAllowed(props) {
    if (props.orderStatusCode == TO_BE_PACKAGED || props.orderStatusCode == BEING_PACKAGED) {
        return true;
    }
    return false;
}



function getFormSections(props) {

    const sections = props.probableShippingRates.map((r, i) => {

        if (!r.delivery_date) { return null; }

        let shippingRateLabel = r.carrier;
        shippingRateLabel += ' / ' + r.service;
        shippingRateLabel += ' / $' + r.rate;
        shippingRateLabel += ' / ' + r.delivery_days + ' Days';
        shippingRateLabel += ' / ' + getReadableDate2(r.delivery_date);
        shippingRateLabel += ' / Guaranteed: ' + (r.delivery_date_guaranteed ? 'Yes' : 'No');

        return (
            <FormGroup row check key={i}>
                <Label check className="mb-3">
                    <Input type="radio" name="shippingRateRadioBtns" checked={r.isSelected ?? false} value={r.id} onChange={(e) => props.onSelectedShippingRateChange(e)} />
                    {shippingRateLabel}
                </Label>
            </FormGroup>
        );
    });


    return sections;
};



function getBtnsSection(props) {

    let buyShippingLabelBtn = (<Button color="primary" onClick={props.onBuyShippingLabel}>buy Shipping-Label</Button>);

    if (props.isBuyingShippingLabel) {
        buyShippingLabelBtn = (<Button color="primary"><Spinner size="sm" /></Button>)
    }

    return buyShippingLabelBtn;

}