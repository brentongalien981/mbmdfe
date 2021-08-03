import React from 'react';
import { Calendar } from 'react-feather';
import { Input, Card, CardHeader, CardBody, Label, InputGroup, InputGroupAddon, Button, CardTitle, Form, FormGroup } from 'reactstrap';
import { getInitialDate, parseDateToStr } from '../../bmd/helpers/HelperFuncsA';



export const OrderFilters = (props) => {
    return (
        <>
            <h3 style={{ display: 'inlineBlock' }}>Order Filters</h3>

            <div>
                {getObjectIdFilters(props)}
                {getCustomerInfoFilters(props)}
                {getAddressInfoFilters(props)}
                {getStatusAndDatesFilters(props)}
            </div>
        </>
    );
};



const getOrderStatusOptions = (props) => {

    return props.orderStatuses.map((s) => {
        return (<option key={s.code} value={s.code}>{s.name}</option>);
    });
};



const getObjectIdFilters = (props) => {

    const f = props.filters;

    return (
        <Card>
            <CardHeader>
                <CardTitle tag="h5" className="mb-0">Object IDs</CardTitle>
            </CardHeader>

            <CardBody>

                <Form>
                    <FormGroup>
                        <Input type="text" name="orderIdFilter" value={f.orderIdFilter} onChange={(e) => props.onOrderFilterInputChange(e)} placeholder="Order ID" />
                    </FormGroup>

                    <FormGroup>
                        <Input type="text" name="userIdFilter" value={f.userIdFilter} onChange={(e) => props.onOrderFilterInputChange(e)} placeholder="User ID" />
                    </FormGroup>

                    <FormGroup>
                        <Input type="text" name="stripePaymentIntentIdFilter" value={f.stripePaymentIntentIdFilter} onChange={(e) => props.onOrderFilterInputChange(e)} placeholder="Stripe Payment Intent ID" />
                    </FormGroup>

                    <FormGroup className="d-flex justify-content-between">
                        <Button size="sm" color="primary" onClick={props.onOrderFiltersApply}>Apply</Button>
                        <Button size="sm" color="danger" onClick={props.onOrderFiltersReset}>Reset All</Button>
                    </FormGroup>
                </Form>

            </CardBody>
        </Card>
    );
};



const getCustomerInfoFilters = (props) => {

    const f = props.filters;

    return (
        <Card>
            <CardHeader>
                <CardTitle tag="h5" className="mb-0">Customer Info</CardTitle>
            </CardHeader>

            <CardBody>
                <Form>
                    <FormGroup>
                        <Input type="text" name="firstNameFilter" value={f.firstNameFilter} onChange={(e) => props.onOrderFilterInputChange(e)} placeholder="First Name" />
                    </FormGroup>

                    <FormGroup>
                        <Input type="text" name="lastNameFilter" value={f.lastNameFilter} onChange={(e) => props.onOrderFilterInputChange(e)} placeholder="Last Name" />
                    </FormGroup>

                    <FormGroup>
                        <Input type="phone" name="phoneFilter" value={f.phoneFilter} onChange={(e) => props.onOrderFilterInputChange(e)} placeholder="Phone #" />
                    </FormGroup>

                    <FormGroup>
                        <Input type="email" name="emailFilter" value={f.emailFilter} onChange={(e) => props.onOrderFilterInputChange(e)} placeholder="Email" />
                    </FormGroup>

                    <FormGroup className="d-flex justify-content-between">
                        <Button size="sm" color="primary" onClick={props.onOrderFiltersApply}>Apply</Button>
                        <Button size="sm" color="danger" onClick={props.onOrderFiltersReset}>Reset All</Button>
                    </FormGroup>
                </Form>

            </CardBody>
        </Card>
    );
};



const getAddressInfoFilters = (props) => {

    const f = props.filters;

    return (
        <Card>
            <CardHeader>
                <CardTitle tag="h5" className="mb-0">Address Info</CardTitle>
            </CardHeader>

            <CardBody>
                <Form>
                    <FormGroup>
                        <Input type="text" name="streetFilter" value={f.streetFilter} onChange={(e) => props.onOrderFilterInputChange(e)} placeholder="Street" />
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="cityFilter" value={f.cityFilter} onChange={(e) => props.onOrderFilterInputChange(e)} placeholder="City" />
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="provinceFilter" value={f.provinceFilter} onChange={(e) => props.onOrderFilterInputChange(e)} placeholder="Province" />
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="countryFilter" value={f.countryFilter} onChange={(e) => props.onOrderFilterInputChange(e)} placeholder="Country" />
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="postalCodeFilter" value={f.postalCodeFilter} onChange={(e) => props.onOrderFilterInputChange(e)} placeholder="ZIP / Postal Code" />
                    </FormGroup>

                    <FormGroup className="d-flex justify-content-between">
                        <Button size="sm" color="primary" onClick={props.onOrderFiltersApply}>Apply</Button>
                        <Button size="sm" color="danger" onClick={props.onOrderFiltersReset}>Reset All</Button>
                    </FormGroup>
                </Form>
            </CardBody>
        </Card>
    );
};



const getStatusAndDatesFilters = (props) => {

    const f = props.filters;

    return (
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
                            value={f.statusFilter}
                            onChange={(e) => props.onOrderFilterInputChange(e)}
                        >
                            {getOrderStatusOptions(props)}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Input type="number" name="deliveryDaysFilter" value={f.deliveryDaysFilter} onChange={(e) => props.onOrderFilterInputChange(e)} placeholder="Delivery Days" />
                    </FormGroup>

                    <br />
                    <FormGroup>
                        <Label>Early Delivery Date on or after</Label>
                        <Input type="date" name="earlyDeliveryDateFilter" value={f.earlyDeliveryDateFilter} onChange={(e) => props.onOrderFilterInputChange(e)} />
                    </FormGroup>

                    <br />
                    <FormGroup>
                        <Label>Late Delivery Date on or after</Label>
                        <Input type="date" name="lateDeliveryDateFilter" value={f.lateDeliveryDateFilter} onChange={(e) => props.onOrderFilterInputChange(e)} />
                    </FormGroup>

                    <br />
                    <FormGroup>
                        <Label>Order Create Date on or after</Label>
                        <Input type="date" name="createDateFilter" value={f.createDateFilter} onChange={(e) => props.onOrderFilterInputChange(e)} />
                    </FormGroup>

                    <br />
                    <FormGroup>
                        <Label>Order Update Date on or after</Label>
                        <Input type="date" name="updateDateFilter" value={f.updateDateFilter} onChange={(e) => props.onOrderFilterInputChange(e)} />
                    </FormGroup>

                    <FormGroup className="d-flex justify-content-between">
                        <Button size="sm" color="primary" onClick={props.onOrderFiltersApply}>Apply</Button>
                        <Button size="sm" color="danger" onClick={props.onOrderFiltersReset}>Reset All</Button>
                    </FormGroup>
                </Form>
            </CardBody>
        </Card>
    );
};