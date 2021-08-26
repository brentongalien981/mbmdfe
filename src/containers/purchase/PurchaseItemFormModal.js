import React from 'react';
import { Button, Label, Modal, ModalBody, ModalFooter, ModalHeader, Col, Input, Form, FormGroup, Row, Spinner, Container } from 'reactstrap';



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
                <Button color="primary" onClick={() => true}>{actionBtnContent}</Button>
            </ModalFooter>

        </Modal>
    );
};



const getFormInputSections = (props) => {
    return null;
    // return ORDER_ITEM_FORM_FIELDS.map((formField, i) => {
    //     return (
    //         <FormGroup row key={i}>
    //             <Label sm={4} className="text-sm-right">{formField.name}</Label>
    //             <Col sm={8}>
    //                 {getSpecificInputComponent(props, formField)}
    //             </Col>
    //         </FormGroup>
    //     );
    // });
};



export default PurchaseItemFormModal;