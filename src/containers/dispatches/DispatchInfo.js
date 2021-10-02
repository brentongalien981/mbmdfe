import React from 'react';
import { Circle } from 'react-feather';
import { Button, Card, CardBody, Col, Form, Row, Spinner } from 'reactstrap';



export const DispatchInfo = (props) => {


    let mainContents = (
        <>
            <Col lg="12">
                <Card>
                    <CardBody>
                        <Form className="p-4">{'Dispatch Details'}</Form>
                    </CardBody>
                </Card>
            </Col>

            <Col sm="12">
                {'TODO: btns'}
            </Col>
        </>
    );


    if (props.isReadingDispatch) {
        mainContents = (
            <Col sm="12">
                <Spinner />
            </Col>
        );
    }


    return (
        <Row className="mb-4 pb-4">
            <Col sm="12"><h2>Dispatch Info</h2></Col>
            {mainContents}
        </Row>
    );
};