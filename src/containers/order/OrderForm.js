import React from 'react';
import { Button, Card, CardBody, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';



export const OrderForm = (props) => {

    return (
        <Row>
            <Col sm="12"><h2>Order</h2></Col>

            <Col lg="6">
                <Card>
                    <CardBody>
                        <Form>
                            <FormGroup row>
                                <Label sm={2} className="text-sm-right">Order ID</Label>
                                <Col sm={10}><Input type="text" placeholder="Order ID" /></Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm={2} className="text-sm-right">Order ID</Label>
                                <Col sm={10}><Input type="text" placeholder="Order ID" /></Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm={2} className="text-sm-right">Order ID</Label>
                                <Col sm={10}><Input type="text" placeholder="Order ID" /></Col>
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
            </Col>



            <Col lg="6">
                <Card>
                    <CardBody>
                        <Form>
                            <FormGroup row>
                                <Label sm={2} className="text-sm-right">Order ID</Label>
                                <Col sm={10}><Input type="text" placeholder="Order ID" /></Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm={2} className="text-sm-right">Order ID</Label>
                                <Col sm={10}><Input type="text" placeholder="Order ID" /></Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm={2} className="text-sm-right">Order ID</Label>
                                <Col sm={10}><Input type="text" placeholder="Order ID" /></Col>
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
            </Col>




            <Col sm="12">
                <Button color="primary">Update</Button>
            </Col>
        </Row>
    );
};