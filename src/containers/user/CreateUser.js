import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/user';



class CreateUser extends React.Component {

    /** CONSTS */

    /** PROPERTIES */



    /** HELPER FUNCS */



    /** MAIN FUNCS */
    componentDidMount() {
        this.props.getUserRoles();
    }



    render() {
        return (
            <div>
                {/* BMD-DELETE */}
                <h1>Create User</h1>
                <h6>theShit: {this.props.theShit}</h6>
                <h5>testCount: {this.props.testCount}</h5>
                <button onClick={this.props.testIncrement}>increment</button><br />
                <h5>testDispatch value: {this.props.testDispatchVal}</h5>
                <button onClick={this.props.testDispatch}>testDispatch</button>
            </div>
        );
    }


    /** EVENT FUNCS */
}



/* REACT-FUNCS */
const mapStateToProps = (state) => {
    return {
        // BMD-DELETE
        theShit: state.user.theShit,
        testCount: state.user.testCount,
        testDispatchVal: state.user.testDispatchVal,
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        getUserRoles: () => dispatch(actions.getUserRoles()),

        // BMD-DELETE
        testDispatch: () => dispatch(actions.testDispatch()),
        testIncrement: () => dispatch(actions.testIncrement()),
        doShit: () => dispatch(actions.doShit())
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);