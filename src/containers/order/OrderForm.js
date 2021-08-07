import React from 'react';
import { Button, Card, CardBody, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import Spinner from 'reactstrap/lib/Spinner';
import { getInitialDate, parseDateToStr } from '../../bmd/helpers/HelperFuncsA';
import Bs from '../../bs/core/Bs';



export const OrderForm = (props) => {

    const formColumns = getFormColumns(props);

    let updateBtn = (<Button color="primary" onClick={props.onOrderUpdate}>update</Button>);

    if (props.isUpdatingOrder) {
        updateBtn = (<Button color="primary"><Spinner size="sm" /></Button>)
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
                {updateBtn}
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

    if (props.crudMethod === 'create') {
        return getFormColumnsForCreateMethod(props);
    }



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



const getFormColumnsForCreateMethod = (props) => {

    let firstColFormInputRows = null;
    let secondColFormInputRows = null;

    return {
        first: firstColFormInputRows,
        second: secondColFormInputRows
    };
};



const getSpecificInputComponent = (props, orderPropKey, orderPropVal) => {

    const inputName = orderPropKey;

    let comp = (<Input type="text" name={inputName} value={orderPropVal ?? ''} onChange={(e) => props.onOrderInputChange(e)} />);

    switch (orderPropKey) {
        case 'id':
            comp = (<Input type="text" name={inputName} value={orderPropVal ?? ''} onChange={(e) => props.onOrderInputChange(e)} disabled />);
            break;
        case 'status_code':
            comp = (
                <Input
                    type="select"
                    name={inputName}
                    value={orderPropVal}
                    onChange={(e) => props.onOrderInputChange(e)}
                >
                    {getOrderStatusOptions(props.orderStatuses)}
                </Input>
            );
            break;
        case 'earliest_delivery_date':
        case 'latest_delivery_date':
        case 'created_at':
            comp = (<Input type="date" name={inputName} value={orderPropVal} onChange={(e) => props.onOrderInputChange(e)} />);
            break;
        case 'updated_at':            
            comp = (<Input type="date" name={inputName} value={orderPropVal} disabled />);
            break;
    }

    return comp;
};



const getOrderStatusOptions = (orderStatuses) => {
    return orderStatuses.map((s) => {
        return (<option key={s.code} value={s.code}>{s.name}</option>);
    });
};
