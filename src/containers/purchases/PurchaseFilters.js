import React from 'react';
import { Card, CardBody, Form, FormGroup, Input, Button, Label } from 'reactstrap';
import { PURCHASE_FILTERS_FORM_FIELDS } from './constants/consts';



export const PurchaseFilters = (props) => {

    return (
        <>
            <h3 style={{ display: 'inlineBlock' }}>Purchase Filters</h3>

            <div>
                <Card>
                    <CardBody>
                        <Form>                            
                            {getInputs(props)}
                            <FormGroup className="d-flex justify-content-between">
                                <Button size="sm" color="primary" onClick={() => true}>Apply</Button>
                                <Button size="sm" color="danger" onClick={() => true}>Reset All</Button>
                            </FormGroup>
                        </Form>

                    </CardBody>
                </Card>
            </div>
        </>
    );
};



function getInputs(props) {

    return PURCHASE_FILTERS_FORM_FIELDS.map((formField, i) => {

        const formFieldName = formField.name + 'Filter';

        return (
            <FormGroup key={i}>
                <Label>{formField.name}</Label>
                <Input type={formField.type} name={formFieldName} value={''} onChange={() => true} />
            </FormGroup>
        );
    });
}