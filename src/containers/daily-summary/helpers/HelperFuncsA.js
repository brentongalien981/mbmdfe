import { MILLI_SEC_IN_DAY } from "../constants/consts";

/**
 * 
 * @returns Yesterday's Date obj.
 */
export const getInitialDate = (numDaysToAddOrSubtract = 1) => {

    const numOfSecToAddOrSubtract = numDaysToAddOrSubtract * MILLI_SEC_IN_DAY;
    return new Date(Date.now() + numOfSecToAddOrSubtract);
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
    return dateObj.getFullYear() + '-' + tryGetMonthNumWithPaddedZero(parseInt(dateObj.getMonth()) + 1) + '-' + tryGetDateWithPaddedZero(dateObj.getDate());
};




export const readDailySummaryData = (container, isInitRead = false) => {

    if (container.state.isReadingDailySummaryData) { return; }


    // For initially reading finance-graph-data.
    let extraStateParams = {};
    let extraRequestParams = {};
    let callBackState = { isReadingDailySummaryData: false };

    if (isInitRead) {
        extraStateParams = { isReadingFinanceGraphData: true };
        extraRequestParams = {
            shouldIncludeFinanceGraphData: true,
            graphStartDate: convertDateToStr(container.state.graphDatePickerStartDate),
            graphEndDate: convertDateToStr(container.state.graphDatePickerEndDate),
        };
        callBackState = {
            ...callBackState,
            isReadingFinanceGraphData: false
        };
    }


    container.setState({
        isReadingDailySummaryData: true,
        ...extraStateParams
    });


    const data = {
        params: {
            statsStartDate: convertDateToStr(container.state.statsDatePickerStartDate),
            statsEndDate: convertDateToStr(container.state.statsDatePickerEndDate),
            ...extraRequestParams
        },
        doCallBackFunc: () => {
            container.setState({ ...callBackState });
        }
    };

    container.props.readDailySummaryData(data);
};



export const readFinanceGraphData = (container) => {
    if (container.state.isReadingFinanceGraphData) { return; }

    container.setState({ isReadingFinanceGraphData: true });

    const data = {
        params: {
            graphStartDate: convertDateToStr(container.state.graphDatePickerStartDate),
            graphEndDate: convertDateToStr(container.state.graphDatePickerEndDate)
        },
        doCallBackFunc: () => { container.setState({ isReadingFinanceGraphData: false }); }
    };

    container.props.readFinanceGraphData(data);
};