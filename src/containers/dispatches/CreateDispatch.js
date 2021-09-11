import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actions from '../../redux/actions/dispatches';



class CreateDispatch extends React.Component {

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
            <h2>Create Dispatch</h2>
        );
    }
}



/** REACT-FUNCS */
const mapStateToProps = (state) => {
    return {
        // hasPurchaseBeenSaved: state.purchase.hasPurchaseBeenSaved    
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        resetCreateDispatchFlags: () => dispatch(actions.resetCreateDispatchFlags())    
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateDispatch));