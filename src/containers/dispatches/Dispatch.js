import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Container } from 'reactstrap';
import * as actions from '../../redux/actions/dispatches';
import { DispatchInfo } from './DispatchInfo';
import * as helperFuncs from './helpers/HelperFuncsB';



class Dispatch extends React.Component {

    state = {
        isReadingDispatch: false
    };



    componentDidMount() {
        helperFuncs.readDispatch(this);
    }



    render() {
        return (
            <Container fluid className="p-0">

                <DispatchInfo />

            </Container>
        );
    }
}



/** REACT-FUNCS */
const mapStateToProps = (state) => {
    return {
        // purchaseStatuses: state.purchase.purchaseStatuses,
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        readDispatch: (data) => dispatch(actions.readDispatch(data)),
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dispatch));