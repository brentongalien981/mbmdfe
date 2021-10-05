import React from 'react';
import { Button, Label, Modal, ModalBody, ModalFooter, ModalHeader, Col, Input, Form, FormGroup, Row, Spinner, Container } from 'reactstrap';
// import BmdCalendar from '../daily-summary/BmdCalendar';
import BmdCalendar from '../../bmd/components/BmdCalendar';



export const EpBatchPickupInfoFormModal = (props) => {
    
    const btnContent = props.isSavingEpBatchPickupInfo ? <Spinner size="sm" /> : 'save';


    return (
        <Modal isOpen={props.isEpBatchPickupInfoFormModalShown} toggle={() => props.onToggle()} size='lg'>
            <ModalHeader>
                <Container className="my-2"><h3>EP-Batch Pickup Info</h3></Container>
            </ModalHeader>

            <ModalBody>

                <Row>
                    <Col>
                        <BmdCalendar title='Earliest Pickup Date' name={'EpBatchPickupInfoFormCalendar-earliestPickup'} withTime={true} date={props.pickup.epBatchEarliestPickupDatetime} onDateChange={props.onDateChange} />
                    </Col>
                    <Col>
                        <BmdCalendar title='Latest Pickup Date' name={'EpBatchPickupInfoFormCalendar-latestPickup'} withTime={true} date={props.pickup.epBatchLatestPickupDatetime} onDateChange={props.onDateChange} />
                    </Col>
                </Row>


                <Row>
                    <Form className="m-3 w-100">
                        <FormGroup row>
                            <Label sm={3} className="text-sm-right">Pickup Reference String</Label>
                            <Col sm={7}>
                                <Input type="text" name="referenceString" value={props.pickup.referenceString} onChange={(e) => props.onInputChange(e)} />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label sm={3} className="text-sm-right">Notes to Carrier</Label>
                            <Col sm={7}>
                                <Input type="text" name="carrierNotes" value={props.pickup.carrierNotes} onChange={(e) => props.onInputChange(e)} />
                            </Col>
                        </FormGroup>                                                

                    </Form>
                </Row>

            </ModalBody>

            <ModalFooter>
                <Button className="mr-2" color="secondary" onClick={() => props.onClose()}>close</Button>
                <Button color='primary' onClick={props.onEpBatchPickupInfoSave}>{btnContent}</Button>
            </ModalFooter>

        </Modal>
    );
};