import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/user';



class CreateUser extends React.Component {

    /** CONSTS */

    /** PROPERTIES */



    /** HELPER FUNCS */



    /** MAIN FUNCS */
    render() {
        return (
            <div>
                <h1>Create User</h1>
                <h6>theShit: {this.props.theShit}</h6>
            </div>
        );
    }


    /** EVENT FUNCS */
}



/* REACT-FUNCS */
const mapStateToProps = (state) => {
    return {
        theShit: state.user.theShit,
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        doShit: () => dispatch(actions.doShit())
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);