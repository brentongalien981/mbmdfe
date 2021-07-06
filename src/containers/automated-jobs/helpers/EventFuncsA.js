import Bs from "../../../bs/core/Bs";

export const onModalToggle = (container, modalName) => {

    if (modalName == 'GenerateOPIsJobParamsModal') {
        container.setState({ isGenerateOPIsJobParamsModalOpen: false });
    } else {
        container.setState({ isDispatchDateModalOpen: false });
    }
};



export const onBmdCalendarDateChange = (container, calendarName, moment) => {

    let aStateObjAndProp = {};

    switch (calendarName) {
        case 'GenerateOPIsJobParamsModal-startDate':
            aStateObjAndProp = { generateOPIsJobParamsModalStartDate: moment._d };
            break;
        case 'GenerateOPIsJobParamsModal-endDate':
            aStateObjAndProp = { generateOPIsJobParamsModalEndDate: moment._d };
            break;
    }

    container.setState({ ...aStateObjAndProp });
};



export const onGenerateOPIsDispatch = (container) => {
    Bs.log('yea');
};