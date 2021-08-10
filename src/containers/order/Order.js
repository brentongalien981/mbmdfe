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
import OrderItemFormModal from './OrderItemFormModal';



class Order extends React.Component {

    /** PROPERTIES */
    state = {
        isReadingOrder: false,
        isUpdatingOrder: false,
        isSavingOrderItem: false,
        isEditingOrderItem: false,
        order: {},
        orderItems: [],
        orderItemToEdit: {}
    };



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
                    isUpdatingOrder={this.state.isUpdatingOrder}
                    onOrderUpdate={() => eventFuncs.onOrderUpdate(this)}
                />

                <OrderItemsTable
                    orderItems={helperFuncs.addActionsPropToOrderItems(this)}
                    isReadingOrder={this.state.isReadingOrder}
                />


                <OrderItemFormModal
                    isOpen={this.state.isEditingOrderItem}
                    onToggle={() => eventFuncs.onOrderItemFormModalToggle(this)}
                    orderItem={this.state.orderItemToEdit}
                    orderItemStatuses={this.props.orderItemStatuses}
                    onOrderItemInputChange={(e) => eventFuncs.onOrderItemInputChange(this, e)}
                    isSavingOrderItem={this.state.isSavingOrderItem}
                    onOrderItemSave={() => eventFuncs.onOrderItemSave(this)}
                />
            </Container>
        );
    }

}



/** REACT-FUNCS */
const mapStateToProps = (state) => {
    return {
        order: state.order.order,
        orderStatuses: state.order.orderStatuses,
        orderItemStatuses: state.order.orderItemStatuses
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        readOrder: (data) => dispatch(actions.readOrder(data)),
        updateOrder: (data) => dispatch(actions.updateOrder(data)),
        saveOrderItem: (data) => dispatch(actions.saveOrderItem(data))
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Order));