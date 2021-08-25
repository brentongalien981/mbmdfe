import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container } from 'reactstrap';
import * as actions from '../../redux/actions/purchase';
import { readPurchaseStatuses } from '../../redux/actions/purchases';
import * as eventFuncs from './helpers/EventFuncs';
import { PurchaseForm } from './PurchaseForm';



class CreatePurchase extends React.Component {

    /** PROPERTIES */
    state = {
        purchase: {},
        isSavingPurchase: false,
        savedPurchaseId: 0
    };



    /** MAIN FUNCS */
    componentDidUpdate() {
        if (this.props.hasPurchaseBeenSaved) {
            this.props.history.push('/purchases/' + this.state.savedPurchaseId);
        }
    }



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
                    onPurchaseSave={() => eventFuncs.onPurchaseSave(this)}
                />
            </Container>
        );
    }

}



/** REACT-FUNCS */
const mapStateToProps = (state) => {
    return {
        purchaseStatuses: state.purchases.purchaseStatuses,
        hasPurchaseBeenSaved: state.purchase.hasPurchaseBeenSaved    
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        resetCreatePurchaseFlags: () => dispatch(actions.resetCreatePurchaseFlags()),
        readPurchaseStatuses: () => dispatch(readPurchaseStatuses()),
        savePurchase: (data) => dispatch(actions.savePurchase(data))        
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreatePurchase));