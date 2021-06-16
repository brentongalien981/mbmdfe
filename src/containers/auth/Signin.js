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
import * as actions from '../../redux/actions/auth';



class Signin extends React.Component {

    /** CONSTS */

    /** PROPERTIES */
    state = {
        email: '',
        password: '',
        isSigningIn: false
    };



    /** HELPER FUNCS */



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

        if (this.state.isSigningIn) { return; }
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
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Signin));