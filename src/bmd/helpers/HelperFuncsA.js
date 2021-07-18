import { MILLISEC_IN_SEC, MILLI_SEC_IN_DAY, MILLI_SEC_IN_HR } from "../constants/consts";

export const getInitialDate = (numOfDaysToSubtract = 0) => {

    return new Date(Date.now() - (numOfDaysToSubtract * MILLI_SEC_IN_DAY));
};



const tryGetMonthNumWithPaddedZero = (monthNum) => {
    if (monthNum <= 9) {
        return '0' + monthNum;
    }
    return monthNum;
};



const tryGetDateWithPaddedZero = (dateNum) => {
    if (dateNum <= 9) {
        return '0' + dateNum;
    }
    return dateNum;
};



export const convertDateToStr = (dateObj) => {
    return dateObj.getFullYear() + '-' + tryGetMonthNumWithPaddedZero(parseInt(dateObj.getMonth()) + 1) + '-' + tryGetDateWithPaddedZero(dateObj.getDate());
};



export const isDateFrameWithinPeriod = (data) => {

    const periodStartDateTimestamp = Date.parse(data.periodStartDate + ' 00:00:00');
    let periodEndDateTimestamp = Date.parse(data.periodStartDate + ' 00:00:00') + (data.periodNumDays * MILLI_SEC_IN_DAY) - 1000;
    periodEndDateTimestamp = getUnixTimestampForPossibleDST(periodEndDateTimestamp);

    const dateFrameStartDateTimestamp = Date.parse(data.dateFrameStartDate + ' 00:00:00');
    const dateFrameEndDateTimestamp = Date.parse(data.dateFrameEndDate + ' 23:59:59');

    if ((dateFrameStartDateTimestamp >= periodStartDateTimestamp) && (dateFrameStartDateTimestamp <= periodEndDateTimestamp)
        && (dateFrameEndDateTimestamp >= periodStartDateTimestamp) && (dateFrameEndDateTimestamp <= periodEndDateTimestamp)) {
        return true;
    }

    return false;
};



export const isDateWithinPeriod = (data) => {

    const periodStartDateTimestamp = Date.parse(data.periodStartDate);
    const adjustedPeriodStartDateTimestamp = getAdjustedUnixTimestampForPossibleDST(periodStartDateTimestamp, 'startOfDay');

    const periodEndDateTimestamp = periodStartDateTimestamp + (data.periodNumDays * MILLI_SEC_IN_DAY) - MILLISEC_IN_SEC;
    const adjustedPeriodEndDateTimestamp = getAdjustedUnixTimestampForPossibleDST(periodEndDateTimestamp, 'endOfDay');

    const dateTimestamp = Date.parse(data.date);
    const adjustedDateTimestamp = getAdjustedUnixTimestampForPossibleDST(dateTimestamp, 'startOfDay');

    if ((adjustedDateTimestamp >= adjustedPeriodStartDateTimestamp) && (adjustedDateTimestamp <= adjustedPeriodEndDateTimestamp)) {
        return true;
    }

    return false;
};



export const isDateTimestampWithPeriodTimestamp = (data) => {

    if ((data.timestamp >= data.periodStartTimestamp) && (data.timestamp <= data.periodEndTimestamp)) {
        return true;
    }

    return false;
};



export const getUnixTimestampForPossibleDST = (unixTimestamp) => {
    const theDateTime = new Date(unixTimestamp);
    const theOneHrBackDateTime = new Date(unixTimestamp - MILLI_SEC_IN_HR);

    if (theDateTime.getDate() != theOneHrBackDateTime.getDate()) {
        // Meaning the date has been affected by DST.
        // So return a unix-timestamp that is 1hr + 1s back.
        return unixTimestamp - MILLI_SEC_IN_HR - 1000;
    }

    return unixTimestamp;
};



