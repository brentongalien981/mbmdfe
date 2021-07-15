import React from "react";
import { Line } from "react-chartjs-2";
import { connect } from "react-redux";

import { Badge, Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { MILLI_SEC_IN_DAY } from "../../bmd/constants/consts";
import { addCommasToAmount, convertDateToStr, isDateFrameWithinPeriod, roundUpToBaseFiveOrTen } from "../../bmd/helpers/HelperFuncsA";
import Bs from "../../bs/core/Bs";

const FinanceGraph = (props) => {

    const theme = props.theme;

    let graphLabels = [];
    let revenuesGraphData = [];
    let expensesGraphData = [];
    let maxRevenue = 0.0;
    let maxExpense = 0.0;

    const period = props.financeGraphData.period;
    const numOfPeriods = props.financeGraphData.numOfPeriods;
    const revenuesByPeriod = props.financeGraphData.revenuesByPeriod;
    const expensesByPeriod = props.financeGraphData.expensesByPeriod;
    const dateSpanStartDate = props.financeGraphData.dateSpanStartDate + ' 00:00:01'; // To use ET not UTC.
    const dateSpanEndDate = props.financeGraphData.dateSpanEndDate;

    let indexOfCurrentlyExtractedRevenue = 0;
    let indexOfCurrentlyExtractedExpense = 0;


    for (let i = 0; i < numOfPeriods; i++) {

        const periodStartDate = convertDateToStr(new Date(Date.parse(dateSpanStartDate) + (i * period * MILLI_SEC_IN_DAY)));
        graphLabels.push(periodStartDate);


        /* revenue-graph-data */
        const revenueThisPeriod = revenuesByPeriod[indexOfCurrentlyExtractedRevenue];

        if (revenueThisPeriod) {

            const datesToCheck = {
                periodStartDate: periodStartDate,
                period: period,
                startDate: revenueThisPeriod.startDate,
                endDate: revenueThisPeriod.endDate
            };

            if (isDateFrameWithinPeriod(datesToCheck)) {
                revenuesGraphData.push(revenueThisPeriod.revenue.toFixed(2));
                ++indexOfCurrentlyExtractedRevenue;
            } else {
                revenuesGraphData.push('0.00');
            }


            if (revenueThisPeriod.revenue > maxRevenue) {
                maxRevenue = revenueThisPeriod.revenue;
            }
        }
        else {
            revenuesGraphData.push('0.00');
        }



        /* expenses-graph-data */
        const expenseThisPeriod = expensesByPeriod[indexOfCurrentlyExtractedExpense];

        if (expenseThisPeriod) {

            const datesToCheckForExpenses = {
                periodStartDate: periodStartDate,
                period: period,
                startDate: expenseThisPeriod.startDate,
                endDate: expenseThisPeriod.endDate
            };

            if (isDateFrameWithinPeriod(datesToCheckForExpenses)) {
                expensesGraphData.push(expenseThisPeriod.expenses.toFixed(2));
                ++indexOfCurrentlyExtractedExpense;
            } else {
                expensesGraphData.push('0.00');
            }


            if (expenseThisPeriod.expenses > maxExpense) {
                maxExpense = expenseThisPeriod.expenses;
            }
        }
        else {
            expensesGraphData.push('0.00');
        }

    }



    const maxYVal = (maxRevenue > maxExpense ? maxRevenue : maxExpense);
    let yAxisInterval = parseInt(maxYVal / 10);
    yAxisInterval = roundUpToBaseFiveOrTen(yAxisInterval);



    const data = {
        labels: graphLabels,
        datasets: [
            {
                label: "Revenue ($)",
                fill: true,
                backgroundColor: "transparent",
                borderColor: theme.primary,
                data: revenuesGraphData
            },
            {
                label: "Expenses ($)",
                fill: true,
                backgroundColor: "transparent",
                borderColor: theme.danger,
                data: expensesGraphData
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
                <CardTitle tag="h5" className="mb-0">Revenue</CardTitle>
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
