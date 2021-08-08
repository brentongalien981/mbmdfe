import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container } from 'reactstrap';
import * as actions from '../../redux/actions/order';
import { readOrderStatuses } from '../../redux/actions/orders';
import * as eventFuncs from './helpers/EventFuncs';
import { OrderForm } from './OrderForm';



class CreateOrder extends React.Component {

    /** PROPERTIES */
    state = {
        order: {},
        isCreatingOrder: false
    };



    /** MAIN FUNCS */
    componentDidMount() {
        this.props.readOrderStatuses();
    }



    render() {
        return (
            <Container fluid className="p-0">
                <OrderForm
                    crudMethod="create"
                    order={this.state.order}
                    orderStatuses={this.props.orderStatuses}
                    onOrderInputChange={(e) => eventFuncs.onOrderInputChange(this, e)}
                    isCreatingOrder={this.state.isCreatingOrder}
                    onOrderSave={() => eventFuncs.onOrderSave(this)}
                />
            </Container>
        );
    }

}



/** REACT-FUNCS */
const mapStateToProps = (state) => {
    return {
        orderStatuses: state.orders.orderStatuses
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        readOrderStatuses: () => dispatch(readOrderStatuses())
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateOrder));