export const getAdjustedUnixTimestampForPossibleDST = (unixTimestamp, startOrEndOfDay) => {

    const theDateTime = new Date(unixTimestamp);
    let theRefDateTime = new Date(unixTimestamp - MILLISEC_IN_SEC);
    let returnedTimestamp = unixTimestamp;

    if (startOrEndOfDay == 'startOfDay') { // (00:00:00)

        if (theDateTime.getDate() == theRefDateTime.getDate()) {
            // Which means it's DST (the time is forwarded).
            // So instead of 00:00:00, it's 01:00:00. Therefore, return a timstamp that's 1hr less.
            returnedTimestamp = unixTimestamp - MILLI_SEC_IN_HR;
        }
    }
    else { // endOfDay (23:59:59)

        theRefDateTime = new Date(unixTimestamp + MILLISEC_IN_SEC);

        if (theDateTime.getDate() == theRefDateTime.getDate()) {
            // Meaning it's EST (the time is backwarded).
            // So instead of 23:59:59, it's 22:59:59. Therefore, return a timestamp that's 1hr forward.
            returnedTimestamp = unixTimestamp + MILLI_SEC_IN_HR;
        }
    }

    return returnedTimestamp;
};



export const getDateLabelForGraph = (data) => {

    switch (data.period) {
        case 'daily': return getDateLabelForGraphWithPeriodDaily(data);
        case 'weekly': return getDateLabelForGraphWithPeriodWeekly(data);
        case 'monthly': return getDateLabelForGraphWithPeriodMonthly(data);
        case 'yearly': return getDateLabelForGraphWithPeriodYearly(data);
        // BMD-TODO
    }
};



const getDateLabelForGraphWithPeriodDaily = (data) => {

    const previousPeriodEndDateTime = new Date(data.previousPeriodEndTimestamp);
    const currentPeriodStartDateTime = new Date(data.currentPeriodStartTimestamp);

    let periodStartTimestampForLabel = data.currentPeriodStartTimestamp;

    // If say it gives Mar28 == Mar28, then add 2hr to timestamp to make it Mar29
    if (previousPeriodEndDateTime.getDate() == currentPeriodStartDateTime.getDate()) {
        periodStartTimestampForLabel = data.currentPeriodStartTimestamp + (2 * MILLI_SEC_IN_HR)
    }

    const labelStartDate = new Date(periodStartTimestampForLabel);

    return getReadableMonthForDate(labelStartDate) + '' + tryGetDateWithPaddedZero(labelStartDate.getDate());

};



const getDateLabelForGraphWithPeriodWeekly = (data) => {

    const previousPeriodEndDateTime = new Date(data.previousPeriodEndTimestamp);
    const currentPeriodStartDateTime = new Date(data.currentPeriodStartTimestamp);

    let periodStartTimestampForLabel = data.currentPeriodStartTimestamp;

    // If say it gives Mar28 == Mar28, then add 2hr to timestamp to make it Mar29
    if (previousPeriodEndDateTime.getDate() == currentPeriodStartDateTime.getDate()) {
        periodStartTimestampForLabel = data.currentPeriodStartTimestamp + (MILLI_SEC_IN_DAY);
    }

    const labelStartDate = new Date(periodStartTimestampForLabel);
    const labelEndDate = new Date(data.currentPeriodEndTimestamp);

    const labelStart = getReadableMonthForDate(labelStartDate) + '' + tryGetDateWithPaddedZero(labelStartDate.getDate());
    const labelEnd = getReadableMonthForDate(labelEndDate) + '' + tryGetDateWithPaddedZero(labelEndDate.getDate());

    return labelStart + '-' + labelEnd;
};



const getDateLabelForGraphWithPeriodMonthly = (data) => {

    const previousPeriodEndDateTime = new Date(data.previousPeriodEndTimestamp);
    const currentPeriodStartDateTime = new Date(data.currentPeriodStartTimestamp);

    let periodStartTimestampForLabel = data.currentPeriodStartTimestamp;

    if ((previousPeriodEndDateTime.getMonth() == currentPeriodStartDateTime.getMonth())
        && (previousPeriodEndDateTime.getDate() == currentPeriodStartDateTime.getDate())) {

        periodStartTimestampForLabel = data.currentPeriodStartTimestamp + (MILLI_SEC_IN_DAY);
    }

    const labelStartDate = new Date(periodStartTimestampForLabel);
    const labelEndDate = new Date(data.currentPeriodEndTimestamp);

    const labelStart = getReadableMonthForDate(labelStartDate) + '' + tryGetDateWithPaddedZero(labelStartDate.getDate());
    const labelEnd = getReadableMonthForDate(labelEndDate) + '' + tryGetDateWithPaddedZero(labelEndDate.getDate());

    return labelStart + '-' + labelEnd;
};



