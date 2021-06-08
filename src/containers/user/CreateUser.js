import React from 'react';
import { connect } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import * as actions from '../../redux/actions/user';
import SignUp from './SignUp';



class CreateUser extends React.Component {

    /** CONSTS */

    /** PROPERTIES */
    state = {
        email: '',
        password: '',
        roles: {
            UserManager: false,
            OrderManager: false,
            PurchaseManager: false,
            InventoryManager: false
        }
    };



    /** HELPER FUNCS */



    /** MAIN FUNCS */
    componentDidMount() {
        this.props.getUserRoles();
    }



    render() {
        return (
            <Container className="d-flex flex-column">
                <Row className="h-100">
                    <Col sm="10" md="8" lg="6" className="mx-auto d-table h-100">
                        <div className="d-table-cell align-middle">
                            <SignUp
                                userRoles={this.props.userRoles}
                                email={this.state.email}
                                password={this.state.password}
                                onCredentialChanged={this.onCredentialChanged} />
                        </div>
                    </Col>
                </Row>
            </Container>


        );
    }


    /** EVENT FUNCS */
    onCredentialChanged = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;


        if (target.type === 'checkbox') {

            let updatedRoles = this.state.roles;
            updatedRoles[name] = value;

            this.setState({
                roles: updatedRoles
            });
        } else {

            this.setState({
                [name]: value
            });
        }

    };
}



/* REACT-FUNCS */
const mapStateToProps = (state) => {
    return {

        userRoles: state.user.userRoles,

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