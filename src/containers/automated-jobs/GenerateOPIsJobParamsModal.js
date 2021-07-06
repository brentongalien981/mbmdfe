import React from 'react';
import { Button, Label, Modal, ModalBody, ModalFooter, ModalHeader, Col, Input, Form, FormGroup, Row } from 'reactstrap';
import BmdCalendar from '../../bmd/components/BmdCalendar';



const GenerateOPIsJobParamsModal = (props) => {

    const modalName = 'GenerateOPIsJobParamsModal';


    return (
        <Modal isOpen={props.isOpen} toggle={() => props.onToggle(modalName)} size='lg'>
            <ModalHeader>
                GenerateOPIs Job Parameters
            </ModalHeader>

            <ModalBody>

                <Row>
                    <Col>
                        <BmdCalendar title='Start Date' name={modalName + '-startDate'} date={props.startDate} onDateChange={props.onDateChange} />
                    </Col>
                    <Col>
                        <BmdCalendar title='End Date' name={modalName + '-endDate'} date={props.endDate} onDateChange={props.onDateChange} />
                    </Col>
                </Row>


                <Row>
                    <Form className="m-3">
                        <FormGroup row>
                            <Label sm={4} className="text-sm-right">Max-Base-Num of Daily Orders</Label>
                            <Col sm={8}>
                                <Input type="text" name="maxBaseNumOfDailyOrders" placeholder="20" />
                            </Col>
                        </FormGroup>

                        <FormGroup check inline>
                            <Label check className="mr-4">
                                <Input type="radio" name="radio2" checked onChange={() => true} /> 1
                            </Label>
                            <Label check className="mr-4">
                                <Input type="radio" name="radio2" /> 2
                            </Label>
                        </FormGroup>

                    </Form>
                </Row>

            </ModalBody>

            <ModalFooter>
                <Button color="secondary" onClick={() => props.onClose(modalName)}>close</Button>{" "}
                <Button color='primary' onClick={props.onDispatch}>dispatch</Button>
            </ModalFooter>

        </Modal>
    );
};



export default GenerateOPIsJobParamsModal;