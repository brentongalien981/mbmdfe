import { MILLI_SEC_IN_DAY } from "../../../bmd/constants/consts";
import { convertDateToStr, isDateFrameWithinPeriod, roundUpToBaseFiveOrTen } from "../../../bmd/helpers/HelperFuncsA";

export const extractFinanceGraphData = (rawData, financeStatType) => {

    let graphLabels = [];
    let financeGraphData = [];
    let financeStatMaxVal = 0.0;

    const periodNumDays = rawData.periodNumDays;
    const numOfPeriods = rawData.numOfPeriods;
    const allFinanceDataByPeriod = (financeStatType == 'revenue' ? rawData.revenuesByPeriod : rawData.expensesByPeriod);
    const dateSpanStartDate = rawData.dateSpanStartDate + ' 00:00:01'; // To use EST or EDT not UTC.
    const dateSpanEndDate = rawData.dateSpanEndDate;

    let indexOfCurrentlyExtractedFinanceStat = 0;


    for (let i = 0; i < numOfPeriods; i++) {

        const periodStartDate = convertDateToStr(new Date(Date.parse(dateSpanStartDate) + (i * periodNumDays * MILLI_SEC_IN_DAY)));
        graphLabels.push(periodStartDate);


        const financeDataThisPeriod = allFinanceDataByPeriod[indexOfCurrentlyExtractedFinanceStat];

        let hasFoundValidFinanceStatThisPeriod = false;
        let financeStatVal = 0.0;

        if (financeDataThisPeriod) {

            financeStatVal = (financeStatType == 'revenue' ? financeDataThisPeriod.revenue : financeDataThisPeriod.expenses);

            const datesToCheck = {
                periodStartDate: periodStartDate,
                periodNumDays: periodNumDays,
                dateFrameStartDate: financeDataThisPeriod.startDate,
                dateFrameEndDate: financeDataThisPeriod.endDate
            };

            if (isDateFrameWithinPeriod(datesToCheck)) { hasFoundValidFinanceStatThisPeriod = true; }

            if (financeStatVal > financeStatMaxVal) { financeStatMaxVal = financeStatVal; }
        }



        if (hasFoundValidFinanceStatThisPeriod) {
            financeGraphData.push(financeStatVal.toFixed(2));
            ++indexOfCurrentlyExtractedFinanceStat;
        }
        else {
            financeGraphData.push('0.00');
        }

    }



    let yAxisInterval = parseInt(financeStatMaxVal / 10);
    yAxisInterval = roundUpToBaseFiveOrTen(yAxisInterval);


    return {
        labels: graphLabels,
        data: financeGraphData,
        yAxisInterval: yAxisInterval,
        financeStatMaxVal: financeStatMaxVal
    };
};