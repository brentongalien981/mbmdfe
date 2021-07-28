import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Container, Row, Col, Spinner } from 'reactstrap';
import BmdAuth from '../../bs/core/BmdAuth';
import * as actions from '../../redux/actions/dailySummary';
import FinanceGraph from './FinanceGraph';
import FinanceGraphSectionHeader from './FinanceGraphSectionHeader';
import FinanceStats from './FinanceStats';
import GraphFiltersModal from './GraphFiltersModal';
import * as eventFuncs from './helpers/EventFuncsA';
import * as helperFuncs from './helpers/HelperFuncsA';
import OrderStats from './OrderStats';
import ProfitBarChart from './ProfitBarChart';
import SectionHeader from './SectionHeader';
import StatsDatePickerModal from './StatsDatePickerModal';



class DailySummary extends React.Component {

    /** CONSTS */

    /** PROPERTIES */
    state = {
        isReadingDailySummaryData: false,
        isReadingFinanceGraphData: false,
        isStatsDatePickerOpen: false,
        isGraphFiltersModalOpen: false,
        statsDatePickerStartDate: helperFuncs.getInitialDate(),
        statsDatePickerEndDate: helperFuncs.getInitialDate(),
        statsHeaderBtnStartDate: helperFuncs.getInitialDate(),
        statsHeaderBtnEndDate: helperFuncs.getInitialDate(),
        graphDatePickerStartDate: helperFuncs.getInitialDate(-30),
        graphDatePickerEndDate: helperFuncs.getInitialDate(),
        graphFilterSelectedPeriod: 'daily'
    };



    /** HELPER FUNCS */



    /** MAIN FUNCS */
    componentDidMount() {
        if (!BmdAuth.isLoggedIn()) {
            this.props.history.replace('/signin');
            return;
        }

        const isInitRead = true;
        helperFuncs.readDailySummaryData(this, isInitRead);
    }



    render() {

        const orderStats = (
            <>
                <OrderStats
                    numOfOrders={this.props.numOfOrders}
                    numOfOrderItems={this.props.numOfOrderItems}
                    numOfIncompleteOrders={this.props.numOfIncompleteOrders}
                />

                <FinanceStats
                    revenue={this.props.revenue}
                    expenses={this.props.expenses}
                />
            </>
        );


        const orderStatsSection = this.state.isReadingDailySummaryData ? <Spinner /> : orderStats;


        let financeGraphSection = (
            <Row>
                <Col lg="8" className="d-flex">
                    <FinanceGraph
                        financeGraphData={this.props.financeGraphData}
                        theme={this.props.currentTheme}
                    />
                </Col>
                <Col lg="4" className="d-flex">
                    <ProfitBarChart theme={this.props.currentTheme} financeGraphData={this.props.financeGraphData} />
                </Col>
            </Row>
        );

        if (this.state.isReadingFinanceGraphData) { financeGraphSection = <Spinner />; }


        return (
            <Container fluid className="p-0">
                <SectionHeader
                    startDate={this.state.statsHeaderBtnStartDate}
                    endDate={this.state.statsHeaderBtnEndDate}
                    onStatsDatePickerShow={() => { eventFuncs.onStatsDatePickerShow(this) }}
                    onStatsReset={() => { eventFuncs.onStatsReset(this) }}
                />

                {orderStatsSection}

                <StatsDatePickerModal
                    startDate={this.state.statsDatePickerStartDate}
                    endDate={this.state.statsDatePickerEndDate}
                    isStatsDatePickerOpen={this.state.isStatsDatePickerOpen}
                    onStatsDatePickerToggle={() => { eventFuncs.onStatsDatePickerToggle(this) }}
                    onStatsDateChange={(dateType, moment) => { eventFuncs.onStatsDateChange(this, dateType, moment) }}
                    onStatsDatePickerClose={() => { eventFuncs.onStatsDatePickerClose(this) }}
                    onStatsDatePickerApply={() => { eventFuncs.onStatsDatePickerApply(this) }}
                />

                <br /><br /><br />

                <FinanceGraphSectionHeader
                    financeGraphData={this.props.financeGraphData}
                    onGraphFilterModalShow={() => { eventFuncs.onGraphFilterModalShow(this) }}
                    onGraphFilterReset={() => { eventFuncs.onGraphFilterReset(this) }}
                />

                {financeGraphSection}

                <GraphFiltersModal
                    startDate={this.state.graphDatePickerStartDate}
                    endDate={this.state.graphDatePickerEndDate}
                    isOpen={this.state.isGraphFiltersModalOpen}
                    onToggle={() => { eventFuncs.onGraphFiltersModalToggle(this) }}
                    onClose={() => { eventFuncs.onGraphFiltersModalClose(this) }}
                    onApply={() => { eventFuncs.onGraphFiltersModalApply(this) }}
                    onDateChange={(dateType, moment) => { eventFuncs.onGraphFilterDateChange(this, dateType, moment) }}
                    graphFilterSelectedPeriod={this.state.graphFilterSelectedPeriod}
                    onSelectedPeriodChange={(e) => { eventFuncs.onGraphFiltersModalSelectedPeriodChange(e, this) }}
                />

            </Container>
        );
    }



    /** EVENT FUNCS */
}



/** REACT-FUNCS */
const mapStateToProps = (state) => {
    return {
        numOfOrders: state.dailySummary.numOfOrders,
        numOfOrderItems: state.dailySummary.numOfOrderItems,
        numOfIncompleteOrders: state.dailySummary.numOfIncompleteOrders,
        revenue: state.dailySummary.revenue,
        expenses: state.dailySummary.expenses,
        financeGraphData: state.dailySummary.financeGraphData,
        currentTheme: state.theme.currentTheme
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        readDailySummaryData: (data) => dispatch(actions.readDailySummaryData(data)),
        readFinanceGraphData: (data) => dispatch(actions.readFinanceGraphData(data)),
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DailySummary));