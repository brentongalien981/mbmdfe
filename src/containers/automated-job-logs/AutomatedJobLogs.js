import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { MinusCircle, PlusCircle } from 'react-feather';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Spinner } from 'reactstrap';
import Bs from '../../bs/core/Bs';
import * as action from '../../redux/actions/automatedJobLogs';


class AutomatedJobLogs extends React.Component {

    /** CONSTS */


    /** PROPERTIES */
    state = {
        isReadingLogs: false
    };

    tableColumns = [
        { dataField: "id", text: "ID", sort: true },
        { dataField: "scheduled_task_id", text: "Job ID", sort: false },
        { dataField: "execution_period", text: "Exec Period", sort: false },
        { dataField: "status_code", text: "Status", sort: false },
        { dataField: "is_successful", text: "OK", sort: false },
        { dataField: "created_at", text: "Created At", sort: true },
        { dataField: "updated_at", text: "Updated At", sort: true }
    ];



    /** HELPER FUNCS */
    readLogs = () => {

        this.setState({ isReadingLogs: true });

        const urlParams = this.props.location.search;
        const acceptedParams = ['jobId'];
        const parsedUrlParams = Bs.getParsedQueryParams(urlParams, acceptedParams);

        const data = {
            params: { jobId: parsedUrlParams['jobId'] },
            doCallBackFunc: () => {
                this.setState({ isReadingLogs: false });
            }
        };

        this.props.readLogs(data);
    };



    /** MAIN FUNCS */
    componentDidMount() {
        this.readLogs();
    }



    render() {

        const minusIcon = (<MinusCircle width={16} height={16} />);
        const plusIcon = (<PlusCircle width={16} height={16} />);


        const rowDetails = {
            renderer: (row) => {
                const logs = row.entire_process_logs.split('\\n');
                const jobLogsComponent = logs.map((log, i) => (
                    <li key={i}>{log}</li>
                ));

                return (
                    <div>
                        <h4>Job Logs</h4>
                        <h5>{row.status_readable_name}</h5>
                        <ul>{jobLogsComponent}</ul>
                    </div>
                )
            },
            showExpandColumn: true,
            expandHeaderColumnRenderer: ({ isAnyExpands }) => isAnyExpands ? (minusIcon) : (plusIcon),
            expandColumnRenderer: ({ expanded }) => expanded ? (minusIcon) : (plusIcon)
        };


        let mainContent = (
            <BootstrapTable
                bootstrap4
                bordered={false}
                keyField="id"
                data={this.props.logs}
                columns={this.tableColumns}
                expandRow={rowDetails}
            />
        );

        
        if (this.state.isReadingLogs) {
            mainContent = (<Spinner />)
        }


        return (
            <Container fluid className="p-0">
                <h1 className="h3 mb-3">AutomatedJobs</h1>

                {mainContent}
            </Container>
        );
    }


    /** EVENT FUNCS */
}



/** REACT-FUNCS */
const mapStateToProps = (state) => {
    return {
        logs: state.automatedJobLogs.logs
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        readLogs: (data) => dispatch(action.readLogs(data)),
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AutomatedJobLogs));