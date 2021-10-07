import React from 'react';
import { Button, Label, Modal, ModalBody, ModalFooter, ModalHeader, Col, Input, Form, FormGroup, Row, Spinner, Container } from 'reactstrap';



export const EpPickupRateOptionsModal = (props) => {

    const btnContent = props.isBuyingPickupRate ? <Spinner size="sm" /> : 'buy';


    return (
        <Modal isOpen={props.isEpPickupRateOptionsModalShown} toggle={props.onToggle} size="md">
            <ModalHeader>
                <Container className="my-2"><h3>Choose EP-Pickup Rate</h3></Container>
            </ModalHeader>

            <ModalBody>

                <Row>
                    <Form className="m-4 p-2 w-100">
                        {getFormSections(props)}
                    </Form>
                </Row>

            </ModalBody>

            <ModalFooter>
                <Button className="mr-2" color="secondary" onClick={props.onClose}>close</Button>
                <Button color='primary' onClick={props.onBuyPickupRate}>{btnContent}</Button>
            </ModalFooter>

        </Modal>
    );
};



function getFormSections(props) {

    const sections = props.pickupRates?.map((r, i) => {

        let pickupRateLabel = r.carrier;
        pickupRateLabel += ' / ' + r.service;
        pickupRateLabel += ' / $' + r.rate;

        const isSelected = (props.selectedPickupRateId === r.id ? true : false);

        return (
            <FormGroup row check key={i}>
                <Label check className="mb-3">
                    <Input type="radio" name="pickupRateRadioBtns" checked={isSelected} value={r.id} onChange={(e) => props.onPickupRateOptionChange(e)} />
                    {pickupRateLabel}
                </Label>
            </FormGroup>
        );
    });


    return sections;

}