import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Container } from 'reactstrap';
import * as actions from '../../redux/actions/dispatches';
import { DispatchForm } from './DispatchForm';
import { DispatchOrdersTable } from './DispatchOrdersTable';
import * as eventFuncs from './helpers/EventFuncsB';
import * as helperFuncs from './helpers/HelperFuncsB';
import './Dispatch.css';
import { EpBatchInfo } from './EpBatchInfo';
import { EpBatchShipmentsTable } from './EpBatchShipmentsTable';
import { EpBatchPickupInfo } from './EpBatchPickupInfo';
import { EpBatchPickupInfoFormModal } from './EpBatchPickupInfoFormModal';
import { getInitialDate } from '../../bmd/helpers/HelperFuncsA';



class Dispatch extends React.Component {

    state = {
        isReadingDispatch: false,
        isUpdatingDispatch: false,
        isRemovingOrderFromDispatch: false,
        isSavingEpBatchPickupInfo: false,
        isEpBatchPickupInfoFormModalShown: false,
        dispatch: {},
        orderIdBeingRemovedFromDispatch: 0,
        epBatchPickupInfoFormData: helperFuncs.getEpBatchPickupInfoFormInitialData(),
    };



    componentDidMount() {
        helperFuncs.readDispatch(this);
    }



    render() {
        return (
            <Container fluid className="p-0">


                <DispatchForm
                    crudMethod="update"
                    dispatch={this.state.dispatch}
                    dispatchStatuses={this.props.dispatchStatuses}
                    isUpdatingDispatch={this.state.isUpdatingDispatch}
                    isReadingDispatch={this.state.isReadingDispatch}
                    onDispatchUpdate={() => eventFuncs.onDispatchUpdate(this)}
                />


                <EpBatchPickupInfo
                    pickup={this.props.epBatch?.pickup}
                    isReadingDispatch={this.state.isReadingDispatch}
                    onEpBatchPickupFormShow={() => eventFuncs.onEpBatchPickupFormShow(this)}
                />


                <EpBatchPickupInfoFormModal
                    isSavingEpBatchPickupInfo={this.state.isSavingEpBatchPickupInfo}
                    isEpBatchPickupInfoFormModalShown={this.state.isEpBatchPickupInfoFormModalShown}
                    onToggle={() => eventFuncs.onEpBatchPickupInfoFormModalToggle(this)}
                    onClose={() => eventFuncs.onEpBatchPickupInfoFormModalClose(this)}                    
                    onEpBatchPickupInfoSave={() => eventFuncs.onEpBatchPickupInfoSave(this)}
                    pickup={this.state.epBatchPickupInfoFormData}  
                    onPickupDateChange={() => true}                
                />


                <EpBatchInfo
                    isReadingDispatch={this.state.isReadingDispatch}
                    epBatch={this.props.epBatch}
                />


                <DispatchOrdersTable
                    isReadingDispatch={this.state.isReadingDispatch}
                    dispatchOrders={this.props.dispatchOrders}
                    onRemoveOrderFromDispatch={(event, orderId) => eventFuncs.onRemoveOrderFromDispatch(this, event, orderId)}
                    isRemovingOrderFromDispatch={this.state.isRemovingOrderFromDispatch}
                    orderIdBeingRemovedFromDispatch={this.state.orderIdBeingRemovedFromDispatch}
                />


                <EpBatchShipmentsTable
                    epBatchShipments={this.props.epBatch?.shipments}
                    isReadingDispatch={this.state.isReadingDispatch}
                />


            </Container>
        );
    }
}



/** REACT-FUNCS */
const mapStateToProps = (state) => {
    return {
        dispatchStatuses: state.dispatches.dispatchStatuses,
        dispatchOrders: state.dispatches.dispatchOrders,
        epBatch: state.dispatches.epBatch
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        readDispatch: (data) => dispatch(actions.readDispatch(data)),
        removeOrderFromDispatch: (data) => dispatch(actions.removeOrderFromDispatch(data))
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dispatch));