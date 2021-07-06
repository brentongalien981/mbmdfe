import { MILLI_SEC_IN_DAY } from "../constants/consts";

export const getInitialDate = (numOfDaysToSubtract = 0) => {

    return new Date(Date.now() - (numOfDaysToSubtract * MILLI_SEC_IN_DAY));
};