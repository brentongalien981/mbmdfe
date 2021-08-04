import React from 'react';
import { BookOpen, Edit, Edit2, Monitor, Repeat, Trash } from 'react-feather';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Container, Modal, ModalBody, ModalFooter, ModalHeader, Table, UncontrolledTooltip } from 'reactstrap';
import Spinner from 'reactstrap/lib/Spinner';
import { getInitialDate } from '../../bmd/helpers/HelperFuncsA';
import Bs from '../../bs/core/Bs';
import { showToastr } from '../../helpers/notifications/NotificationsHelper';
import * as actions from '../../redux/actions/automatedJobs';
import './AutomatedJobs.css';
import * as consts from './constants/consts';
import DispatchDateModal from './DispatchDateModal';
import GenerateOPIsJobParamsModal from './GenerateOPIsJobParamsModal';
import * as eventFuncs from './helpers/EventFuncsA';
import { doesJobNeedDatePeriodInputs } from './helpers/HelperFuncsA';



class AutomatedJobs extends React.Component {

    /** CONSTS */

    /** PROPERTIES */
    state = {
        isReadingAutomatedJobs: false,
        isDispatchDateModalOpen: false,
        isGeneratingOPIs: false,
        isGenerateOPIsJobParamsModalOpen: false,
        isResettingJobStatus: false,
        selectedJobId: 0,
        dispatchDateFrom: '',
        dispatchDateTo: '',

        generateOPIsJobParamsModalStartDate: getInitialDate(),
        generateOPIsJobParamsModalEndDate: getInitialDate(),
        // BMD-ON-ITER: On DEV-ITER-002: Move this to helperFuncs FILE.
        generateOPIsJobModalTrendInputValues: {
            maxBaseNumOfDailyOrders: 10,
            trendChangePercentage: 0.01,
            selectedTrendChangeOptionValue: consts.TREND_CHANGE_OPTION_INCREASING.value,
            selectedTrendPeriodOptionValue: consts.TREND_PERIOD_OPTION_DAILY.value,

            trendPeriodGroup: [
                {...consts.TREND_PERIOD_OPTION_DAILY, checked: true},
                {...consts.TREND_PERIOD_OPTION_WEEKLY, checked: false},
                {...consts.TREND_PERIOD_OPTION_MONTHLY, checked: false},
                {...consts.TREND_PERIOD_OPTION_YEARLY, checked: false},
            ],
            trendChangeGroup: [
                {...consts.TREND_CHANGE_OPTION_INCREASING, checked: true},
                {...consts.TREND_CHANGE_OPTION_DECREASING, checked: false},
                {...consts.TREND_CHANGE_OPTION_AVERAGE, checked: false},
                {...consts.TREND_CHANGE_OPTION_INCREAS_AND_DECREASE, checked: false},
            ]
        }
        
    };



    /** HELPER FUNCS */
    readAutomatedJobs = () => {
        this.setState({ isReadingAutomatedJobs: true });

        const data = {
            doCallBackFunc: () => { this.setState({ isReadingAutomatedJobs: false }); }
        };
        this.props.readAutomatedJobs(data);
    };



    /** Init the dates of the DispatchDateModel. */
    initDates() {
        const d = new Date();

        let month = d.getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }

        const dStr = d.getFullYear() + '-' + (month) + '-' + d.getDate();

