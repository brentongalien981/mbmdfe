import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container } from 'reactstrap';
import { getInitialDate, parseDateToStr } from '../../bmd/helpers/HelperFuncsA';
import * as actions from '../../redux/actions/purchase';
import { readPurchaseStatuses } from '../../redux/actions/purchases';
import * as eventFuncs from './helpers/EventFuncs';
import { PurchaseForm } from './PurchaseForm';



class CreatePurchase extends React.Component {

    /** PROPERTIES */
    state = {
        purchase: {},
        isSavingPurchase: false
    };



    /** MAIN FUNCS */
    componentDidMount() {
        this.props.resetCreatePurchaseFlags();
        this.props.readPurchaseStatuses();
    }



    render() {
        return (
            <Container fluid className="p-0">
                <PurchaseForm
                    crudMethod="create"
                    purchase={this.state.purchase}
                    isSavingPurchase={this.state.isSavingPurchase}
                    purchaseStatuses={this.props.purchaseStatuses}
                    onPurchaseInputChange={(e) => eventFuncs.onPurchaseInputChange(this, e)}                    
                    // onOrderSave={() => eventFuncs.onOrderSave(this)}
                />
            </Container>
        );
    }

}



/** REACT-FUNCS */
const mapStateToProps = (state) => {
    return {
        purchaseStatuses: state.purchases.purchaseStatuses,
        // newlySavedOrderId: state.order.newlySavedOrderId,
        // hasOrderBeenSaved: state.order.hasOrderBeenSaved
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        resetCreatePurchaseFlags: () => dispatch(actions.resetCreatePurchaseFlags()),
        readPurchaseStatuses: () => dispatch(readPurchaseStatuses()),
        // saveOrder: (data) => dispatch(actions.saveOrder(data))        
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreatePurchase));