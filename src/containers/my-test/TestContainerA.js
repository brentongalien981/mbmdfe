import React from "react";
import Container from "reactstrap/lib/Container";
import BsCore2 from "../../bs/core/BsCore2";


class TestContainerA extends React.Component {

    render() {
        return (
            <Container>
                <h1 className="h3 mb-3">TestContainerA</h1>
                <button onClick={this.getHttpInfo}>get-http-info</button>
            </Container>
        )
    }



    getHttpInfo() {
        
        BsCore2.ajaxCrud({
            url: '/mytest/get-http-info2'
        });
    }

}


export default TestContainerA;