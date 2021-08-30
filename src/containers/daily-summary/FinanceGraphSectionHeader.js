import React from "react";

import {
    Button,
    Col,
    Row,
} from "reactstrap";

import { Calendar, Filter, RefreshCw } from "react-feather";
import Label from "reactstrap/lib/Label";
import { getReadableDate, getReadableDate2 } from "../../bmd/helpers/HelperFuncsA";

const FinanceGraphSectionHeader = (props) => {

    const currentDatetime = new Date();
    const startDatetimeStr = props.financeGraphData.dateSpanStartDate + ' ' + currentDatetime.getHours() + ':' + currentDatetime.getMinutes() + ':' + currentDatetime.getSeconds();
    const endDatetimeStr = props.financeGraphData.dateSpanEndDate + ' ' + currentDatetime.getHours() + ':' + currentDatetime.getMinutes() + ':' + currentDatetime.getSeconds();

    return (
        <Row className="mb-2 mb-xl-4">
            <Col xs="auto" className="d-none d-sm-block">
                <h3>Finance Graph</h3>
            </Col>

            <Col xs="auto" className="ml-auto text-right mt-n1">

                <Label className="mr-2" style={{ fontWeight: '900', fontSize: '1.1em' }}>{'Date Span:'}</Label>
                <Label className="mr-4">{getReadableDate2(startDatetimeStr) + ' to ' + getReadableDate2(endDatetimeStr)}</Label>
                <Label className="mr-2" style={{ fontWeight: '900', fontSize: '1.1em' }}>{'Period Mode:'}</Label>
                <Label className="mr-4">{props.financeGraphData.graphFilterSelectedPeriod}</Label>

                <Button color="primary" className="shadow-sm mr-1" onClick={props.onGraphFilterModalShow}>
                    <Filter className="feather" />
                </Button>

                <Button color="primary" className="shadow-sm" onClick={props.onGraphFilterReset}>
                    <RefreshCw className="feather" />
                </Button>
            </Col>
        </Row>
    );
};

export default FinanceGraphSectionHeader;
