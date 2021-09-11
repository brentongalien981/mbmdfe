import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Container } from 'reactstrap';
import * as actions from '../../redux/actions/dispatches';
import { DispatchForm } from './DispatchForm';



class CreateDispatch extends React.Component {

    state = {
        dispatch: {}
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
                // isSavingPurchase={this.state.isSavingPurchase}
                // onPurchaseInputChange={(e) => eventFuncs.onPurchaseInputChange(this, e)}
                // onPurchaseSave={() => eventFuncs.onPurchaseSave(this)}
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
        resetCreateDispatchFlags: () => dispatch(actions.resetCreateDispatchFlags())
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateDispatch));