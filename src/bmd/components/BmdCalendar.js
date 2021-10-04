import React from "react";
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle
} from "reactstrap";


import DateTime from "react-datetime";

const BmdCalendar = (props) => {

    const isInputEnabled = props.isInputEnabled ? true : false;

    return (
        <Card className="flex-fill w-100">
            <CardHeader>
                <CardTitle tag="h5" className="mb-0">
                    {props.title}
                </CardTitle>
            </CardHeader>
            <CardBody className="d-flex">
                <div className="align-self-center w-100">
                    <DateTime
                        input={isInputEnabled}
                        // defaultValue={DateTime.moment()}
                        value={props.date}
                        dateFormat="L"
                        timeFormat={true}
                        onChange={(moment) => props.onDateChange(props.name, moment)}
                    />
                </div>
            </CardBody>
        </Card>
    );
};

export default BmdCalendar;
