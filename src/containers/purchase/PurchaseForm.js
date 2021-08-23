import React from 'react';
import { Button, Card, CardBody, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import Spinner from 'reactstrap/lib/Spinner';
import { getInitialDate, parseDateToStr } from '../../bmd/helpers/HelperFuncsA';
import Bs from '../../bs/core/Bs';
import { PURCHASE_FORM_FIELDS } from './constants/consts';



export const PurchaseForm = (props) => {

    // BMD-TODO
    const formColumns = getFormColumns(props);


    // BMD-TODO: Move these to FUNC: btnsSection()
    const btnsSection = null;
    // let actionBtn = (<Button color="primary" onClick={props.onOrderUpdate}>update</Button>);

    // if (props.crudMethod === 'create') {
    //     actionBtn = (<Button color="primary" onClick={props.onOrderSave}>save</Button>);
    // }

    // if (props.isUpdatingOrder || props.isSavingOrder) {
    //     actionBtn = (<Button color="primary"><Spinner size="sm" /></Button>)
    // }


    // let refreshBtn = (<Button color="primary" className="ml-2" onClick={props.onOrderRefresh}>refresh</Button>);
    // if (props.isRefreshingOrder) {
    //     refreshBtn = (<Button color="primary" className="ml-2"><Spinner size="sm" /></Button>)
    // }


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
                {btnsSection}
            </Col>
        </>
    );


    if (props.isReadingPurchase) {
        mainContents = (
            <Col sm="12">
                <Spinner />
            </Col>
        );
    }


    return (
        <Row className="mb-4 pb-4">
            <Col sm="12"><h2>Purchase Info</h2></Col>
            {mainContents}
        </Row>
    );
};



const getFormColumns = (props) => {

    let i = 0;
    let firstColFormInputRows = [];
    let secondColFormInputRows = [];
    let whichFormColToPopulate = firstColFormInputRows;


    for (const formField of PURCHASE_FORM_FIELDS) {

        if (formField.field === 'statusCode') { whichFormColToPopulate = secondColFormInputRows; }

        whichFormColToPopulate.push(
            <FormGroup row key={i}>
                <Label sm={4} className="text-sm-right">{formField.field}</Label>
                <Col sm={8}>
                    {getSpecificInputComponent(props, formField)}
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



const getSpecificInputComponent = (props, formField) => {

    let inputChild = null;
    let disabledAttrib = formField.isDisabled ? { disabled: true } : {};
    let inputName = formField.field;
    let inputVal = props.purchase?.[inputName];
    let inputType = formField.type;


    switch (inputType) {
        case 'select':
            inputChild = getPurchaseStatusOptions(props.purchaseStatuses);
            break;
        case 'date':
            let dateObj = (inputVal ? new Date(inputVal) : getInitialDate());
            inputVal = parseDateToStr(dateObj, 'yyyy-mm-dd');
            break;
    }


    return (
        <Input type={inputType} name={inputName} value={inputVal ?? ''} onChange={(e) => true} {...disabledAttrib}>
            {inputChild}
        </Input>
    );
};



const getPurchaseStatusOptions = (purchaseStatuses) => {
    return purchaseStatuses.map((s) => {
        return (<option key={s.code} value={s.code}>{s.name}</option>);
    });
};
