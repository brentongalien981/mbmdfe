import React from 'react';
import { Circle } from 'react-feather';
import { Button, Card, CardBody, Col, Form, Spinner, Row, FormGroup, Label, Input } from 'reactstrap';
import { parseDateToStr } from '../../bmd/helpers/HelperFuncsA';
import { DISPATCH_FORM_FIELDS, DISPATCH_STATUSES } from './constants/consts';



export const DispatchForm = (props) => {

    let mainContents = (
        <>
            <Col lg="12">
                <Card>
                    <CardBody>
                        <Form className="p-4">{getFormSections(props)}</Form>
                    </CardBody>
                </Card>
            </Col>

            <Col sm="12">
                {getBtnsSection(props)}
            </Col>
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
        <Row className="mb-4 pb-4">
            <Col sm="12"><h2>Dispatch Info</h2></Col>
            {mainContents}
        </Row>
    );
};



function getBtnsSection(props) {

    let actionBtn = (<Button color="primary" onClick={props.onDispatchUpdate}>update</Button>);

    if (props.crudMethod === 'create') {
        actionBtn = (<Button color="primary" onClick={props.onDispatchSave}>save</Button>);
    }

    if (props.isUpdatingDispatch || props.isSavingDispatch) {
        actionBtn = (<Button color="primary"><Spinner size="sm" /></Button>)
    }

    return actionBtn;

}



const getFormSections = (props) => {

    const modifiedDispatch = modifyDispatchForDisplay(props.dispatch);
    let tempProps = {
        ...props,
        dispatch: modifiedDispatch
    };


    let i = 0;
    let formSections = [];

    for (const formField of DISPATCH_FORM_FIELDS) {

        formSections.push(
            <FormGroup row key={i}>
                <Label sm={4} className="text-sm-right">{formField.field}</Label>
                <Col sm={8}>
                    {getSpecificInputComponent(tempProps, formField)}
                </Col>
            </FormGroup>
        );


        ++i;
    }


    return formSections;
};



function modifyDispatchForDisplay(dispatch) {
    dispatch = addColorCodedDispatchStatus(dispatch);
    return dispatch;
}



function addColorCodedDispatchStatus(dispatch) {

    let color = 'black';

    switch (parseInt(dispatch?.statusCode)) {
        case DISPATCH_STATUSES.DEFAULT.code:
        case DISPATCH_STATUSES.EP_BATCH_CREATING.code:
            color = 'rgb(200, 200, 200)'; // gray
            break;

        case DISPATCH_STATUSES.EP_BATCH_CREATION_FAILED.code:
        case DISPATCH_STATUSES.OTHER_ERRORS.code:
            color = 'red';
            break;

        case DISPATCH_STATUSES.EP_BATCH_CREATED.code:
        case DISPATCH_STATUSES.EP_BATCH_UPDATED.code:
        case DISPATCH_STATUSES.EP_BATCH_LABELS_GENERATED.code:
        case DISPATCH_STATUSES.EP_BATCH_SCANFORM_GENERATED.code:
            color = 'blue';
            break;

        case DISPATCH_STATUSES.EP_PICKUP_BOUGHT.code:
        case DISPATCH_STATUSES.DISPATCHING.code:
            color = 'green';
            break;

    }


    const style = {
        backgroundColor: color,
        borderRadius: '9px'
    };

    const colorCodedStatus = (<Circle size={18} className="align-middle" style={style} />);

    dispatch.colorCodedStatus = colorCodedStatus;

    return dispatch;
}



const getSpecificInputComponent = (props, formField) => {

    let inputChild = null;

    let disabledAttrib = {};
    if (props.crudMethod === 'create') {
        disabledAttrib = { disabled: true }
    } else {
        disabledAttrib = { disabled: formField.isDisabled };
    }

    let inputName = formField.field;
    let inputVal = props.dispatch?.[inputName];
    let inputType = formField.type;


    switch (inputType) {
        case 'select':
            inputChild = getDispatchStatusOptions(props.dispatchStatuses);
            break;
        case 'date':
            if (inputVal) {
                let dateObj = new Date(inputVal);
                inputVal = parseDateToStr(dateObj, 'yyyy-mm-dd');
            } else {
                inputVal = 'yyyy-mm-dd';
            }

            break;
        case 'label':
            return (<Label>{inputVal}</Label>);
    }


    return (
        <Input type={inputType} name={inputName} value={inputVal ?? ''} onChange={(e) => props.onDispatchInputChange(e)} {...disabledAttrib}>
            {inputChild}
        </Input>
    );
};



const getDispatchStatusOptions = (dispatchStatuses) => {
    return dispatchStatuses.map((s) => {
        return (<option key={s.code} value={s.code}>{s.name}</option>);
    });
};