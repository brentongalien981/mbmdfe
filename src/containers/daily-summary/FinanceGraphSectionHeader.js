import React from "react";

import {
    Button,
    Col,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Row,
    UncontrolledDropdown
} from "reactstrap";

import { Calendar, Filter, RefreshCw } from "react-feather";

const FinanceGraphSectionHeader = (props) => {
    return (
        <Row className="mb-2 mb-xl-4">
            <Col xs="auto" className="d-none d-sm-block">
                <h3>Finance Graph</h3>
            </Col>

            <Col xs="auto" className="ml-auto text-right mt-n1">

                <Button color="primary" className="shadow-sm mr-1" onClick={props.onGraphFilterModalShow}>
                    <Filter className="feather" />
                </Button>

                <Button color="primary" className="shadow-sm">
                    <RefreshCw className="feather" />
                </Button>
            </Col>
        </Row>
    );
};

export default FinanceGraphSectionHeader;
