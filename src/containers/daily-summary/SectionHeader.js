import React from "react";

import {
    Button,
    Col,
    Row
} from "reactstrap";

import { Calendar, RefreshCw } from "react-feather";

const SectionHeader = (props) => {

    const fromDateLabel = 'Date from ' + '02-16-2021';
    const toDateLabel = 'Date to ' + '07-03-2021';

    return (
        <Row className="mb-2 mb-xl-4">
            <Col xs="auto" className="d-none d-sm-block">
                <h3>Daily Summary</h3>
            </Col>

            <Col xs="auto" className="ml-auto text-right mt-n1">

                <Button color="primary" className="shadow-sm mr-1" onClick={props.onStatsDatePickerShow}>
                    <Calendar className="feather align-middle mt-n1" /> {fromDateLabel}
                </Button>

                <Button color="primary" className="shadow-sm mr-1">
                    <Calendar className="feather align-middle mt-n1" /> {toDateLabel}
                </Button>

                <Button color="primary" className="shadow-sm">
                    <RefreshCw className="feather" />
                </Button>
            </Col>
        </Row>
    );
};

export default SectionHeader;
