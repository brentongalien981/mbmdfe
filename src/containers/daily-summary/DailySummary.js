import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Container, Row, Col, Spinner } from 'reactstrap';
import BmdAuth from '../../bs/core/BmdAuth';
import * as actions from '../../redux/actions/dailySummary';
import FinanceGraph from './FinanceGraph';
import FinanceGraphSectionHeader from './FinanceGraphSectionHeader';
import * as eventFuncs from './helpers/EventFuncsA';
import OrderStats from './OrderStats';
import SectionHeader from './SectionHeader';
import StatsDatePickerModal from './StatsDatePickerModal';



class DailySummary extends React.Component {

    /** CONSTS */

    /** PROPERTIES */
    state = {
        isReadingDailySummaryData: false,
        isStatsDatePickerOpen: false
    };



    /** HELPER FUNCS */
    readDailySummaryData = () => {
        if (this.state.isReadingDailySummaryData) { return; }

        this.setState({ isReadingDailySummaryData: true });

        const data = {
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

        const orderStatsSection = this.state.isReadingDailySummaryData ? <Spinner /> : <OrderStats />;

        return (
            <Container fluid className="p-0">
                <SectionHeader onStatsDatePickerShow={() => { eventFuncs.onStatsDatePickerShow(this) }} />

                {orderStatsSection}
                <StatsDatePickerModal
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
        // automatedJobs: state.automatedJobs.automatedJobs
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        readDailySummaryData: (data) => dispatch(actions.readDailySummaryData(data))
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DailySummary));