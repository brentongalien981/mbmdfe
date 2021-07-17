import { MILLI_SEC_IN_DAY, MILLI_SEC_IN_HR } from "../constants/consts";

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

    const periodStartDateTimestamp = Date.parse(data.periodStartDate + ' 00:00:00');
    let periodEndDateTimestamp = Date.parse(data.periodStartDate + ' 00:00:00') + (data.periodNumDays * MILLI_SEC_IN_DAY) - 1000;
    periodEndDateTimestamp = getUnixTimestampForPossibleDST(periodEndDateTimestamp);

    const dateTimestamp = Date.parse(data.date + ' 00:00:00');

    if ((dateTimestamp >= periodStartDateTimestamp) && (dateTimestamp <= periodEndDateTimestamp)) {
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



export const getDateLabelForGraph = (date) => {

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

    return month + date.getDate();
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