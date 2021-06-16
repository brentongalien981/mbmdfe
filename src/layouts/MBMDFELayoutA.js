import React from "react";

import Wrapper from "../components/Wrapper";
import Main from "../components/Main";
import Navbar from "../components/Navbar";
import Content from "../components/Content";
import { connect } from "react-redux";
import { signOut } from '../redux/actions/auth';
import { withRouter } from "react-router-dom";



const MBMDFELayoutA = (props) => {

  const onSignOut = () => {
    props.history.replace('/signin');
    props.signOut();
  };



  return (
    <React.Fragment>
      <Wrapper>
        <Main>
          <Navbar userEmail={props.userEmail} onSignOut={onSignOut} />
          <Content>{props.children}</Content>
        </Main>
      </Wrapper>
    </React.Fragment>
  );
};



/** REACT-FUNCS */
const mapStateToProps = (state) => {
  return {
      userEmail: state.auth.userEmail
  };
};



const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MBMDFELayoutA));