        this.setState({
            dispatchDateFrom: dStr,
            dispatchDateTo: dStr
        });
    }



    /** MAIN FUNCS */
    componentDidMount() {
        this.readAutomatedJobs();
        this.initDates();
    }



    render() {

        const automatedJobsComponent = this.props.automatedJobs.map((aj, i) => {

            let ajLastLogStatus = 'n/a';
            let ajLastLogDate = 'n/a';

            if (aj.last_log) {
                ajLastLogStatus = aj.last_log.is_successful ? 'OK' : 'FAIL';
                ajLastLogDate = aj.last_log.created_at;
            }


            const prepareDispatchBtnId = 'prepareDispatchBtn' + i;
            const resetJobStatusBtnId = 'resetJobStatusBtn' + i;
            const viewJobLogsBtnId = 'viewJobLogsBtn' + i;
            const jobLogsLink = '/automated-job-logs?jobId=' + aj.id;


            let onDispatchIconClick = () => this.onJobDirectDispatch(aj.id);
            if (doesJobNeedDatePeriodInputs(aj)) {
                onDispatchIconClick = () => this.onPrepareDispatch(aj);
            }


            return (
                <tr key={i}>
                    <td>{aj.command_signature}</td>
                    <td>{aj.status.readable_name}</td>
                    <td>{ajLastLogStatus}</td>
                    <td className="d-none d-md-table-cell">{ajLastLogDate}</td>
                    <td className="table-action">
                        <Monitor id={prepareDispatchBtnId} className="align-middle mr-1 bmd-hoverd-icons" size={18} onClick={onDispatchIconClick} />
                        <UncontrolledTooltip placement='top' target={prepareDispatchBtnId}>Prepare Dispatch</UncontrolledTooltip>

                        <Link to={jobLogsLink} target='blank'>
                            <BookOpen id={viewJobLogsBtnId} className="align-middle mr-1 bmd-hoverd-icons" size={18} />
                            <UncontrolledTooltip placement='top' target={viewJobLogsBtnId}>View Logs</UncontrolledTooltip>
                        </Link>

                        <Repeat id={resetJobStatusBtnId} className="align-middle mr-1 bmd-hoverd-icons" size={18} onClick={() => this.onResetJobStatus(aj.id)} />
                        <UncontrolledTooltip placement='top' target={resetJobStatusBtnId}>Reset Job Status</UncontrolledTooltip>
                    </td>
                </tr>
            );
        });


        let automatedJobsTable = (
            <Table>
                <thead>
                    <tr>
                        <th style={{ width: "30%" }}>Job Name</th>
                        <th style={{}}>Current Status</th>
                        <th style={{}}>Last Status</th>
                        <th className="d-none d-md-table-cell" style={{ width: "20%" }}>Last Dispatch</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {automatedJobsComponent}
                </tbody>
            </Table>
        );

        if (this.state.isReadingAutomatedJobs) {
            automatedJobsTable = (<Spinner />);
        }


        return (
            <Container fluid className="p-0">
                <h1 className="h3 mb-3">AutomatedJobs</h1>

                {automatedJobsTable}

                <DispatchDateModal
                    isOpen={this.state.isDispatchDateModalOpen}
                    onToggle={(modalName) => eventFuncs.onModalToggle(this, modalName)}
                    onClose={this.onDispatchDateModalClose}
                    dispatchDateFrom={this.state.dispatchDateFrom}
                    dispatchDateTo={this.state.dispatchDateTo}
                    onDateChange={this.onDateChange}
                    onDispatch={this.onDispatch}
                />


                
                <GenerateOPIsJobParamsModal
                    isOpen={this.state.isGenerateOPIsJobParamsModalOpen}
                    startDate={this.state.generateOPIsJobParamsModalStartDate}
                    endDate={this.state.generateOPIsJobParamsModalEndDate}
                    onToggle={(modalName) => eventFuncs.onModalToggle(this, modalName)}
                    onClose={this.onDispatchDateModalClose}
                    onDateChange={(calendarName, moment) => { eventFuncs.onBmdCalendarDateChange(this, calendarName, moment) }}
                    trendInputValues={this.state.generateOPIsJobModalTrendInputValues}
                    onTrendInputChange={(e) => eventFuncs.onTrendInputChange(this, e)}
                    isGeneratingOPIs={this.state.isGeneratingOPIs}
                    onDispatch={() => eventFuncs.onGenerateOPIsDispatch(this)}
                />

            </Container>
        );
    }


    /** EVENT FUNCS */
    onJobDirectDispatch = (jobId) => {

        const data = {
            params: {
                jobId: jobId
            }
        };

        this.props.executeJob(data);
    };



    onDispatch = () => {

        this.setState({ isDispatchDateModalOpen: false });


        const data = {
            params: {
                jobId: this.state.selectedJobId,
                dateFrom: this.state.dispatchDateFrom,
                dateTo: this.state.dispatchDateTo
            }
        };

        this.props.executeJob(data);
    };



    onDateChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({ [name]: value });

    };



    onResetJobStatus = (jobId) => {

        if (this.state.isResettingJobStatus) { showToastr({ message: 'Please wait.' }); return; }

        this.setState({ isResettingJobStatus: true });

        const data = {
            params: { jobId: jobId },
            doCallBackFunc: () => { this.setState({ isResettingJobStatus: false }); }
        };

        this.props.resetJobStatus(data);
    };



    onPrepareDispatch = (job) => {

        let otherStateVals = { isDispatchDateModalOpen: true };

        if (job.command_signature == 'GenerateOPIs:Execute') {
            otherStateVals = { isGenerateOPIsJobParamsModalOpen: true };
        }


        this.setState({
            selectedJobId: job.id,
            ...otherStateVals
        });
    };



    onDispatchDateModalClose = (modalName) => {

        if (modalName == 'GenerateOPIsJobParamsModal') {
            this.setState({ isGenerateOPIsJobParamsModalOpen: false });
        } else {
            this.setState({ isDispatchDateModalOpen: false });
        }

    };
}



/** REACT-FUNCS */
const mapStateToProps = (state) => {
    return {
        automatedJobs: state.automatedJobs.automatedJobs
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        resetJobStatus: (data) => dispatch(actions.resetJobStatus(data)),
        executeJob: (data) => dispatch(actions.executeJob(data)),
        readAutomatedJobs: (data) => dispatch(actions.readAutomatedJobs(data)),
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(AutomatedJobs);