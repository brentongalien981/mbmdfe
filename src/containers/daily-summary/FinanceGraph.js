import React from "react";
import { Line } from "react-chartjs-2";
import { connect } from "react-redux";

import { Badge, Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { MILLI_SEC_IN_DAY } from "../../bmd/constants/consts";
import { addCommasToAmount, convertDateToStr, isDateFrameWithinPeriod, roundUpToBaseFiveOrTen } from "../../bmd/helpers/HelperFuncsA";
import Bs from "../../bs/core/Bs";
import { extractFinanceGraphData } from "./helpers/HelperFuncsB";

const FinanceGraph = (props) => {

    const theme = props.theme;

    const extractedRevenuesGraphData = extractFinanceGraphData(props.financeGraphData, 'revenue');
    const extractedExpensesGraphData = extractFinanceGraphData(props.financeGraphData, 'expenses');


    const maxYVal = (extractedRevenuesGraphData.financeStatMaxVal > extractedExpensesGraphData.financeStatMaxVal ? extractedRevenuesGraphData.financeStatMaxVal : extractedExpensesGraphData.financeStatMaxVal);
    let yAxisInterval = parseInt(maxYVal / 10);
    yAxisInterval = roundUpToBaseFiveOrTen(yAxisInterval);



    const data = {
        labels: extractedRevenuesGraphData.labels,
        datasets: [
            {
                label: "Revenue ($)",
                fill: true,
                backgroundColor: "transparent",
                borderColor: theme.primary,
                data: extractedRevenuesGraphData.data
            },
            {
                label: "Expenses ($)",
                fill: true,
                backgroundColor: "transparent",
                borderColor: theme.danger,
                data: extractedExpensesGraphData.data
            }
        ]
    };

    const options = {
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        tooltips: {
            intersect: false
        },
        hover: {
            intersect: true
        },
        plugins: {
            filler: {
                propagate: false
            }
        },
        scales: {
            xAxes: [
                {
                    reverse: true,
                    gridLines: {
                        color: "rgba(0,0,0,0.05)"
                    }
                }
            ],
            yAxes: [
                {
                    ticks: {
                        stepSize: yAxisInterval
                    },
                    display: true,
                    borderDash: [5, 5],
                    gridLines: {
                        color: "rgba(0,0,0,0)",
                        fontColor: "#fff"
                    }
                }
            ]
        }
    };


    return (
        <Card className="flex-fill w-100">
            <CardHeader>
                <Badge color="primary" className="float-right">Daily</Badge>
                <CardTitle tag="h5" className="mb-0">{'Revenue & Expenses'}</CardTitle>
            </CardHeader>
            <CardBody>
                <div className="chart chart-lg">
                    <Line data={data} options={options} />
                </div>
            </CardBody>
        </Card>
    );
};


export default FinanceGraph;
