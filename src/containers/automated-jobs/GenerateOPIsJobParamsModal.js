import React from 'react';
import { Button, Label, Modal, ModalBody, ModalFooter, ModalHeader, Col, Input, Form, FormGroup, Row } from 'reactstrap';
import BmdCalendar from '../../bmd/components/BmdCalendar';
import { TREND_CHANGE_OPTIONS } from './constants/consts';



const GenerateOPIsJobParamsModal = (props) => {

    const modalName = 'GenerateOPIsJobParamsModal';


    return (
        <Modal isOpen={props.isOpen} toggle={() => props.onToggle(modalName)} size='lg'>
            <ModalHeader>GenerateOPIs Job Parameters</ModalHeader>

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
                    <Form className="m-3 w-100">
                        <FormGroup row>
                            <Label sm={4} className="text-sm-right">Max-Base-Num of Daily Orders</Label>
                            <Col sm={4}>
                                <Input type="number" min="1" step="1" name="maxBaseNumOfDailyOrders" value={props.trendInputValues.maxBaseNumOfDailyOrders} onChange={props.onTrendInputChange} />
                            </Col>
                        </FormGroup>

                        {trendPeriodFormGroup(props)}
                        {trendChangeFormGroup(props)}
                        {trendChangePercentageFormGroup(props)}

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




const trendPeriodFormGroup = (props) => {

    const trendPeriodOptionsComponent = props.trendInputValues.trendPeriodGroup.map((o, i) => {

        return (
            <FormGroup check inline key={i}>
                <Label check className="mr-3">
                    <Input type="radio" name="trendPeriodRadioBtns" checked={o.checked} value={o.value} onChange={props.onTrendInputChange} />{o.name}
                </Label>
            </FormGroup>
        );
    });


    return (
        <FormGroup row>
            <Label sm={4} className="text-sm-right">Trend Period</Label>
            <Col sm={8}>{trendPeriodOptionsComponent}</Col>
        </FormGroup>
    );
};




const trendChangeFormGroup = (props) => {

    const trendChangeOptionsComponent = props.trendInputValues.trendChangeGroup.map((trendChangeOption, i) => {

        const o = trendChangeOption;

        return (
            <FormGroup check inline key={i}>
                <Label check className="mr-3">
                    <Input type="radio" name="trendChangeRadioBtns" checked={o.checked} value={o.value} onChange={props.onTrendInputChange} />{o.name}
                </Label>
            </FormGroup>
        );
    });


    return (
        <FormGroup row>
            <Label sm={4} className="text-sm-right">Trend Change</Label>
            <Col sm={8}>{trendChangeOptionsComponent}</Col>
        </FormGroup>
    );
};



const trendChangePercentageFormGroup = (props) => {
    return (
        <FormGroup row>
            <Label sm={4} className="text-sm-right">Trend Change Percentage</Label>
            <Col sm={4}>
                <Input type="number" step="0.01" min="0" name="trendChangePercentage" value={props.trendInputValues.trendChangePercentage} onChange={props.onTrendInputChange} />
            </Col>
        </FormGroup>
    );
};



export default GenerateOPIsJobParamsModal;