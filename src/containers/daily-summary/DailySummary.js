import React from 'react';
import { withRouter } from 'react-router';
import BmdAuth from '../../bs/core/BmdAuth';



class DailySummary extends React.Component {

    /** CONSTS */

    /** PROPERTIES */



    /** HELPER FUNCS */



    /** MAIN FUNCS */
    componentDidMount() {
        if (!BmdAuth.isLoggedIn()) {
            this.props.history.replace('/signin');
        }
    }



    render() {
        return (
            <h2>Here's MBMD's Daily Summary</h2>
        );
    }



    /** EVENT FUNCS */
}



/** REACT-FUNCS */



export default withRouter(DailySummary);