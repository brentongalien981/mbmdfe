import React from "react";
import { Line } from "react-chartjs-2";
import { connect } from "react-redux";

import { Badge, Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import Bs from "../../bs/core/Bs";

const FinanceGraph = (props) => {

    const theme = props.theme;

    let graphLabels = [];
    let graphData = [];
    let maxRevenue = 0.0;

    for (const revenueThisPeriod of props.financeGraphData.revenuesByPeriod) {
        graphLabels.push(revenueThisPeriod.startDate);
        graphData.push(revenueThisPeriod.revenue);

        if (revenueThisPeriod.revenue > maxRevenue) {
            maxRevenue = revenueThisPeriod.revenue;
        }
    }

    const yAxisInterval = parseInt(maxRevenue / 10);

    

    const data = {
        labels: graphLabels,
        datasets: [
            {
                label: "Sales ($)",
                fill: true,
                backgroundColor: "transparent",
                borderColor: theme.primary,
                data: graphData
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

// export default connect(store => ({
//     theme: store.theme.currentTheme
// }))(FinanceGraph);
export default FinanceGraph;
