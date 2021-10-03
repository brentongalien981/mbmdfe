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



class Dispatch extends React.Component {

    state = {
        isReadingDispatch: false,
        isUpdatingDispatch: false,
        dispatch: {}
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

                <DispatchOrdersTable
                    isReadingDispatch={this.state.isReadingDispatch}
                    dispatchOrders={this.props.dispatchOrders}
                    onRemoveOrderFromDispatch={() => eventFuncs.onRemoveOrderFromDispatch(this)}
                />

                <EpBatchInfo
                    isReadingDispatch={this.state.isReadingDispatch}
                    epBatch={this.props.epBatch}
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
        readDispatch: (data) => dispatch(actions.readDispatch(data))
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dispatch));