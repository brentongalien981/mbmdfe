import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import BmdAuth from '../../bs/core/BmdAuth';
import Bs from '../../bs/core/Bs';
import * as actions from '../../redux/actions/user';
import SignUp from './SignUp';



class CreateUser extends React.Component {

    /** CONSTS */

    /** PROPERTIES */
    state = {
        email: '',
        password: '',
        roles: [],

        isCreatingUser: false
    };



    /** HELPER FUNCS */
    initRoles = (roles) => {
        let stateRoles = [];

        for (const r of roles) {
            stateRoles.push({
                id: r.id,
                name: r.name,
                isSelected: false
            });
        }

        this.setState({ roles: stateRoles });
    };



    /** MAIN FUNCS */
    componentDidMount() {

        if (!BmdAuth.isLoggedIn()) { this.props.history.replace('/signin'); }

        const data = {
            doCallBackFunc: this.initRoles
        };
        this.props.getUserRoles(data);
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
                                isCreatingUser={this.state.isCreatingUser}
                                onCredentialChanged={this.onCredentialChanged}
                                onCreateUser={this.onCreateUser} />
                        </div>
                    </Col>
                </Row>
            </Container>


        );
    }


    /** EVENT FUNCS */
    onCreateUser = (e) => {
        e.preventDefault();

        if (this.state.isCreatingUser) { return; }
        this.setState({ isCreatingUser: true });


        let selectedRoleIds = [];

        for (const r of this.state.roles) {
            if (r.isSelected) {
                selectedRoleIds.push(r.id);
            }
        }


        const data = {
            params: {
                email: this.state.email,
                password: this.state.password,
                selectedRoleIds: selectedRoleIds
            },
            doCallBackFunc: () => {
                this.setState({ isCreatingUser: false });
            }
        };

        this.props.createUser(data);
    };



    onCredentialChanged = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;


        if (target.type === 'checkbox') {

            const trigerredRoleId = target.value;
            let updatedRoles = [];

            for (const role of this.state.roles) {

                let updatedRole = { ...role };

                if (parseInt(updatedRole.id) === parseInt(trigerredRoleId)) {
                    updatedRole.isSelected = value;
                }

                updatedRoles.push(updatedRole);
            }


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
        userRoles: state.user.userRoles
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        getUserRoles: (data) => dispatch(actions.getUserRoles(data)),
        createUser: (data) => dispatch(actions.createUser(data))
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateUser));