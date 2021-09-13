import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Container } from 'reactstrap';
import * as actions from '../../redux/actions/dispatches';
import { DispatchForm } from './DispatchForm';
import * as eventFuncs from './helpers/EventFuncsA';



class CreateDispatch extends React.Component {

    state = {
        dispatch: {},
        isSavingDispatch: false
    };



    componentDidMount() {
        this.props.resetCreateDispatchFlags();
    }



    componentDidUpdate() {
        // if (this.props.hasPurchaseBeenSaved) {
        //     this.props.history.push('/purchases/' + this.state.savedPurchaseId);
        // }
    }



    render() {
        return (
            <Container fluid className="p-0">
                <DispatchForm
                    crudMethod="create"
                    dispatch={this.state.dispatch}
                    dispatchStatuses={this.props.dispatchStatuses}
                    isSavingDispatch={this.state.isSavingDispatch}
                    onDispatchSave={() => eventFuncs.onDispatchSave(this)}
                />
            </Container>
        );
    }
}



/** REACT-FUNCS */
const mapStateToProps = (state) => {
    return {
        hasNewDispatchBeenSaved: state.dispatches.hasNewDispatchBeenSaved,
        dispatchStatuses: state.dispatches.dispatchStatuses
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        resetCreateDispatchFlags: () => dispatch(actions.resetCreateDispatchFlags()),
        saveDispatch: (data) => dispatch(actions.saveDispatch(data))
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateDispatch));