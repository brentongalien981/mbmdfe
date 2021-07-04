import React from "react";
import { Col, Card, CardBody, Media, Row } from "reactstrap";

import { ShoppingCart, Activity, DollarSign, ShoppingBag, List } from "react-feather";

const OrderStats = (props) => (
    <Row>

        <Col md="6" xl>
            <Card className="flex-fill">
                <CardBody className="py-4">
                    <Media>
                        <div className="d-inline-block mt-2 mr-3">
                            <ShoppingCart className="feather-lg text-success" />
                        </div>
                        <Media body>
                            <h3 className="mb-2">{props.numOfOrders}</h3>
                            <div className="mb-0">Orders</div>
                        </Media>
                    </Media>
                </CardBody>
            </Card>
        </Col>


        <Col md="6" xl>
            <Card className="flex-fill">
                <CardBody className="py-4">
                    <Media>
                        <div className="d-inline-block mt-2 mr-3">
                            <List className="feather-lg text-success" />
                        </div>
                        <Media body>
                            <h3 className="mb-2">{props.numOfOrderItems}</h3>
                            <div className="mb-0">Order Items</div>
                        </Media>
                    </Media>
                </CardBody>
            </Card>
        </Col>


        <Col md="6" xl>
            <Card className="flex-fill">
                <CardBody className="py-4">
                    <Media>
                        <div className="d-inline-block mt-2 mr-3">
                            <ShoppingBag className="feather-lg text-danger" />
                        </div>
                        <Media body>
                            <h3 className="mb-2">{props.numOfIncompleteOrders}</h3>
                            <div className="mb-0">Incomplete Orders</div>
                        </Media>
                    </Media>
                </CardBody>
            </Card>
        </Col>

    </Row>
);

export default OrderStats;
