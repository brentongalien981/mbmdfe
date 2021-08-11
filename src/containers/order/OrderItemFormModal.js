import React from 'react';
import { Button, Label, Modal, ModalBody, ModalFooter, ModalHeader, Col, Input, Form, FormGroup, Row, Spinner, Container } from 'reactstrap';
import { ORDER_ITEM_FORM_FIELDS } from './constants/consts';



const OrderItemFormModal = (props) => {

    const formLabel = (props.orderItemFormAction === 'create' ? 'Create Order Item' : 'Edit Order Item');

    let saveBtnContent = 'save';
    if (props.isSavingOrderItem) {
        saveBtnContent = (<Spinner size="sm" />);
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
                <Button color="primary" onClick={props.onOrderItemSave}>{saveBtnContent}</Button>
            </ModalFooter>

        </Modal>
    );
};



const getFormInputSections = (props) => {

    return ORDER_ITEM_FORM_FIELDS.map((formField, i) => {
        return (
            <FormGroup row key={i}>
                <Label sm={4} className="text-sm-right">{formField.name}</Label>
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
    const inputVal = props.orderItem[formField.name] ?? '';

    if (formField.type === 'select') {
        inputChild = getOrderItemStatusOptions(props.orderItemStatuses);
    }


    return (
        <Input type={formField.type} name={formField.name} value={inputVal} onChange={(e) => props.onOrderItemInputChange(e)} {...disabledAttrib}>{inputChild}</Input>
    );
};



const getOrderItemStatusOptions = (orderItemStatuses) => {
    return orderItemStatuses.map((s) => {
        return (<option key={s.code} value={s.code}>{s.name}</option>);
    });
};



export default OrderItemFormModal;
