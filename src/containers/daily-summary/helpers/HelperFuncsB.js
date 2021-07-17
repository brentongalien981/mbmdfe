import { MILLI_SEC_IN_DAY } from "../../../bmd/constants/consts";
import { convertDateToStr, isDateFrameWithinPeriod, isDateWithinPeriod, roundUpToBaseFiveOrTen } from "../../../bmd/helpers/HelperFuncsA";



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
    const periodNumDays = getPeriodNumDays(rawData.graphFilterSelectedPeriod);
    const numOfPeriods = calculateNumOfPeriods(dateSpanStartDate, dateSpanEndDate, periodNumDays);
    const allFinanceDataByPeriod = (financeStatType == 'revenue' ? rawData.revenuesByPeriod : rawData.expensesByPeriod);


    let indexOfCurrentlyExtractedFinanceStat = 0;
    let iOfCurrentFinanceRecord = 0;

    let haveAllFinancesBeenAccounted = false;
    let currentPeriodNum = 0;

    const dateSpanStartInMilliSec = Date.parse(dateSpanStartDate + ' 00:00:01');

    // Loop entire date-span.
    for (let i = 0; i < numOfPeriods; i++) {

        const periodStartInMilliSec = dateSpanStartInMilliSec + (i * periodNumDays * MILLI_SEC_IN_DAY);
        const periodStartDate = convertDateToStr(new Date(periodStartInMilliSec));
        graphLabels.push(periodStartDate);


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


        financeGraphData.push(periodTotalFinancialVal);

        if (periodTotalFinancialVal > financeStatMaxVal) { financeStatMaxVal = periodTotalFinancialVal; }
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