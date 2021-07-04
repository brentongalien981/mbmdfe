import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Container, Row, Col, Spinner } from 'reactstrap';
import BmdAuth from '../../bs/core/BmdAuth';
import * as actions from '../../redux/actions/dailySummary';
import FinanceGraph from './FinanceGraph';
import FinanceGraphSectionHeader from './FinanceGraphSectionHeader';
import * as eventFuncs from './helpers/EventFuncsA';
import * as helperFuncs from './helpers/HelperFuncsA';
import OrderStats from './OrderStats';
import SectionHeader from './SectionHeader';
import StatsDatePickerModal from './StatsDatePickerModal';



class DailySummary extends React.Component {

    /** CONSTS */

    /** PROPERTIES */
    state = {
        isReadingDailySummaryData: false,
        isStatsDatePickerOpen: false,
        statsDatePickerStartDate: helperFuncs.getInitialDate(),
        statsDatePickerEndDate: helperFuncs.getInitialDate(),
        statsHeaderBtnStartDate: helperFuncs.getInitialDate(),
        statsHeaderBtnEndDate: helperFuncs.getInitialDate(),
    };



    /** HELPER FUNCS */
    readDailySummaryData = () => {
        if (this.state.isReadingDailySummaryData) { return; }

        this.setState({ isReadingDailySummaryData: true });

        const data = {
            params: {
                statsStartDate: helperFuncs.convertDateToStr(this.state.statsDatePickerStartDate),
                statsEndDate: helperFuncs.convertDateToStr(this.state.statsDatePickerEndDate)
            },
            doCallBackFunc: () => { this.setState({ isReadingDailySummaryData: false }); }
        };

        this.props.readDailySummaryData(data);
    };



    /** MAIN FUNCS */
    componentDidMount() {
        if (!BmdAuth.isLoggedIn()) {
            this.props.history.replace('/signin');
            return;
        }

        this.readDailySummaryData();
    }



    render() {

        const orderStats = (
            <OrderStats
                numOfOrders={this.props.numOfOrders}
                numOfOrderItems={this.props.numOfOrderItems}
                numOfIncompleteOrders={this.props.numOfIncompleteOrders}
            />
        );

        const orderStatsSection = this.state.isReadingDailySummaryData ? <Spinner /> : orderStats;

        return (
            <Container fluid className="p-0">
                <SectionHeader
                    startDate={this.state.statsHeaderBtnStartDate}
                    endDate={this.state.statsHeaderBtnEndDate}
                    onStatsDatePickerShow={() => { eventFuncs.onStatsDatePickerShow(this) }}
                />

                {orderStatsSection}

                <StatsDatePickerModal
                    startDate={this.state.statsDatePickerStartDate}
                    endDate={this.state.statsDatePickerEndDate}
                    isStatsDatePickerOpen={this.state.isStatsDatePickerOpen}
                    onStatsDatePickerToggle={() => { eventFuncs.onStatsDatePickerToggle(this) }}
                    onStatsDatePickerClose={() => { eventFuncs.onStatsDatePickerClose(this) }}
                    onStatsDatePickerApply={() => { eventFuncs.onStatsDatePickerApply(this) }}
                />

                <br /><br /><br />

                <FinanceGraphSectionHeader />
                <Row>
                    <Col /*lg="8"*/ className="d-flex">
                        <FinanceGraph />
                    </Col>
                </Row>

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
        numOfIncompleteOrders: state.dailySummary.numOfIncompleteOrders
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        readDailySummaryData: (data) => dispatch(actions.readDailySummaryData(data))
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DailySummary));