import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container } from 'reactstrap';
import Bs from '../../bs/core/Bs';
import * as actions from '../../redux/actions/purchase';
import * as eventFuncs from './helpers/EventFuncs';
import * as helperFuncs from './helpers/HelperFuncsA';
import { PurchaseForm } from './PurchaseForm';
import PurchaseItemFormModal from './PurchaseItemFormModal';
import { PurchaseItemsTable } from './PurchaseItemsTable';



class Purchase extends React.Component {

    /** PROPERTIES */
    state = {
        purchase: {},
        purchaseItems: [],
        isReadingPurchase: false,
        isUpdatingPurchase: false,
        isSavingPurchaseItem: false,
        isUpdatingPurchaseItem: false,
        isEditingPurchaseItem: false,
        purchaseItemToEdit: {},
        purchaseItemFormAction: 'create'
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
                    onPurchaseInputChange={(e) => eventFuncs.onPurchaseInputChange(this, e)}
                    isUpdatingPurchase={this.state.isUpdatingPurchase}
                    onPurchaseUpdate={() => eventFuncs.onPurchaseUpdate(this)}
                // isRefreshingOrder={this.state.isRefreshingOrder}
                // onOrderRefresh={() => eventFuncs.onOrderRefresh(this)}
                />

                <PurchaseItemsTable
                    purchaseItems={this.state.purchaseItems}
                    isReadingPurchase={this.state.isReadingPurchase}
                    onPurchaseItemCreate={() => eventFuncs.onPurchaseItemCreate(this)}
                />


                <PurchaseItemFormModal
                    isOpen={this.state.isEditingPurchaseItem}
                    onToggle={() => eventFuncs.onPurchaseItemFormModalToggle(this)}
                    purchaseItemFormAction={this.state.purchaseItemFormAction}
                    purchaseItemToEdit={this.state.purchaseItemToEdit}
                    purchaseItemStatuses={this.props.purchaseItemStatuses}
                    onPurchaseItemInputChange={(e) => eventFuncs.onPurchaseItemInputChange(this, e)}
                    isSavingPurchaseItem={this.state.isSavingPurchaseItem}
                    isUpdatingPurchaseItem={this.state.isUpdatingPurchaseItem}
                    onPurchaseItemSave={() => eventFuncs.onPurchaseItemSave(this)}
                />

            </Container>
        );
    }
}



/** REACT-FUNCS */
const mapStateToProps = (state) => {
    return {
        purchaseStatuses: state.purchase.purchaseStatuses,
        purchaseItemStatuses: state.purchase.purchaseItemStatuses,
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        readPurchase: (data) => dispatch(actions.readPurchase(data)),
        updatePurchase: (data) => dispatch(actions.updatePurchase(data)),
        savePurchaseItem: (data) => dispatch(actions.savePurchaseItem(data)),
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Purchase));