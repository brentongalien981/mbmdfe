import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import Bs from '../../bs/core/Bs';
import * as actions from '../../redux/actions/order';
import * as eventFuncs from './helpers/EventFuncs';
import * as helperFuncs from './helpers/HelperFuncsA';
import { OrderForm } from './OrderForm';
import { OrderItemsTable } from './OrderItemsTable';
import './Order.css';



class Order extends React.Component {

    /** PROPERTIES */
    state = {
        isReadingOrder: false,
        order: {},
        orderItems: []
    };



    /** HELPER FUNCS */



    /** MAIN FUNCS */
    componentDidMount() {
        helperFuncs.readOrder(this);
    }



    render() {
        return (
            <Container fluid className="p-0">
                <OrderForm
                    order={this.state.order}
                    orderStatuses={this.props.orderStatuses}
                    onOrderInputChange={(e) => eventFuncs.onOrderInputChange(this, e)}
                    isReadingOrder={this.state.isReadingOrder}
                />

                <br /><br /><br />

                <OrderItemsTable
                    orderItems={this.state.orderItems}
                    isReadingOrder={this.state.isReadingOrder}
                />
            </Container>
        );
    }


    /** EVENT FUNCS */
}



/** REACT-FUNCS */
const mapStateToProps = (state) => {
    return {
        order: state.order.order,
        orderStatuses: state.order.orderStatuses
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        readOrder: (data) => dispatch(actions.readOrder(data))
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Order));