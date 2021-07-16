import React from 'react';
import { Button, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import BmdCalendar from './BmdCalendar';



const GraphFiltersModal = (props) => {
    return (
        <Modal isOpen={props.isOpen} toggle={props.onToggle} size='lg'>
            <ModalHeader>
                Select Date Period
            </ModalHeader>

            <ModalBody className='d-flex justify-content-around'>
                <BmdCalendar title='Start Date' date={props.startDate} dateType="startDate" onDateChange={props.onDateChange} />
                <BmdCalendar title='End Date' date={props.endDate} dateType="endDate" onDateChange={props.onDateChange} />
            </ModalBody>

            <ModalFooter>
                <Button color="secondary" onClick={props.onClose}>close</Button>{" "}
                <Button color='primary' onClick={props.onApply}>apply</Button>
            </ModalFooter>

        </Modal>
    );
};



export default GraphFiltersModal;