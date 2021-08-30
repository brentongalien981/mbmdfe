import Bs from "../../../bs/core/Bs";
import { showToastr } from "../../../helpers/notifications/NotificationsHelper";
import { convertDateToStr, getInitialDate, readDailySummaryData } from "./HelperFuncsA";

export const onStatsDatePickerClose = (container) => {
    container.setState({ isStatsDatePickerOpen: false });
};

export const onGraphFiltersModalClose = (container) => {
    container.setState({ isGraphFiltersModalOpen: false });
};



export const onStatsDatePickerShow = (container) => {
    container.setState({ isStatsDatePickerOpen: true });
};

export const onGraphFilterModalShow = (container) => {
    container.setState({ isGraphFiltersModalOpen: true });
};



export const onStatsDatePickerApply = (container) => {

    if (container.state.isReadingDailySummaryData) {
        showToastr({ notificationType: 'info', message: 'Please wait. Previous read is still going.' });
        return;
    }


    const startDateInStr = convertDateToStr(container.state.statsDatePickerStartDate);
    const endDateInStr = convertDateToStr(container.state.statsDatePickerEndDate);
    if (startDateInStr > endDateInStr) {
        showToastr({ notificationType: 'info', message: 'Start-date can not be greater than end-date.' });
        return;
    }

    container.setState({
        // isReadingDailySummaryData: true,
        isStatsDatePickerOpen: false,
        statsHeaderBtnStartDate: container.state.statsDatePickerStartDate,
        statsHeaderBtnEndDate: container.state.statsDatePickerEndDate
    });


    readDailySummaryData(container);
};



export const onGraphFiltersModalApply = (container) => {

    if (container.state.isReadingFinanceGraphData) {
        showToastr({ notificationType: 'info', message: 'Please wait. Previous read is still going.' });
        return;
    }


    const graphStartDate = convertDateToStr(container.state.graphDatePickerStartDate);
    const graphEndDate = convertDateToStr(container.state.graphDatePickerEndDate);

    if (graphStartDate > graphEndDate) {
        showToastr({ notificationType: 'info', message: 'Start-date can not be greater than end-date.' });
        return;
    }


    container.setState({
        isReadingFinanceGraphData: true,
        isGraphFiltersModalOpen: false
    });


    const data = {
        params: {
            graphStartDate: graphStartDate,
            graphEndDate: graphEndDate
        },
        localParams: {
            graphFilterSelectedPeriod: container.state.graphFilterSelectedPeriod,
        },
        doCallBackFunc: () => { container.setState({ isReadingFinanceGraphData: false }); }
    };

    container.props.readFinanceGraphData(data);
};



export const onStatsDatePickerToggle = (container) => {
    container.setState({ isStatsDatePickerOpen: !container.state.isStatsDatePickerOpen });
};

export const onGraphFiltersModalToggle = (container) => {
    container.setState({ isGraphFiltersModalOpen: !container.state.isGraphFiltersModalOpen });
};



export const onStatsDateChange = (container, dateType, moment) => {

    const selectedDateObj = moment._d;

    if (dateType == 'startDate') {

        container.setState({
            statsDatePickerStartDate: selectedDateObj
        });

    } else {

        container.setState({
            statsDatePickerEndDate: selectedDateObj
        });

    }

};



export const onGraphFilterDateChange = (container, dateType, moment) => {

    const selectedDateObj = moment._d;

    if (dateType == 'startDate') {

        container.setState({
            graphDatePickerStartDate: selectedDateObj
        });

    } else {

        container.setState({
            graphDatePickerEndDate: selectedDateObj
        });

    }

};



export const onStatsReset = (container) => {

    if (container.state.isReadingDailySummaryData) {
        showToastr({ notificationType: 'info', message: 'Please wait. Previous read is still going.' });
        return;
    }


    const initialDate = getInitialDate(0);

    container.setState({
        isReadingDailySummaryData: true,
        statsDatePickerStartDate: initialDate,
        statsDatePickerEndDate: initialDate,
        statsHeaderBtnStartDate: initialDate,
        statsHeaderBtnEndDate: initialDate
    });


    const data = {
        params: {
            statsStartDate: convertDateToStr(initialDate),
            statsEndDate: convertDateToStr(initialDate)
        },
        doCallBackFunc: () => { container.setState({ isReadingDailySummaryData: false }); }
    };

    container.props.readDailySummaryData(data);
};



export const onGraphFilterReset = (container) => {

    if (container.state.isReadingFinanceGraphData) {
        showToastr({ notificationType: 'info', message: 'Please wait. Previous read is still going.' });
        return;
    }


    const graphStartDate = getInitialDate(-31);
    const graphEndDate = getInitialDate(0);
    const period = 'daily';

    if (graphStartDate > graphEndDate) {
        showToastr({ notificationType: 'info', message: 'Start-date can not be greater than end-date.' });
        return;
    }


    container.setState({
        isReadingFinanceGraphData: true,
        graphFilterSelectedPeriod: period,
        graphDatePickerStartDate: graphStartDate,
        graphDatePickerEndDate: graphEndDate
    });


    const data = {
        params: {
            graphStartDate: convertDateToStr(graphStartDate),
            graphEndDate: convertDateToStr(graphEndDate)
        },
        localParams: {
            graphFilterSelectedPeriod: period
        },
        doCallBackFunc: () => { container.setState({ isReadingFinanceGraphData: false }); }
    };

    container.props.readFinanceGraphData(data);
};



export const onGraphFiltersModalSelectedPeriodChange = (e, container) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    container.setState({ [name]: value });
};