const getDateLabelForGraphWithPeriodYearly = (data) => {

    const previousPeriodEndDateTime = new Date(data.previousPeriodEndTimestamp);
    const currentPeriodStartDateTime = new Date(data.currentPeriodStartTimestamp);

    let periodStartTimestampForLabel = data.currentPeriodStartTimestamp;

    if (previousPeriodEndDateTime.getFullYear() == currentPeriodStartDateTime.getFullYear()) {
        periodStartTimestampForLabel = data.currentPeriodStartTimestamp + (31 * MILLI_SEC_IN_DAY);
    }

    const labelStartDate = new Date(periodStartTimestampForLabel);

    return labelStartDate.getFullYear();
};



export const getReadableMonthForDate = (date) => {
    switch (date.getMonth()) {
        case 0: return 'Jan';
        case 1: return 'Feb';
        case 2: return 'Mar';
        case 3: return 'Apr';
        case 4: return 'May';
        case 5: return 'Jun';
        case 6: return 'Jul';
        case 7: return 'Aug';
        case 8: return 'Sep';
        case 9: return 'Oct';
        case 10: return 'Nov';
        case 11: return 'Dec';
    }

    return 'Month';
};



export const getReadableDate = (dateStr) => {

    const date = new Date(dateStr + ' 05:00:00');

    if (!date) { return ''; }

    let month = '';

    switch (date.getMonth()) {
        case 0: month = 'Jan'; break;
        case 1: month = 'Feb'; break;
        case 2: month = 'Mar'; break;
        case 3: month = 'Apr'; break;
        case 4: month = 'May'; break;
        case 5: month = 'Jun'; break;
        case 6: month = 'Jul'; break;
        case 7: month = 'Aug'; break;
        case 8: month = 'Sep'; break;
        case 9: month = 'Oct'; break;
        case 10: month = 'Nov'; break;
        case 11: month = 'Dec'; break;
    }

    return month + ' ' + date.getDate() + ', ' + date.getFullYear();

};



export const roundUpToBaseFiveOrTen = (val) => {

    let returnVal = 0;

    if ((val > 0) && (val <= 5)) { returnVal = 5; }
    else if ((val > 5) && (val <= 10)) { returnVal = 10; }
    else if ((val > 10) && (val <= 50)) { returnVal = 50; }
    else if ((val > 50) && (val <= 100)) { returnVal = 100; }
    else if ((val > 100) && (val <= 500)) { returnVal = 500; }
    else if ((val > 500) && (val <= 1000)) { returnVal = 1000; }
    else if ((val > 1000) && (val <= 5000)) { returnVal = 5000; }
    else if ((val > 5000) && (val <= 10000)) { returnVal = 10000; }
    else if ((val > 10000) && (val <= 50000)) { returnVal = 50000; }
    else if ((val > 50000) && (val <= 100000)) { returnVal = 100000; }
    else if ((val > 100000) && (val <= 500000)) { returnVal = 500000; }
    else if ((val > 500000) && (val <= 1000000)) { returnVal = 1000000; }
    else if ((val > 1000000) && (val <= 5000000)) { returnVal = 5000000; }
    else if ((val > 5000000) && (val <= 10000000)) { returnVal = 10000000; }
    else if ((val > 10000000) && (val <= 50000000)) { returnVal = 50000000; }
    else if ((val > 50000000) && (val <= 100000000)) { returnVal = 100000000; }
    else if ((val > 100000000) && (val <= 500000000)) { returnVal = 500000000; }
    else if ((val > 500000000) && (val <= 1000000000)) { returnVal = 1000000000; }

    return returnVal;
};



export const addCommasToAmount = (amount) => {

    let r = amount.toFixed(2);
    let rTokenized = r.split('.');
    let rWholeValue = rTokenized[0];
    let rDecimal = rTokenized[1] ?? '00';

    const wholeValueLength = rWholeValue.length;
    let wholeValueWithComma = '';

    let numOfLoops = 0;

    for (let i = wholeValueLength; i > 0; i--) {
        const digit = rWholeValue[i - 1];

        if ((numOfLoops != 0) && (numOfLoops % 3 == 0)) {
            wholeValueWithComma = digit + ',' + wholeValueWithComma;
        }
        else {
            wholeValueWithComma = digit + wholeValueWithComma;
        }

        ++numOfLoops;
    }


    return wholeValueWithComma + '.' + rDecimal;
};