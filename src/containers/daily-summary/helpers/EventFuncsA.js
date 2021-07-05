import Bs from "../../../bs/core/Bs";
import { showToastr } from "../../../helpers/notifications/NotificationsHelper";
import { convertDateToStr, readDailySummaryData } from "./HelperFuncsA";

export const onStatsDatePickerClose = (container) => {
    container.setState({ isStatsDatePickerOpen: false });
};



export const onStatsDatePickerShow = (container) => {
    container.setState({ isStatsDatePickerOpen: true });
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
        isReadingDailySummaryData: true,
        isStatsDatePickerOpen: false,
        statsHeaderBtnStartDate: container.state.statsDatePickerStartDate,
        statsHeaderBtnEndDate: container.state.statsDatePickerEndDate
    });


    readDailySummaryData(container);
};



export const onStatsDatePickerToggle = (container) => {
    container.setState({ isStatsDatePickerOpen: !container.state.isStatsDatePickerOpen });
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