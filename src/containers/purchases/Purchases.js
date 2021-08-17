import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { PurchaseFilters } from './PurchaseFilters';



class ContainerTemplate extends React.Component {

    /** PROPERTIES */



    /** MAIN FUNCS */
    render() {
        return (
            <Container fluid className="p-0">
                <Row noGutters>
                    <Col lg={3} className="pr-1">
                        <PurchaseFilters
                        />
                    </Col>


                    <Col lg={9} className="pl-2">

                        <h3>Purchases</h3>

                        {/* <div className="position-relative orders-table-contianer p-2">
                            <div className="chat-messages p-4 bmd-table-section">
                                {this.getOrdersTable()}
                            </div>
                        </div> */}

                        {/* <PageNavigator
                            pageNum={this.state.readQueryParams.pageNum}
                            numOfPages={this.props.paginationData.numOfPages}
                            onPageNumChange={(e) => eventFuncs.onPageNumChange(this, e)}
                            onPageNavBtnClick={(prevOrNext) => eventFuncs.onPageNavBtnClick(this, prevOrNext)}
                            onPageNumEnter={(e) => eventFuncs.onPageNumEnter(this, e)}
                        /> */}

                    </Col>

                </Row>
            </Container>
        );
    }

}



/** REACT-FUNCS */



export default ContainerTemplate;