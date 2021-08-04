import React from 'react';
import { withRouter } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import Bs from '../../bs/core/Bs';
import { OrderForm } from './OrderForm';
import { OrderItemsTable } from './OrderItemsTable';



class Order extends React.Component {

    /** PROPERTIES */



    /** HELPER FUNCS */



    /** MAIN FUNCS */
    componentDidMount() {
        Bs.log('this.props ==> ...');
        Bs.log(this.props);
        Bs.log('this.props.match.params ==> ...');
        Bs.log(this.props.match.params);
    }



    render() {
        return (
            <Container fluid className="p-0">
                <OrderForm />

                <br /><br /><br />

                <OrderItemsTable />
            </Container>
        );
    }


    /** EVENT FUNCS */
}



/** REACT-FUNCS */



export default withRouter(Order);