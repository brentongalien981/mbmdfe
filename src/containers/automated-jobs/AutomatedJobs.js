import React from 'react';
import { Edit, Edit2, Trash } from 'react-feather';
import { Button, Container, Table } from 'reactstrap';
import './AutomatedJobs.css';



class AutomatedJobs extends React.Component {

    /** CONSTS */

    /** PROPERTIES */



    /** HELPER FUNCS */



    /** MAIN FUNCS */
    render() {
        return (
            <Container fluid className="p-0">
                <h1 className="h3 mb-3">AutomatedJobs</h1>

                <Table>
                    <thead>
                        <tr>
                            <th style={{ width: "20%" }}>Job Name</th>
                            <th style={{ }}>Current Status</th>
                            <th style={{ }}>Last Status</th>
                            <th className="d-none d-md-table-cell" style={{ width: "25%" }}>Last Dispatch</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>BmdPurchases:Prepare</td>
                            <td>PROCESSING</td>
                            <td>OK</td>
                            <td className="d-none d-md-table-cell">June 21, 1961 - 03:01:24</td>
                            <td className="table-action">
                                <Edit2 className="align-middle mr-1 bmd-hoverd-icons" size={18} />
                                <Trash className="align-middle bmd-hoverd-icons" size={18} />
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        );
    }


    /** EVENT FUNCS */
}



/** REACT-FUNCS */



export default AutomatedJobs;