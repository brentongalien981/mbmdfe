import React from 'react';
import { Button, Card, CardBody, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import Spinner from 'reactstrap/lib/Spinner';
import { getInitialDate, parseDateToStr } from '../../bmd/helpers/HelperFuncsA';
import Bs from '../../bs/core/Bs';



export const OrderForm = (props) => {

    const formColumns = getFormColumns(props);

    let mainContents = (
        <>
            <Col lg="6">
                <Card>
                    <CardBody>
                        <Form>{formColumns.first}</Form>
                    </CardBody>
                </Card>
            </Col>

            <Col lg="6">
                <Card>
                    <CardBody>
                        <Form>{formColumns.second}</Form>
                    </CardBody>
                </Card>
            </Col>

            <Col sm="12">
                <Button color="primary">Update</Button>
            </Col>
        </>
    );

    if (props.isReadingOrder) {
        mainContents = (
            <Col sm="12">
                <Spinner />
            </Col>
        );
    }


    return (
        <Row>
            <Col sm="12"><h2>Order Info</h2></Col>
            {mainContents}
        </Row>
    );
};



const getFormColumns = (props) => {
    let i = 0;
    let firstColFormInputRows = [];
    let secondColFormInputRows = [];
    let whichFormColToPopulate = firstColFormInputRows;

    for (const key in props.order) {

        const val = props.order[key];

        if (key === 'status_name') { continue; }

        if (i > 12) { whichFormColToPopulate = secondColFormInputRows; }


        whichFormColToPopulate.push(
            <FormGroup row key={i}>
                <Label sm={4} className="text-sm-right">{key}</Label>
                <Col sm={8}>
                    {getSpecificInputComponent(props, key, val)}
                </Col>
            </FormGroup>
        );

        ++i;
    }


    return {
        first: firstColFormInputRows,
        second: secondColFormInputRows
    };
};



const getSpecificInputComponent = (props, orderPropKey, orderPropVal) => {

    const inputName = orderPropKey + '_input';

    let comp = (<Input type="text" name={inputName} value={orderPropVal ?? ''} onChange={(e) => props.onOrderInputChange(e)} />);

    switch (orderPropKey) {
        case 'status_code':
            comp = (
                <Input
                    type="select"
                    name={inputName}
                    value="status"
                    onChange={(e) => props.onOrderFilterInputChange(e)}
                >
                    {getOrderStatusOptions(props.orderStatuses)}
                </Input>
            );
            break;
        case 'earliest_delivery_date':
        case 'latest_delivery_date':
        case 'created_at':
        case 'updated_at':

            orderPropVal = parseDateToStr(new Date(orderPropVal), 'yyyy-mm-dd');
            
            comp = (
                <Input type="date" name={inputName} value={orderPropVal} onChange={(e) => props.onOrderFilterInputChange(e)} />
            );
            break;
    }

    return comp;
};



const getOrderStatusOptions = (orderStatuses) => {
    return orderStatuses.map((s) => {
        return (<option key={s.code} value={s.code}>{s.name}</option>);
    });
};
