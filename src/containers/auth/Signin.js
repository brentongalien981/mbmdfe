import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    Button,
    Card,
    CardBody,
    Form,
    FormGroup,
    Label,
    Input,
    CustomInput,
    Spinner
} from "reactstrap";
import BmdAuth from '../../bs/core/BmdAuth';
import Bs from '../../bs/core/Bs';
import * as actions from '../../redux/actions/auth';



class Signin extends React.Component {

    /** CONSTS */

    /** PROPERTIES */
    state = {
        email: '',
        password: '',
        isSigningIn: false,
        isLoggingInAsDemoUser: false
    };



    /** HELPER FUNCS */
    getLoginAsDemoUserSection() {

        if (Bs.detailedAppEnv === 'production') { return null; }

        let btn = <Button color="primary" size="lg" onClick={this.onLoginAsDemoUser}>Login as Demo User</Button>;

        if (this.state.isLoggingInAsDemoUser) {
            btn = <Spinner color="dark" size="sm" className="mr-2" />;
        }

        return (
            <div className="text-center mt-3">
                <Label>OR</Label><br />
                {btn}
            </div>
        );

    }



    /** MAIN FUNCS */
    componentDidUpdate() {
        if (this.props.shouldDoOnLoginProcessFinalization) {
            this.props.history.replace('/daily-summary');
        }
    }



    componentDidMount() {
        if (BmdAuth.isLoggedIn()) {
            this.props.history.replace("/");
            return;
        }
        this.props.resetFlags();
    }



    render() {

        let signInBtnSection = (
            <div className="text-center mt-3">
                <Button color="primary" size="lg" onClick={this.onSignin}>Sign in</Button>
            </div>
        );

        if (this.state.isSigningIn) {
            signInBtnSection = (
                <div className="text-center mt-3">
                    <Spinner color="dark" size="sm" className="mr-2" />
                </div>

            );
        }

        return (
            <React.Fragment>
                <div className="text-center mt-4">
                    <p className="lead">Sign in to your account to continue</p>
                </div>

                <Card>
                    <CardBody>
                        <div className="m-sm-4">

                            <Form>
                                <FormGroup>
                                    <Label>Email</Label>
                                    <Input
                                        bsSize="lg"
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={this.state.email}
                                        onChange={this.onCredentialChanged}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label>Password</Label>
                                    <Input
                                        bsSize="lg"
                                        type="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        value={this.state.password}
                                        onChange={this.onCredentialChanged}
                                    />
                                </FormGroup>

                                {signInBtnSection}
                                {this.getLoginAsDemoUserSection()}

                            </Form>


                        </div>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }


    /** EVENT FUNCS */
    onSignin = (e) => {
        e.preventDefault();

        if (this.state.isSigningIn || this.state.isLoggingInAsDemoUser) { return; }
        this.setState({ isSigningIn: true });


        const data = {
            params: {
                email: this.state.email,
                password: this.state.password
            },
            doCallBackFunc: () => {
                this.setState({ isSigningIn: false });
            }
        };

        this.props.signIn(data);
    };



    onLoginAsDemoUser = (e) => {
        e.preventDefault();

        if (this.state.isSigningIn || this.state.isLoggingInAsDemoUser) { return; }

        this.setState({ isLoggingInAsDemoUser: true });


        const data = {
            doCallBackFunc: () => {
                this.setState({ isLoggingInAsDemoUser: false });
            }
        };

        this.props.loginAsDemoUser(data);
    };



    onCredentialChanged = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
}



/** REACT-FUNCS */
const mapStateToProps = (state) => {
    return {
        shouldDoOnLoginProcessFinalization: state.auth.shouldDoOnLoginProcessFinalization
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (data) => dispatch(actions.signIn(data)),
        resetFlags: () => dispatch(actions.resetFlags()),
        loginAsDemoUser: (data) => dispatch(actions.loginAsDemoUser(data))        
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Signin));