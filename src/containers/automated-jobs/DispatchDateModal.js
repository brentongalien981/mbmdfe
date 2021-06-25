import React from 'react';
import { Button, Label, Modal, ModalBody, ModalFooter, ModalHeader, Input, Form, FormGroup } from 'reactstrap';



const DispatchDateModal = (props) => {
    return (
        <Modal isOpen={props.isOpen}>
            <ModalHeader>
                Select orders date-period
            </ModalHeader>

            <ModalBody className="text-center m-3">
                <Form inline className='d-flex justify-content-between'>
                    <FormGroup>
                        <Label className='mr-2'>from</Label>
                        <Input
                            bsSize="lg"
                            type="date"
                            name="dispatchDateFrom"
                            placeholder="from"
                            value={props.dispatchDateFrom}
                            onChange={props.onDateChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label className='mr-2'>to</Label>
                        <Input
                            bsSize="lg"
                            type="date"
                            name="dispatchDateTo"
                            placeholder="to"
                            value={props.dispatchDateTo}
                            onChange={props.onDateChange}
                        />
                    </FormGroup>
                </Form>


            </ModalBody>

            <ModalFooter>
                <Button color="secondary" onClick={props.onClose}>close</Button>{" "}
                <Button color='primary'  onClick={props.onDispatch}>Dispatch</Button>
            </ModalFooter>

        </Modal>
    );
};



export default DispatchDateModal;