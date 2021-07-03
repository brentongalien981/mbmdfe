export const onStatsDatePickerClose = (container) => {
    container.setState({ isStatsDatePickerOpen: false });
};



export const onStatsDatePickerShow = (container) => {
    container.setState({ isStatsDatePickerOpen: true });
};



export const onStatsDatePickerApply = (container) => {
    container.setState({ isStatsDatePickerOpen: false });
};



export const onStatsDatePickerToggle = (container) => {
    container.setState({ isStatsDatePickerOpen: !container.state.isStatsDatePickerOpen });
};