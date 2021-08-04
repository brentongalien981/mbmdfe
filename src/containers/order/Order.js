import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import Bs from '../../bs/core/Bs';
import * as actions from '../../redux/actions/order';
import * as helperFuncs from './helpers/HelperFuncsA';
import { OrderForm } from './OrderForm';
import { OrderItemsTable } from './OrderItemsTable';



class Order extends React.Component {

    /** PROPERTIES */
    state = {
        isReadingOrder: false
    };



    /** HELPER FUNCS */



    /** MAIN FUNCS */
    componentDidMount() {
        helperFuncs.readOrder(this);
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
const mapStateToProps = (state) => {
    return {
        order: state.order.order
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        readOrder: (data) => dispatch(actions.readOrder(data))
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Order));