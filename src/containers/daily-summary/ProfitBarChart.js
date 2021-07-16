import React from "react";
import { Bar } from "react-chartjs-2";

import {
    Card,
    CardBody,
    CardHeader,
    CardTitle
} from "reactstrap";
import { roundUpToBaseFiveOrTen } from "../../bmd/helpers/HelperFuncsA";
import Bs from "../../bs/core/Bs";
import { extractFinanceGraphData } from "./helpers/HelperFuncsB";



const ProfitBarChart = (props) => {

    const theme = props.theme

    const extractedRevenuesGraphData = extractFinanceGraphData(props.financeGraphData, 'revenue');
    const extractedExpensesGraphData = extractFinanceGraphData(props.financeGraphData, 'expenses');

    let profitLabels = extractedRevenuesGraphData.labels;
    let profitData = [];
    const periodNumDays = props.financeGraphData.numOfPeriods;
    let financeStatMaxVal = 0.0;


    for (let i = 0; i < periodNumDays; i++) {
        
        const ithRevenue = extractedRevenuesGraphData.data[i];
        const ithExpense = extractedExpensesGraphData.data[i];
        const ithProfit = parseFloat(ithRevenue) - parseFloat(ithExpense);

        profitData.push(ithProfit.toFixed(2));
        
        Bs.log(ithProfit);

        if (ithProfit > financeStatMaxVal) {
            financeStatMaxVal = ithProfit;
        }
    }



    const data = {
        labels: profitLabels,
        datasets: [
            {
                label: "$",
                backgroundColor: theme.success,
                borderColor: theme.success,
                hoverBackgroundColor: theme.primary,
                hoverBorderColor: theme.primary,
                data: profitData,
                barPercentage: 1,
                categoryPercentage: 0.5
            }
        ]
    };


    let yAxisInterval = parseInt(financeStatMaxVal / 10);
    yAxisInterval = roundUpToBaseFiveOrTen(yAxisInterval);


    const options = {
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        scales: {
            yAxes: [
                {
                    gridLines: {
                        display: false
                    },
                    stacked: false,
                    ticks: {
                        stepSize: yAxisInterval
                    }
                }
            ],
            xAxes: [
                {
                    stacked: false,
                    gridLines: {
                        color: "transparent"
                    }
                }
            ]
        }
    };



    return (
        <Card className="flex-fill w-100">
            <CardHeader>
                <CardTitle tag="h5" className="mb-0">
                    Profit
                </CardTitle>
            </CardHeader>
            <CardBody className="d-flex">
                <div className="align-self-center w-100">
                    <div className="chart chart-lg">
                        <Bar data={data} options={options} />
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default ProfitBarChart;
