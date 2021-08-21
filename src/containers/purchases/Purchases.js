import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { PurchaseFilters } from './PurchaseFilters';
import * as helperFuncs from './helpers/HelperFuncsA';
import { connect } from 'react-redux';
import './Purchases.css';
import * as actions from '../../redux/actions/purchases';
import { PurchasesTable } from './PurchasesTable';
import { PageNavigator } from '../orders/PageNavigator';
import BsJLS from '../../bs/core/BsJLS';
import * as eventFuncs from './helpers/EventFuncsA';



class Purchases extends React.Component {

    /** PROPERTIES */
    state = {
        isReadingPurchases: false,
        purchaseFilters: helperFuncs.getInitialPurchaseFilters(),
        pageNum: BsJLS.get('purchases.filters').pageNum ?? 1,
        shouldRefreshPurchases: false
    };



    /** MAIN FUNCS */
    componentDidUpdate() {
        if (this.state.shouldRefreshPurchases) {
            helperFuncs.readPurchases(this);
        }
    }



    componentDidMount() {
        helperFuncs.readPurchases(this);
        this.props.readPurchaseStatuses();
    }



    render() {
        return (
            <Container fluid className="p-0">
                <Row noGutters>
                    <Col lg={3} className="pr-1">
                        <PurchaseFilters
                            filters={this.state.purchaseFilters}
                            purchaseStatuses={this.props.purchaseStatuses}
                            onPurchaseFilterInputChange={(e) => eventFuncs.onPurchaseFilterInputChange(this, e)}
                            onPurchaseFiltersApply={() => eventFuncs.onPurchaseFiltersApply(this)}
                            onPurchaseFiltersReset={() => eventFuncs.onPurchaseFiltersReset(this)}
                        />
                    </Col>


                    <Col lg={9} className="pl-2">

                        <h3>Purchases</h3>

                        <PurchasesTable 
                            purchases={this.props.purchases}
                            isReadingPurchases={this.state.isReadingPurchases}
                        />

                        <PageNavigator
                            pageNum={this.state.pageNum}
                            numOfPages={this.props.paginationData.numOfPages}
                            onPageNumChange={(e) => eventFuncs.onPageNumChange(this, e)}
                            onPageNavBtnClick={(prevOrNext) => eventFuncs.onPageNavBtnClick(this, prevOrNext)}
                            onPageNumEnter={(e) => eventFuncs.onPageNumEnter(this, e)}
                        />

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
        paginationData: state.purchases.paginationData,
        purchaseStatuses: state.purchases.purchaseStatuses
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        readPurchases: (data) => dispatch(actions.readPurchases(data)),
        readPurchaseStatuses: () => dispatch(actions.readPurchaseStatuses())
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(Purchases);