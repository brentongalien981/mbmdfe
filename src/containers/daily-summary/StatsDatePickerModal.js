import React from 'react';
import { Button, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import BmdCalendar from './BmdCalendar';



const StatsDatePickerModal = (props) => {
    return (
        <Modal isOpen={props.isStatsDatePickerOpen} toggle={props.onStatsDatePickerToggle} size='lg'>
            <ModalHeader>
                Select Date Period
            </ModalHeader>

            <ModalBody className='d-flex justify-content-around'>
                <BmdCalendar title='Start Date' date={props.startDate} dateType="startDate" onDateChange={props.onStatsDateChange} />
                <BmdCalendar title='End Date' date={props.endDate} dateType="endDate" onDateChange={props.onStatsDateChange} />
            </ModalBody>

            <ModalFooter>
                <Button color="secondary" onClick={props.onStatsDatePickerClose}>close</Button>{" "}
                <Button color='primary' onClick={props.onStatsDatePickerApply}>apply</Button>
            </ModalFooter>

        </Modal>
    );
};



export default StatsDatePickerModal;