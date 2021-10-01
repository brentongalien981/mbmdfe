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
import { ProbableShippingRatesForm } from './ProbableShippingRatesForm';
import { ActualShippingInfo } from './ActualShippingInfo';



class Order extends React.Component {

    /** PROPERTIES */
    state = {
        isReadingOrder: false,
        isUpdatingOrder: false,
        isRefreshingOrder: false,
        isSavingOrderItem: false,
        isEditingOrderItem: false,
        isAssociatingToPurchases: false,
        isCheckingPossibleShipping: false,
        isBuyingShippingLabel: false,
        isAddingToDispatch: false,
        order: {},
        orderItems: [],
        orderItemToEdit: {},
        orderItemFormAction: 'create',
        selectedShippingRateId: '',
        selectedDispatchId: 0
    };



    /** MAIN FUNCS */
    componentDidMount() {
        helperFuncs.readOrder(this);
    }



    componentDidUpdate() {
        if (this.props.shouldRedisplayOrder) { helperFuncs.redisplayOrder(this); }
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
                    isCheckingPossibleShipping={this.state.isCheckingPossibleShipping}                    
                    onOrderUpdate={() => eventFuncs.onOrderUpdate(this)}
                    isRefreshingOrder={this.state.isRefreshingOrder}
                    onOrderRefresh={() => eventFuncs.onOrderRefresh(this)}
                    onCheckPossibleShipping={() => eventFuncs.onCheckPossibleShipping(this)}
                />

                <ProbableShippingRatesForm
                    probableShippingRates={this.props.probableShippingRates}
                    orderStatusCode={this.state.order.status_code}
                    isBuyingShippingLabel={this.state.isBuyingShippingLabel}                  
                    onBuyShippingLabel={() => eventFuncs.onBuyShippingLabel(this)}
                    onSelectedShippingRateChange={(e) => eventFuncs.onSelectedShippingRateChange(this, e)}
                />

                <ActualShippingInfo
                    actualEpShipment={this.props.actualEpShipment}
                    availableDispatches={this.props.availableDispatches}
                    selectedDispatchId={this.state.selectedDispatchId}
                    order={this.state.order}
                    isAddingToDispatch={this.state.isAddingToDispatch}
                    onSelectedDispatchIdChange={(e) => eventFuncs.onSelectedDispatchIdChange(this, e)}
                    onAddToDispatch={() => eventFuncs.onAddToDispatch(this)}
                />

                <OrderItemsTable
                    orderItems={helperFuncs.modifyOrderItemsForDisplay(this)}
                    isReadingOrder={this.state.isReadingOrder}
                    onOrderItemCreate={() => eventFuncs.onOrderItemCreate(this)}
                    isAssociatingToPurchases={this.state.isAssociatingToPurchases}
                    onAssociateToPurchases={() => eventFuncs.onAssociateToPurchases(this)}
                />


                <OrderItemFormModal
                    isOpen={this.state.isEditingOrderItem}
                    onToggle={() => eventFuncs.onOrderItemFormModalToggle(this)}
                    orderItemFormAction={this.state.orderItemFormAction}
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
        orderItemStatuses: state.order.orderItemStatuses,
        probableShippingRates: state.order.probableShippingRates,
        probableShippingId: state.order.probableShippingId,
        actualEpShipment: state.order.actualEpShipment,
        shouldRedisplayOrder: state.order.shouldRedisplayOrder,
        availableDispatches: state.order.availableDispatches,        
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        readOrder: (data) => dispatch(actions.readOrder(data)),
        updateOrder: (data) => dispatch(actions.updateOrder(data)),
        saveOrderItem: (data) => dispatch(actions.saveOrderItem(data)),
        associateToPurchases: (data) => dispatch(actions.associateToPurchases(data)),
        refreshOrder: (data) => dispatch(actions.refreshOrder(data)),
        checkPossibleShipping: (data) => dispatch(actions.checkPossibleShipping(data)),
        buyShippingLabel: (data) => dispatch(actions.buyShippingLabel(data)),
        changeSelectedShippingRate: (data) => dispatch(actions.changeSelectedShippingRate(data)),
        finalizeProcessShouldRedisplayOrder: () => dispatch(actions.finalizeProcessShouldRedisplayOrder()),
        addToDispatch: (data) => dispatch(actions.addToDispatch(data))        
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Order));