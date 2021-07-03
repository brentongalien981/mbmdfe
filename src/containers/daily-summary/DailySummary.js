import React from 'react';
import { withRouter } from 'react-router';
import { Container, Row, Col } from 'reactstrap';
import BmdAuth from '../../bs/core/BmdAuth';
import FinanceGraph from './FinanceGraph';
import FinanceGraphSectionHeader from './FinanceGraphSectionHeader';
import OrderStats from './OrderStats';
import SectionHeader from './SectionHeader';



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
            <Container fluid className="p-0">
                <SectionHeader />
                <OrderStats />

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



export default withRouter(DailySummary);