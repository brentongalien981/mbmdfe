import React from 'react';
import { Button, Card, CardBody, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import Spinner from 'reactstrap/lib/Spinner';



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

        if (i > 12) { whichFormColToPopulate = secondColFormInputRows; }

        whichFormColToPopulate.push(
            <FormGroup row key={i}>
                <Label sm={4} className="text-sm-right">{key}</Label>
                <Col sm={8}>
                    <Input type="text" name="orderIdInput" value={val ?? ''} onChange={(e) => props.onOrderInputChange(e)} />
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