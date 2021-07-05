import React from "react";

import {
    Button,
    Col,
    Row
} from "reactstrap";

import { Calendar, RefreshCw } from "react-feather";
import { getMonthNameByIndex } from "./helpers/HelperFuncsA";

const SectionHeader = (props) => {

    const startDateInStr = getMonthNameByIndex(props.startDate.getMonth()) + ' ' + props.startDate.getDate() + ', ' + props.startDate.getFullYear();
    const endDateInStr = getMonthNameByIndex(props.endDate.getMonth()) + ' ' + props.endDate.getDate() + ', ' + props.endDate.getFullYear();

    const startDateLabel = 'Start date ' + startDateInStr;
    const endDateLabel = 'End date ' + endDateInStr;

    return (
        <Row className="mb-2 mb-xl-4">
            <Col xs="auto" className="d-none d-sm-block">
                <h3>Daily Summary</h3>
            </Col>

            <Col xs="auto" className="ml-auto text-right mt-n1">

                <Button color="primary" className="shadow-sm mr-1" onClick={props.onStatsDatePickerShow}>
                    <Calendar className="feather align-middle mt-n1" /> {startDateLabel}
                </Button>

                <Button color="primary" className="shadow-sm mr-1" onClick={props.onStatsDatePickerShow}>
                    <Calendar className="feather align-middle mt-n1" /> {endDateLabel}
                </Button>

                <Button color="primary" className="shadow-sm" onClick={props.onStatsReset}>
                    <RefreshCw className="feather" />
                </Button>
            </Col>
        </Row>
    );
};

export default SectionHeader;
