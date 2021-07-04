import React from "react";
import { Col, Card, CardBody, Media, Row } from "reactstrap";

import { DollarSign, TrendingUp, TrendingDown } from "react-feather";

const FinanceStats = (props) => {

    const profit = props.revenue - props.expenses;

    return (
        <Row>

            <Col md="6" xl>
                <Card className="flex-fill">
                    <CardBody className="py-4">
                        <Media>
                            <div className="d-inline-block mt-2 mr-3">
                                <TrendingUp className="feather-lg text-primary" />
                            </div>
                            <Media body>
                                <h3 className="mb-2">${props.revenue.toFixed(2)}</h3>
                                <div className="mb-0">Revenue</div>
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
                                <TrendingDown className="feather-lg text-danger" />
                            </div>
                            <Media body>
                                <h3 className="mb-2">${props.expenses.toFixed(2)}</h3>
                                <div className="mb-0">Expenses</div>
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
                                <DollarSign className="feather-lg text-success" />
                            </div>
                            <Media body>
                                <h3 className="mb-2">${profit.toFixed(2)}</h3>
                                <div className="mb-0">Profit</div>
                            </Media>
                        </Media>
                    </CardBody>
                </Card>
            </Col>

        </Row>
    );
};

export default FinanceStats;
