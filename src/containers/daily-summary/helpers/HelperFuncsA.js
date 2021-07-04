import { MILLI_SEC_IN_DAY } from "../constants/consts";

/**
 * 
 * @returns Yesterday's Date obj.
 */
export const getInitialDate = () => {

    return new Date(Date.now() - MILLI_SEC_IN_DAY);
};



export const getMonthNameByIndex = (i) => {
    switch (i) {
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
        default: return 'n/a'
    }
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