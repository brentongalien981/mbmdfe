import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Container } from 'reactstrap';
import * as actions from '../../redux/actions/dispatches';
import { DispatchForm } from './DispatchForm';
import * as eventFuncs from './helpers/EventFuncsB';
import * as helperFuncs from './helpers/HelperFuncsB';



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

            </Container>
        );
    }
}



/** REACT-FUNCS */
const mapStateToProps = (state) => {
    return {
        dispatchStatuses: state.dispatches.dispatchStatuses,
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        readDispatch: (data) => dispatch(actions.readDispatch(data)),
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dispatch));