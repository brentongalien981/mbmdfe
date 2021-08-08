import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container } from 'reactstrap';
import { getInitialDate, parseDateToStr } from '../../bmd/helpers/HelperFuncsA';
import * as actions from '../../redux/actions/order';
import { readOrderStatuses } from '../../redux/actions/orders';
import * as eventFuncs from './helpers/EventFuncs';
import { OrderForm } from './OrderForm';



class CreateOrder extends React.Component {

    /** PROPERTIES */
    state = {
        order: {
            earliest_delivery_date: parseDateToStr(getInitialDate(), 'yyyy-mm-dd'),
            latest_delivery_date: parseDateToStr(getInitialDate(), 'yyyy-mm-dd'),
        },
        isSavingOrder: false
    };



    /** MAIN FUNCS */
    componentDidUpdate() {
        if (this.props.hasOrderBeenSaved) {
            // redirect
            this.props.history.push('/orders/' + this.props.newlySavedOrderId);
        }
    }



    componentDidMount() {
        this.props.resetOrderReducerFlags();
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
                    isSavingOrder={this.state.isSavingOrder}
                    onOrderSave={() => eventFuncs.onOrderSave(this)}
                />
            </Container>
        );
    }

}



/** REACT-FUNCS */
const mapStateToProps = (state) => {
    return {
        orderStatuses: state.orders.orderStatuses,
        newlySavedOrderId: state.order.newlySavedOrderId,
        hasOrderBeenSaved: state.order.hasOrderBeenSaved
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        readOrderStatuses: () => dispatch(readOrderStatuses()),
        saveOrder: (data) => dispatch(actions.saveOrder(data)),
        resetOrderReducerFlags: (data) => dispatch(actions.resetOrderReducerFlags(data)),
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateOrder));