import React from 'react';
import { Button, Label, Modal, ModalBody, ModalFooter, ModalHeader, Col, Input, Form, FormGroup, Row, Spinner, Container } from 'reactstrap';
import { ORDER_ITEM_FORM_FIELDS } from './constants/consts';



const OrderItemFormModal = (props) => {

    return (
        <Modal isOpen={props.isOpen} toggle={props.onToggle} size='lg'>
            <ModalHeader>
                <Container className="my-2"><h3>Order Item</h3></Container>
            </ModalHeader>

            <ModalBody>
                <Form>{getFormInputSections(props)}</Form>
            </ModalBody>

            <ModalFooter>
                <Button color="warning" className="mr-1" onClick={props.onToggle}>cancel</Button>
                <Button color='primary'>save</Button>
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
        <Input type={formField.type} name={formField.name} value={inputVal} onChange={() => true} {...disabledAttrib}>{inputChild}</Input>
    );
};



const getOrderItemStatusOptions = (orderItemStatuses) => {
    return orderItemStatuses.map((s) => {
        return (<option key={s.code} value={s.code}>{s.name}</option>);
    });
};



export default OrderItemFormModal;
