import React from 'react';
import { Button, Card, CardBody, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import Spinner from 'reactstrap/lib/Spinner';
import { getInitialDate, parseDateToStr } from '../../bmd/helpers/HelperFuncsA';
import Bs from '../../bs/core/Bs';
import { ORDER_FORM_FIELDS } from './constants/consts';



export const OrderForm = (props) => {

    const formColumns = getFormColumns(props);

    const btnLabel = props.crudMethod === 'create' ? 'save' : 'update';

    let actionBtn = (<Button color="primary" onClick={props.onOrderUpdate}>update</Button>);

    if (props.crudMethod === 'create') {
        actionBtn = (<Button color="primary" onClick={props.onOrderSave}>save</Button>);
    }


    if (props.isUpdatingOrder || props.isSavingOrder) {
        actionBtn = (<Button color="primary"><Spinner size="sm" /></Button>)
    }


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
                {actionBtn}
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
        <Row className="mb-4 pb-4">
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


    for (const formField of ORDER_FORM_FIELDS) {

        const fieldName = formField.field;

        if (fieldName === 'status_code') { whichFormColToPopulate = secondColFormInputRows; }

        const fieldVal = props.order?.[fieldName];

        whichFormColToPopulate.push(
            <FormGroup row key={i}>
                <Label sm={4} className="text-sm-right">{fieldName}</Label>
                <Col sm={8}>
                    {getSpecificInputComponent(props, fieldName, fieldVal, formField.type)}
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



const getSpecificInputComponent = (props, inputName, inputVal, inputType) => {

    let inputChild = null;
    let disabledAttrib = {};
    inputVal = inputVal ?? '';

    switch (inputType) {
        case 'select':
            inputChild = getOrderStatusOptions(props.orderStatuses);
            break;
        case 'date':
            inputVal = (inputVal == '' ? parseDateToStr(getInitialDate(), 'yyyy-mm-dd') : inputVal);
            break;
    }


    switch (inputName) {
        case 'id':
        case 'cart_id':
        case 'created_at':
        case 'updated_at':
            disabledAttrib = { disabled: true };
            break;
    }


    return (
        <Input type={inputType} name={inputName} value={inputVal} onChange={(e) => props.onOrderInputChange(e)} {...disabledAttrib}>{inputChild}</Input>
    );
};



const getOrderStatusOptions = (orderStatuses) => {
    return orderStatuses.map((s) => {
        return (<option key={s.code} value={s.code}>{s.name}</option>);
    });
};
