import { MILLI_SEC_IN_DAY } from "../constants/consts";

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
    return dateObj.getFullYear() + '-' + tryGetMonthNumWithPaddedZero(parseInt(dateObj.getMonth())+1) + '-' + tryGetDateWithPaddedZero(dateObj.getDate());
};