import React from 'react';
import { Input, Card, CardHeader, CardBody, InputGroup, CardTitle, Form, FormGroup } from 'reactstrap';



export const OrderFilters = (props) => {
    return (
        <>
            <h3>Order Filters</h3>

            <div>

                <Card>
                    <CardHeader>
                        <CardTitle tag="h5" className="mb-0">Filter-Group Name</CardTitle>
                    </CardHeader>

                    <CardBody>

                        <Form>
                            <FormGroup>
                                <Input type="text" name="orderIdFilter" placeholder="Order ID" />
                            </FormGroup>

                            <FormGroup>
                                <Input type="text" name="userIdFilter" placeholder="User ID" />
                            </FormGroup>

                            <FormGroup>
                                <Input type="text" name="StripePaymentIntentIdFilter" placeholder="Stripe Payment Intent ID" />
                            </FormGroup>
                        </Form>

                    </CardBody>
                </Card>



                <Card>
                    <CardHeader>
                        <CardTitle tag="h5" className="mb-0">Customer Info</CardTitle>
                    </CardHeader>

                    <CardBody>

                        <InputGroup className="mb-3">
                            <Input type="text" name="firstNameFilter" placeholder="First Name" />
                            <Input type="text" name="lastNameFilter" placeholder="Last Name" />
                        </InputGroup>

                    </CardBody>
                </Card>
            </div>
        </>
    );
};