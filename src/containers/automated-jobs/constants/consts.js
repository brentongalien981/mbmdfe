export const RESULT_CODE_COMMAND_UNAVAILABLE = -1;
export const RESULT_CODE_COMMAND_DOES_NOT_EXIST = -2;

export const RESULT_CODE_COMMAND_EXECUTED = 1;



export const AUTOMATED_JOBS_EXTRA_DATA = [
    { jobSignature: 'BmdPurchases:Prepare', doesJobNeedDatePeriodInputs: true },
    { jobSignature: 'GenerateOPIs:Execute', doesJobNeedDatePeriodInputs: true }
];



/** GenerateOPIsJobParamsModal */
export const TREND_PERIOD_OPTION_DAILY = { value: 1, name: 'daily'};
export const TREND_PERIOD_OPTION_WEEKLY = { value: 2, name: 'weekly'};
export const TREND_PERIOD_OPTION_MONTHLY = { value: 3, name: 'monthly'};
export const TREND_PERIOD_OPTION_YEARLY = { value: 4, name: 'yearly'};

export const TREND_CHANGE_OPTION_INCREASING = { value: 1, name: 'increasing'};
export const TREND_CHANGE_OPTION_DECREASING = { value: 2, name: 'decreasing'};
export const TREND_CHANGE_OPTION_AVERAGE = { value: 3, name: 'average'};
export const TREND_CHANGE_OPTION_INCREAS_AND_DECREASE = { value: 4, name: 'increase & decrease'};


export const TREND_PERIOD_OPTIONS = [
    TREND_PERIOD_OPTION_DAILY,
    TREND_PERIOD_OPTION_WEEKLY,
    TREND_PERIOD_OPTION_MONTHLY,
    TREND_PERIOD_OPTION_YEARLY
];

export const TREND_CHANGE_OPTIONS = [
    TREND_CHANGE_OPTION_INCREASING,
    TREND_CHANGE_OPTION_DECREASING,
    TREND_CHANGE_OPTION_AVERAGE,
    TREND_CHANGE_OPTION_INCREAS_AND_DECREASE
];
