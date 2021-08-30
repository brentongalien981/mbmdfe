import React from "react";

import {
    Button,
    Col,
    Label,
    Row
} from "reactstrap";

import {Filter, RefreshCw } from "react-feather";
import { convertDatetimeToStr, convertDateToStr } from "./helpers/HelperFuncsA";
import { getReadableDate, getReadableDate2 } from "../../bmd/helpers/HelperFuncsA";

const SectionHeader = (props) => {

    return (
        <Row className="mb-2 mb-xl-4">
            <Col xs="auto" className="d-none d-sm-block">
                <h3>Daily Summary</h3>
            </Col>

            <Col xs="auto" className="ml-auto text-right mt-n1">
                
                <Label className="mr-2" style={{ fontWeight: '900', fontSize: '1.1em' }}>{'Date Span:'}</Label>
                <Label className="mr-4">{getReadableDate2(convertDatetimeToStr(props.startDate)) + ' to ' + getReadableDate2(convertDatetimeToStr(props.endDate))}</Label>
                <Label className="mr-2" style={{ fontWeight: '900', fontSize: '1.1em' }}>{'Period Mode:'}</Label>
                <Label className="mr-4">{'daily'}</Label>

                <Button color="primary" className="shadow-sm mr-1" onClick={props.onStatsDatePickerShow}>
                    <Filter className="feather" />
                </Button>

                <Button color="primary" className="shadow-sm" onClick={props.onStatsReset}>
                    <RefreshCw className="feather" />
                </Button>
            </Col>
        </Row>
    );
};

export default SectionHeader;
