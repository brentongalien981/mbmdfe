import React from 'react';
import { Edit, Edit2, Trash } from 'react-feather';
import { connect } from 'react-redux';
import { Button, Container, Table } from 'reactstrap';
import * as actions from '../../redux/actions/automatedJobs';
import './AutomatedJobs.css';



class AutomatedJobs extends React.Component {

    /** CONSTS */

    /** PROPERTIES */



    /** HELPER FUNCS */



    /** MAIN FUNCS */
    componentDidMount() {
        this.props.readAutomatedJobs();
    }



    render() {

        const automatedJobsComponent = this.props.automatedJobs.map((aj, i) => {
            return (
                <tr key={i}>
                    <td>{aj.command_signature}</td>
                    {/* BMD-TODO: Editsssssss */}
                    <td>{aj.status_code}</td> 
                    <td>TODO</td>
                    <td className="d-none d-md-table-cell">{aj.updated_at}</td>
                    <td className="table-action">
                        <Edit2 className="align-middle mr-1 bmd-hoverd-icons" size={18} />
                        <Trash className="align-middle bmd-hoverd-icons" size={18} />
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
            </Container>
        );
    }


    /** EVENT FUNCS */
}



/** REACT-FUNCS */
const mapStateToProps = (state) => {
    return {
        automatedJobs: state.automatedJobs.automatedJobs
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        readAutomatedJobs: () => dispatch(actions.readAutomatedJobs())
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(AutomatedJobs);