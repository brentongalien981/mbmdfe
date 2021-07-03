import React from "react";
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle
} from "reactstrap";


import DateTime from "react-datetime";

const BmdCalendar = (props) => (
    <Card className="flex-fill w-100 m-3">
        <CardHeader>
            <CardTitle tag="h5" className="mb-0">
                {props.title}
            </CardTitle>
        </CardHeader>
        <CardBody className="d-flex">
            <div className="align-self-center w-100">
                <DateTime
                    input={false}
                    defaultValue={DateTime.moment()}
                    dateFormat="L"
                    timeFormat={false}
                />
            </div>
        </CardBody>
    </Card>
);

export default BmdCalendar;
