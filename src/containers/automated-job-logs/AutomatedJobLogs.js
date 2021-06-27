import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Bs from '../../bs/core/Bs';
import * as action from '../../redux/actions/automatedJobLogs';


class AutomatedJobLogs extends React.Component {

    /** CONSTS */

    /** PROPERTIES */
    state = {
        isReadingLogs: false
    };



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
        return (
            <h1>AutomatedJobLgos</h1>
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