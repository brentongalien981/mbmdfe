import { MILLI_SEC_IN_DAY } from "../../../bmd/constants/consts";
import { convertDateToStr, getDateLabelForGraph, getUnixTimestampForPossibleDST, isDateFrameWithinPeriod, isDateWithinPeriod, roundUpToBaseFiveOrTen } from "../../../bmd/helpers/HelperFuncsA";



export const calculateNumOfPeriods = (dateSpanStartDate, dateSpanEndDate, periodNumDays) => {

    const startDateTimeInMilliSec = Date.parse(dateSpanStartDate + ' 00:00:01');
    const endDateTimeInMilliSec = Date.parse(dateSpanEndDate + ' 23:59:59');
    const numOfDaysBetween = (endDateTimeInMilliSec - startDateTimeInMilliSec) / MILLI_SEC_IN_DAY;
    const numOfPeriods = numOfDaysBetween / periodNumDays;

    return Math.ceil(numOfPeriods);

};



export const extractFinancialValue = (financeRecord, financeStatType) => {

    const subtotal = parseFloat(financeRecord.chargedSubtotal) ? parseFloat(financeRecord.chargedSubtotal) : 0.0;
    const shippingFee = parseFloat(financeRecord.chargedShippingFee) ? parseFloat(financeRecord.chargedShippingFee) : 0.0;
    const tax = parseFloat(financeRecord.chargedTax) ? parseFloat(financeRecord.chargedTax) : 0.0;
    let otherFee = 0.0;

    if (financeStatType == 'expenses') {
        otherFee = parseFloat(financeRecord.chargedOtherFee) ? parseFloat(financeRecord.chargedOtherFee) : 0.0;
    }

    return subtotal + shippingFee + tax + otherFee;
};



export const extractFinanceGraphData = (rawData, financeStatType) => {

    let graphLabels = [];
    let financeGraphData = [];
    let financeStatMaxVal = 0.0;

    const dateSpanStartDate = rawData.dateSpanStartDate;
    const dateSpanEndDate = rawData.dateSpanEndDate;
    const dateSpanStartInMilliSec = Date.parse(dateSpanStartDate + ' 00:00:00');
    const periodNumDays = getPeriodNumDays(rawData.graphFilterSelectedPeriod);
    const numOfPeriods = calculateNumOfPeriods(dateSpanStartDate, dateSpanEndDate, periodNumDays);
    const allFinanceDataByPeriod = (financeStatType == 'revenue' ? rawData.revenuesByPeriod : rawData.expensesByPeriod);

    let iOfCurrentFinanceRecord = 0;

    // Loop entire date-span.
    for (let i = 0; i < numOfPeriods; i++) {

        const periodStartInMilliSec = dateSpanStartInMilliSec + (i * periodNumDays * MILLI_SEC_IN_DAY);

        let periodEndInMilliSec = dateSpanStartInMilliSec + ((i+1) * periodNumDays * MILLI_SEC_IN_DAY) - 1000;
        periodEndInMilliSec = getUnixTimestampForPossibleDST(periodEndInMilliSec);

        const periodStartDate = convertDateToStr(new Date(periodStartInMilliSec));
        // const periodEndDate = convertDateToStr(new Date(periodEndInMilliSec));

        const graphLabel = getDateLabelForGraph(new Date(periodStartInMilliSec)) + '-' + getDateLabelForGraph(new Date(periodEndInMilliSec));
        graphLabels.push(graphLabel);


        let periodTotalFinancialVal = 0.0;

        // Loop each record for that period.
        while (true) {

            const aFinanceRecord = allFinanceDataByPeriod[iOfCurrentFinanceRecord];

            if (!aFinanceRecord) { break; }


            const dateCheckParams = {
                periodStartDate: periodStartDate,
                periodNumDays: periodNumDays,
                date: convertDateToStr(new Date(aFinanceRecord.createdAt)),
            };

            if (isDateWithinPeriod(dateCheckParams)) {
                periodTotalFinancialVal += extractFinancialValue(aFinanceRecord, financeStatType);
                ++iOfCurrentFinanceRecord;
            } else {
                break; // Proceed to next period.
            }
        }


        if (periodTotalFinancialVal > financeStatMaxVal) { financeStatMaxVal = periodTotalFinancialVal; }
        financeGraphData.push(periodTotalFinancialVal.toFixed(2));
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



export const getPeriodNumDays = (graphFilterSelectedPeriod) => {
    switch (graphFilterSelectedPeriod) {
        case 'daily': return 1;
        case 'weekly': return 7;
        case 'monthly': return 30;
        case 'yearly': return 364;
        default: return 1;
    }
};