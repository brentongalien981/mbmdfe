import React from 'react';
import { Button, Card, CardBody, Col, Form, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import Input from 'reactstrap/lib/Input';
import BmdCalendar from './BmdCalendar';



const GraphFiltersModal = (props) => {
    return (
        <Modal isOpen={props.isOpen} toggle={props.onToggle} size='lg'>
            <ModalHeader>
                Select Date Period
            </ModalHeader>

            <ModalBody>

                <Row>
                    <Col>
                        <BmdCalendar title='Start Date' date={props.startDate} dateType="startDate" onDateChange={props.onDateChange} />
                    </Col>
                    <Col>
                        <BmdCalendar title='End Date' date={props.endDate} dateType="endDate" onDateChange={props.onDateChange} />
                    </Col>
                </Row>


                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                                <Label>Period</Label>
                                <Input
                                    value={props.graphFilterSelectedPeriod}
                                    onChange={(e) => props.onSelectedPeriodChange(e)}
                                    type="select"
                                    name="graphFilterSelectedPeriod"
                                    className="mb-3"
                                >
                                    <option value="daily">daily</option>
                                    <option value="weekly">weekly</option>
                                    <option value="monthly">monthly</option>
                                    <option value="yearly">yearly</option>
                                </Input>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

            </ModalBody>

            <ModalFooter>
                <Button color="secondary" onClick={props.onClose}>close</Button>{" "}
                <Button color='primary' onClick={props.onApply}>apply</Button>
            </ModalFooter>

        </Modal>
    );
};



export default GraphFiltersModal;