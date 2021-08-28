import React from 'react';
import { Button, Label, Modal, ModalBody, ModalFooter, ModalHeader, Col, Input, Form, FormGroup, Row, Spinner, Container } from 'reactstrap';
import { PURCHASE_ITEM_FORM_FIELDS } from './constants/consts';



const PurchaseItemFormModal = (props) => {

    const formLabel = (props.purchaseItemFormAction === 'create' ? 'Create Purchase Item' : 'Edit Purchase Item');

    let actionBtnContent = (props.purchaseItemFormAction === 'create' ? 'save' : 'update');

    if (props.isSavingPurchaseItem || props.isUpdatingPurchaseItem) {
        actionBtnContent = (<Spinner size="sm" />);
    }


    return (
        <Modal isOpen={props.isOpen} toggle={props.onToggle} size='lg'>
            <ModalHeader>
                <Container className="my-2"><h3>{formLabel}</h3></Container>
            </ModalHeader>

            <ModalBody>
                <Form>{getFormInputSections(props)}</Form>
            </ModalBody>

            <ModalFooter>
                <Button color="warning" className="mr-1" onClick={props.onToggle}>close</Button>
                <Button color="primary" onClick={props.onPurchaseItemSave}>{actionBtnContent}</Button>
            </ModalFooter>

        </Modal>
    );
};



const getFormInputSections = (props) => {
    
    return PURCHASE_ITEM_FORM_FIELDS.map((formField, i) => {
        return (
            <FormGroup row key={i}>
                <Label sm={4} className="text-sm-right">{formField.field}</Label>
                <Col sm={8}>
                    {getSpecificInputComponent(props, formField)}
                </Col>
            </FormGroup>
        );
    });
};



const getSpecificInputComponent = (props, formField) => {

    let inputChild = null;
    let disabledAttrib = formField.isDisabled ? { disabled: true } : {};
    const inputVal = props.purchaseItemToEdit[formField.field] ?? '';

    if (formField.type === 'select') {
        inputChild = getPurchaseItemStatusOptions(props.purchaseItemStatuses);
    }


    return (
        <Input type={formField.type} name={formField.field} value={inputVal} onChange={(e) => props.onPurchaseItemInputChange(e)} {...disabledAttrib}>
            {inputChild}
        </Input>
    );
};



const getPurchaseItemStatusOptions = (purchaseItemStatuses) => {
    return purchaseItemStatuses.map((s) => {
        return (<option key={s.code} value={s.code}>{s.name}</option>);
    });
};



export default PurchaseItemFormModal;