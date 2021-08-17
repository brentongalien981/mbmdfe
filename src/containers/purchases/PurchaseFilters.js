import React from 'react';
import { Card, CardBody, Form, FormGroup, Input, Button } from 'reactstrap';



export const PurchaseFilters = (props) => {
    return (
        <>
            <h3 style={{ display: 'inlineBlock' }}>Purchase Filters</h3>

            <div>
                <Card>
                    <CardBody>
                        <Form>
                            
                            <FormGroup>
                                <Input type="text" name="orderIdFilter" value={''} onChange={() => true} placeholder="Order ID" />
                            </FormGroup>

                            <FormGroup className="d-flex justify-content-between">
                                <Button size="sm" color="primary" onClick={() => true}>Apply</Button>
                                <Button size="sm" color="danger" onClick={() => true}>Reset All</Button>
                            </FormGroup>
                        </Form>

                    </CardBody>
                </Card>
            </div>
        </>
    );
};