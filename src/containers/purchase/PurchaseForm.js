import React from 'react';
import { Circle } from 'react-feather';
import { Button, Card, CardBody, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import Spinner from 'reactstrap/lib/Spinner';
import { getInitialDate, parseDateToStr } from '../../bmd/helpers/HelperFuncsA';
import Bs from '../../bs/core/Bs';
import { PURCHASE_STATUSES } from '../purchases/constants/consts';
import { setSellerLink } from '../purchases/PurchasesTable';
import { PURCHASE_FORM_FIELDS } from './constants/consts';
import { shouldNotIncludeForPurchaseForm } from './helpers/HelperFuncsA';



export const PurchaseForm = (props) => {

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
                {getBtnsSection(props)}
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



function getBtnsSection(props) {

    let actionBtn = (<Button color="primary" onClick={props.onPurchaseUpdate}>update</Button>);

    if (props.crudMethod === 'create') {
        actionBtn = (<Button color="primary" onClick={props.onPurchaseSave}>save</Button>);
    }

    if (props.isUpdatingPurchase || props.isSavingPurchase) {
        actionBtn = (<Button color="primary"><Spinner size="sm" /></Button>)
    }


    // let refreshBtn = (<Button color="primary" className="ml-2" onClick={props.onOrderRefresh}>refresh</Button>);
    // if (props.isRefreshingOrder) {
    //     refreshBtn = (<Button color="primary" className="ml-2"><Spinner size="sm" /></Button>)
    // }

    return actionBtn;

}



const getFormColumns = (props) => {

    let purchase = props.purchase ?? {};
    purchase = modifyPurchaseForDisplay(purchase);

    let i = 0;
    let firstColFormInputRows = [];
    let secondColFormInputRows = [];
    let whichFormColToPopulate = firstColFormInputRows;
    let actionName = props.crudMethod ?? 'update';


    for (const formField of PURCHASE_FORM_FIELDS) {

        if (formField.field === 'colorCodedStatus') { whichFormColToPopulate = secondColFormInputRows; }
        
        if (shouldNotIncludeForPurchaseForm(formField.field, actionName)) { continue; }

        let formGroup = null;


        if (formField.isLabel) {
            formGroup = prepareFormGroupLabel(formField.field, purchase[formField.field], i);
        }
        else {
            formGroup = (
                <FormGroup row key={i}>
                    <Label sm={4} className="text-sm-right">{formField.field}</Label>
                    <Col sm={8}>
                        {getSpecificInputComponent(props, formField)}
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



function modifyPurchaseForDisplay(purchase) {
    purchase = addColorCodedPurchaseStatus(purchase);
    purchase = setSellerLink(purchase);
    return purchase;
}



function addColorCodedPurchaseStatus(purchase) {

    let color = 'black';

    switch (parseInt(purchase.statusCode)) {
        case PURCHASE_STATUSES.EVALUATED_INCOMPLETELY_FOR_PURCHASE.code:
            color = 'orange';
            break;
        case PURCHASE_STATUSES.PURCHASE_INCOMPLETELY_RECEIVED.code:
            color = 'red';
            break;
        case PURCHASE_STATUSES.DEFAULT.code:
            color = 'white';
            break;
        case PURCHASE_STATUSES.TO_BE_PURCHASED.code:
            color = 'rgb(200, 200, 200)';
            break;
        case PURCHASE_STATUSES.PURCHASED.code:
        case PURCHASE_STATUSES.TO_BE_PURCHASE_RECEIVED.code:
            color = 'blue';
            break;
        case PURCHASE_STATUSES.PURCHASE_RECEIVED.code:
            color = 'green';
            break;
    }


    const style = {
        backgroundColor: color,
        borderRadius: '9px'
    };

    const colorCodedStatus = (<Circle size={18} className="align-middle" style={style} />);

    purchase.colorCodedStatus = colorCodedStatus;

    return purchase;
}



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
            if (inputVal) {
                let dateObj = new Date(inputVal);
                inputVal = parseDateToStr(dateObj, 'yyyy-mm-dd');
            } else {
                inputVal = 'yyyy-mm-dd';
            }
            
            break;
    }


    return (
        <Input type={inputType} name={inputName} value={inputVal ?? ''} onChange={(e) => props.onPurchaseInputChange(e)} {...disabledAttrib}>
            {inputChild}
        </Input>
    );
};



const getPurchaseStatusOptions = (purchaseStatuses) => {
    return purchaseStatuses.map((s) => {
        return (<option key={s.code} value={s.code}>{s.name}</option>);
    });
};
