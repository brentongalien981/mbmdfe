import React from 'react';
import { Circle } from 'react-feather';
import { Button, Card, CardBody, Col, Form, FormGroup, Input, Label, Row, Spinner } from 'reactstrap';
import { getInitialDate, parseDateToStr } from '../../bmd/helpers/HelperFuncsA';
import Bs from '../../bs/core/Bs';
import { BEING_PACKAGED, TO_BE_PACKAGED } from '../orders/constants/consts';
import { addColorCodedOrderStatus } from '../orders/helpers/HelperFuncsA';
import { ORDER_FORM_FIELDS } from './constants/consts';



export const OrderForm = (props) => {

    const formColumns = getFormColumns(props);


    let actionBtn = (<Button color="primary" onClick={props.onOrderUpdate}>update</Button>);

    if (props.crudMethod === 'create') {
        actionBtn = (<Button color="primary" onClick={props.onOrderSave}>save</Button>);
    }

    if (props.isUpdatingOrder || props.isSavingOrder) {
        actionBtn = (<Button color="primary"><Spinner size="sm" /></Button>)
    }


    let refreshBtn = (<Button color="primary" className="ml-2" onClick={props.onOrderRefresh}>refresh</Button>);
    if (props.isRefreshingOrder) {
        refreshBtn = (<Button color="primary" className="ml-2"><Spinner size="sm" /></Button>)
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
                {refreshBtn}
                {getCheckPossibleShippingBtn(props)}
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

    let order = props.order ?? {};
    order = modifyOrderForDisplay(order);

    let i = 0;
    let firstColFormInputRows = [];
    let secondColFormInputRows = [];
    let whichFormColToPopulate = firstColFormInputRows;


    for (const formField of ORDER_FORM_FIELDS) {

        const fieldName = formField.field;

        if (fieldName === 'colorCodedStatus') { whichFormColToPopulate = secondColFormInputRows; }

        const fieldVal = order?.[fieldName];
        let formGroup = null;


        if (formField.isLabel) {
            formGroup = prepareFormGroupLabel(fieldName, fieldVal, i);
        }
        else {
            formGroup = (
                <FormGroup row key={i}>
                    <Label sm={4} className="text-sm-right">{fieldName}</Label>
                    <Col sm={8}>
                        {getSpecificInputComponent(props, fieldName, fieldVal, formField.type)}
                    </Col>
                </FormGroup>
            );
        }


        whichFormColToPopulate.push(formGroup);

        ++i;
    }


    return {
        first: firstColFormInputRows,
        second: secondColFormInputRows
    };
};



function prepareFormGroupLabel(fieldName, fieldVal, componentKey) {
    return (
        <FormGroup row key={componentKey}>
            <Label sm={4} className="text-sm-right">{fieldName}</Label>
            <Col sm={8}>
                <Label>{fieldVal}</Label>
            </Col>
        </FormGroup>
    );
}



function modifyOrderForDisplay(order) {
    order = addColorCodedOrderStatus(order);
    return order;
}



const getSpecificInputComponent = (props, inputName, inputVal, inputType) => {

    let inputChild = null;
    let disabledAttrib = {};
    inputVal = inputVal ?? '';

    switch (inputType) {
        case 'select':
            inputChild = getOrderStatusOptions(props.orderStatuses);
            break;
        case 'date':
            let dateObj = (inputVal == '' ? getInitialDate() : new Date(inputVal));
            inputVal = parseDateToStr(dateObj, 'yyyy-mm-dd');
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



function getCheckPossibleShippingBtn(props) {

    if (props.order.status_code == TO_BE_PACKAGED || props.order.status_code == BEING_PACKAGED) {
        if (props.isCheckingPossibleShipping) {
            return (<Button className="ml-2" color="primary" ><Spinner size="sm" /></Button>);
        } else {
            return (<Button className="ml-2" color="primary" onClick={props.onCheckPossibleShipping}>check possible shipping</Button>);
        }        
    }

    return null;
}
