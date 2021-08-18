import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { PurchaseFilters } from './PurchaseFilters';
import * as helperFuncs from './helpers/HelperFuncsA';
import { connect } from 'react-redux';
import './Purchases.css';
import * as actions from '../../redux/actions/purchases';



class Purchases extends React.Component {

    /** PROPERTIES */
    state = {
        isReadingPurchases: false,
        purchaseFilters: helperFuncs.getInitialPurchaseFilters()
    };



    /** MAIN FUNCS */
    componentDidMount() {
        helperFuncs.readPurchases(this);
    }



    render() {
        return (
            <Container fluid className="p-0">
                <Row noGutters>
                    <Col lg={3} className="pr-1">
                        <PurchaseFilters
                            filters={this.state.purchaseFilters}
                        />
                    </Col>


                    <Col lg={9} className="pl-2">

                        <h3>Purchases</h3>

                        <div className="position-relative purchases-table-section p-2">
                            <div className="chat-messages p-4 purchases-table-container">
                                {helperFuncs.gePurchasesTable(this.props.purchases, this.state.isReadingPurchases)}
                            </div>
                        </div>

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
const mapStateToProps = (state) => {
    return {
        purchases: state.purchases.purchases,
        // paginationData: state.orders.paginationData,
        // orderStatuses: state.orders.orderStatuses
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        readPurchases: (data) => dispatch(actions.readPurchases(data)),
        // readOrderStatuses: () => dispatch(actions.readOrderStatuses())
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(Purchases);