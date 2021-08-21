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
                                <Button size="sm" color="primary" onClick={props.onPurchaseFiltersApply}>Apply</Button>
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

        return (
            <FormGroup key={i}>
                <Label>{formField.label ?? formField.name}</Label>
                {getSpecificInputComponent(props, formField)}
            </FormGroup>
        );
    });
}



function getSpecificInputComponent(props, formField) {

    let inputChild = null;
    let disabledAttrib = formField.isDisabled ? { disabled: true } : {};
    const inputVal = props.filters[formField.name] ?? '';

    if (formField.type === 'select') {
        inputChild = getPurchaseStatusOptions(props.purchaseStatuses);
    }


    return (
        <Input type={formField.type} name={formField.name} value={inputVal} onChange={(e) => props.onPurchaseFilterInputChange(e)} {...disabledAttrib}>
            {inputChild}
        </Input>
    );
}



function getPurchaseStatusOptions(purchaseStatuses) {
    return purchaseStatuses.map((s) => {
        return (<option key={s.code} value={s.code}>{s.name}</option>);
    });
}