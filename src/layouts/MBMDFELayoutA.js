import React from "react";

import Wrapper from "../components/Wrapper";
import Main from "../components/Main";
import Navbar from "../components/Navbar";
import Content from "../components/Content";

const MBMDFELayoutA = ({ children }) => (
  <React.Fragment>
    <Wrapper>
      <Main>
        <Navbar />
        <Content>{children}</Content>
      </Main>
    </Wrapper>
  </React.Fragment>
);

export default MBMDFELayoutA;
