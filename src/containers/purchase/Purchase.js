import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container } from 'reactstrap';
import * as actions from '../../redux/actions/purchase';
import * as helperFuncs from './helpers/HelperFuncsA';
import { PurchaseForm } from './PurchaseForm';
import { PurchaseItemsTable } from './PurchaseItemsTable';



class Purchase extends React.Component {

    /** PROPERTIES */
    state = {
        purchase: {},
        purchaseItems: [],
        isReadingPurchase: false
    };



    /** MAIN FUNCS */
    componentDidMount() {
        helperFuncs.readPurchase(this);        
    }



    render() {
        return (
            <Container fluid className="p-0">

                <PurchaseForm
                    purchase={this.state.purchase}
                    purchaseStatuses={this.props.purchaseStatuses}
                    isReadingPurchase={this.state.isReadingPurchase}
                    // onOrderInputChange={(e) => eventFuncs.onOrderInputChange(this, e)}                    
                    // isUpdatingOrder={this.state.isUpdatingOrder}
                    // onOrderUpdate={() => eventFuncs.onOrderUpdate(this)}
                    // isRefreshingOrder={this.state.isRefreshingOrder}
                    // onOrderRefresh={() => eventFuncs.onOrderRefresh(this)}
                />

                <PurchaseItemsTable
                    purchaseItems={this.state.purchaseItems}
                    isReadingPurchase={this.state.isReadingPurchase}
                    // onOrderItemCreate={() => eventFuncs.onOrderItemCreate(this)}
                />


                {/* <OrderItemFormModal
                    isOpen={this.state.isEditingOrderItem}
                    onToggle={() => eventFuncs.onOrderItemFormModalToggle(this)}
                    orderItemFormAction={this.state.orderItemFormAction}
                    orderItem={this.state.orderItemToEdit}
                    orderItemStatuses={this.props.orderItemStatuses}
                    onOrderItemInputChange={(e) => eventFuncs.onOrderItemInputChange(this, e)}
                    isSavingOrderItem={this.state.isSavingOrderItem}
                    onOrderItemSave={() => eventFuncs.onOrderItemSave(this)}
                /> */}

            </Container>
        );
    }
}



/** REACT-FUNCS */
const mapStateToProps = (state) => {
    return {
        purchaseStatuses: state.purchase.purchaseStatuses,
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        readPurchase: (data) => dispatch(actions.readPurchase(data)),
        
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Purchase));