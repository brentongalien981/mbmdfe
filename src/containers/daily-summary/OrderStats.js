import React from "react";
import { Col, Card, CardBody, Media, Row } from "reactstrap";

import { ShoppingCart, Activity, DollarSign, ShoppingBag } from "react-feather";

const OrderStats = () => (
    <Row>

        <Col md="6" xl>
            <Card className="flex-fill">
                <CardBody className="py-4">
                    <Media>
                        <div className="d-inline-block mt-2 mr-3">
                            <ShoppingCart className="feather-lg text-primary" />
                        </div>
                        <Media body>
                            <h3 className="mb-2">63</h3>
                            <div className="mb-0"># of Orders</div>
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
                            <Activity className="feather-lg text-warning" />
                        </div>
                        <Media body>
                            <h3 className="mb-2">82</h3>
                            <div className="mb-0"># of Order Items</div>
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
                            <h3 className="mb-2">4</h3>
                            <div className="mb-0"># of Incomplete Orders</div>
                        </Media>
                    </Media>
                </CardBody>
            </Card>
        </Col>

    </Row>
);

export default OrderStats;
