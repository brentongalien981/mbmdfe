import React from 'react';
import { BookOpen, Edit, Edit2, Monitor, Repeat, Trash } from 'react-feather';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Container, Modal, ModalBody, ModalFooter, ModalHeader, Table, UncontrolledTooltip } from 'reactstrap';
import Bs from '../../bs/core/Bs';
import { showToastr } from '../../helpers/notifications/NotificationsHelper';
import * as actions from '../../redux/actions/automatedJobs';
import './AutomatedJobs.css';
import DispatchDateModal from './DispatchDateModal';
import { doesJobNeedDatePeriodInputs } from './helpers/HelperFuncsA';



class AutomatedJobs extends React.Component {

    /** CONSTS */

    /** PROPERTIES */
    state = {
        selectedJobId: 0,
        isDispatchDateModalOpen: false,
        isResettingJobStatus: false,
        dispatchDateFrom: '',
        dispatchDateTo: ''
    };



    /** HELPER FUNCS */
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
        this.props.readAutomatedJobs();
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
                onDispatchIconClick = () => this.onPrepareDispatch(aj.id);
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


        return (
            <Container fluid className="p-0">
                <h1 className="h3 mb-3">AutomatedJobs</h1>

                <Table>
                    <thead>
                        <tr>
                            <th style={{ width: "20%" }}>Job Name</th>
                            <th style={{}}>Current Status</th>
                            <th style={{}}>Last Status</th>
                            <th className="d-none d-md-table-cell" style={{ width: "25%" }}>Last Dispatch</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {automatedJobsComponent}
                    </tbody>
                </Table>

                <DispatchDateModal
                    isOpen={this.state.isDispatchDateModalOpen}
                    onClose={this.onDispatchDateModalClose}
                    dispatchDateFrom={this.state.dispatchDateFrom}
                    dispatchDateTo={this.state.dispatchDateTo}
                    onDateChange={this.onDateChange}
                    onDispatch={this.onDispatch}
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



    onPrepareDispatch = (jobId) => {
        this.setState({
            selectedJobId: jobId,
            isDispatchDateModalOpen: true
        });
    };



    onDispatchDateModalClose = () => {
        this.setState({ isDispatchDateModalOpen: false });
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
        readAutomatedJobs: () => dispatch(actions.readAutomatedJobs())
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(AutomatedJobs);