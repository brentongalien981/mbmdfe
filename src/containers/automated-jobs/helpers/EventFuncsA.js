import Bs from "../../../bs/core/Bs";



/** GenerateOPIsJobParamsModal */
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



export const onTrendInputChange = (container, e) => {

    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    let updatedState = container.state;



    switch (name) {
        case 'trendPeriodRadioBtns':

            const oldTrendPeriodGroup = updatedState.generateOPIsJobModalTrendInputValues.trendPeriodGroup;
            let updatedTrendPeriodGroup = [];

            oldTrendPeriodGroup.forEach(o => {
                if (o.value == value) {
                    updatedTrendPeriodGroup.push({ ...o, checked: true });
                } else {
                    updatedTrendPeriodGroup.push({ ...o, checked: false });
                }
            });

            updatedState.generateOPIsJobModalTrendInputValues.selectedTrendPeriodOptionValue = value;
            updatedState.generateOPIsJobModalTrendInputValues.trendPeriodGroup = updatedTrendPeriodGroup;
            break;

        case 'trendChangeRadioBtns':

            const oldTrendChangeGroup = updatedState.generateOPIsJobModalTrendInputValues.trendChangeGroup;
            let updatedTrendChangeGroup = [];

            oldTrendChangeGroup.forEach(tco => {
                if (tco.value == value) {
                    updatedTrendChangeGroup.push({ ...tco, checked: true });
                } else {
                    updatedTrendChangeGroup.push({ ...tco, checked: false });
                }
            });

            updatedState.generateOPIsJobModalTrendInputValues.selectedTrendChangeOptionValue = value;
            updatedState.generateOPIsJobModalTrendInputValues.trendChangeGroup = updatedTrendChangeGroup;
            break;
    }

    container.setState({ ...updatedState });
};