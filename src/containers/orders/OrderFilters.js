import React from 'react';
import { Calendar } from 'react-feather';
import { Input, Card, CardHeader, CardBody, Label, InputGroup, InputGroupAddon, Button, CardTitle, Form, FormGroup } from 'reactstrap';
import { getInitialDate, parseDateToStr } from '../../bmd/helpers/HelperFuncsA';



export const OrderFilters = (props) => {
    return (
        <>
            <h3 style={{display: 'inlineBlock'}}>Order Filters</h3>

            <div>

                <Card>
                    <CardHeader>
                        <CardTitle tag="h5" className="mb-0">Object IDs</CardTitle>
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
                                <Input type="text" name="stripePaymentIntentIdFilter" placeholder="Stripe Payment Intent ID" />
                            </FormGroup>

                            <FormGroup className="d-flex justify-content-between">
                                <Button size="sm" color="primary">Apply All Filters</Button>
                                <Button size="sm" color="danger">Reset All Filters</Button>                           
                            </FormGroup>
                        </Form>

                    </CardBody>
                </Card>



                <Card>
                    <CardHeader>
                        <CardTitle tag="h5" className="mb-0">Customer Info</CardTitle>
                    </CardHeader>

                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Input type="text" name="firstNameFilter" placeholder="First Name" />
                            </FormGroup>

                            <FormGroup>
                                <Input type="text" name="lastNameFilter" placeholder="Last Name" />
                            </FormGroup>

                            <FormGroup>
                                <Input type="phone" name="phoneFilter" placeholder="Phone #" />
                            </FormGroup>

                            <FormGroup>
                                <Input type="email" name="emailFilter" placeholder="Email" />
                            </FormGroup>

                            <FormGroup className="d-flex justify-content-between">
                                <Button size="sm" color="primary">Apply All Filters</Button>
                                <Button size="sm" color="danger">Reset All Filters</Button>                            
                            </FormGroup>
                        </Form>

                    </CardBody>
                </Card>



                <Card>
                    <CardHeader>
                        <CardTitle tag="h5" className="mb-0">Address Info</CardTitle>
                    </CardHeader>

                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Input type="text" name="streetFilter" placeholder="Street" />
                            </FormGroup>
                            <FormGroup>
                                <Input type="text" name="cityFilter" placeholder="City" />
                            </FormGroup>
                            <FormGroup>
                                <Input type="text" name="provinceFilter" placeholder="Province" />
                            </FormGroup>
                            <FormGroup>
                                <Input type="text" name="countryFilter" placeholder="Country" />
                            </FormGroup>
                            <FormGroup>
                                <Input type="text" name="postalCodeFilter" placeholder="ZIP / Postal Code" />
                            </FormGroup>

                            <FormGroup className="d-flex justify-content-between">
                                <Button size="sm" color="primary">Apply All Filters</Button>
                                <Button size="sm" color="danger">Reset All Filters</Button>                       
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>



                <Card>
                    <CardHeader>
                        <CardTitle tag="h5" className="mb-0">Status and Dates</CardTitle>
                    </CardHeader>

                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Input
                                    type="select"
                                    name="statusFilter"
                                    className="mb-3"
                                    value={props.filters.statusFilter}
                                    onChange={() => true}
                                >
                                    {getOrderStatusOptions(props)}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Input type="text" name="deliveryDaysFilter" placeholder="Delivery Days" />
                            </FormGroup>

                            <br />
                            <FormGroup>
                                <Label>Early Delivery Date on or after</Label>
                                <Input type="date" name="earlyDeliveryDateFilter" value={props.filters.earlyDeliveryDateFilter} onChange={() => true} />
                            </FormGroup>

                            <br />
                            <FormGroup>
                                <Label>Late Delivery Date on or after</Label>
                                <Input type="date" name="lateDeliveryDateFilter" value={props.filters.lateDeliveryDateFilter} onChange={() => true} />
                            </FormGroup>

                            <br />
                            <FormGroup>
                                <Label>Order Create Date on or after</Label>
                                <Input type="date" name="createDateFilter" value={props.filters.createDateFilter} onChange={() => true} />
                            </FormGroup>

                            <br />
                            <FormGroup>
                                <Label>Order Update Date on or after</Label>
                                <Input type="date" name="updateDateFilter" value={props.filters.updateDateFilter} onChange={() => true} />
                            </FormGroup>

                            <FormGroup className="d-flex justify-content-between">
                                <Button size="sm" color="primary">Apply All Filters</Button>
                                <Button size="sm" color="danger">Reset All Filters</Button>                              
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </>
    );
};



const getOrderStatusOptions = (props) => {

    return props.orderStatuses.map((s) => {
        return (<option key={s.id} value={s.id}>{s.name}</option>);
    });
};