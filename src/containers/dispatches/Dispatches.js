import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Col, Container, Row } from 'reactstrap';
import * as action from '../../redux/actions/dispatches';
import { DispatchesTable } from './DispatchesTable';
import { DispatchFilters } from './DispatchFilters';
import * as helperFuncs from './helpers/HelperFuncsA';
import './Dispatches.css';
import { PageNavigator } from '../../bmd/components/PageNavigator';
import BsJLS from '../../bs/core/BsJLS';



class Dispatches extends React.Component {

    state = {
        dispatchFilters: helperFuncs.getInitialDispatchFilters(),
        isReadingDispatches: false,
        pageNum: BsJLS.get('dispatches.filters')?.pageNum ?? 1,
        // BMD-TODO                
        // shouldRefreshPurchases: false
    };



    componentDidMount() {
        // helperFuncs.readPurchases(this);
        this.props.readDispatchStatuses();
    }



    render() {
        return (
            <Container fluid className="p-0">
                <Row noGutters>
                    <Col lg={3} className="pr-1">

                        <DispatchFilters
                            filters={this.state.dispatchFilters}
                            dispatchStatuses={this.props.dispatchStatuses}
                            // onPurchaseFilterInputChange={(e) => eventFuncs.onPurchaseFilterInputChange(this, e)}
                            // onPurchaseFiltersApply={() => eventFuncs.onPurchaseFiltersApply(this)}
                            // onPurchaseFiltersReset={() => eventFuncs.onPurchaseFiltersReset(this)}
                        />
                    </Col>


                    <Col lg={9} className="pl-2">

                        <h3>Dispatches</h3>

                        <DispatchesTable
                            dispatches={this.props.dispatches}
                            isReadingDispatches={this.state.isReadingDispatches}
                        />

                        <PageNavigator
                            pageNum={this.state.pageNum}
                            numOfPages={this.props.paginationData.numOfPages}
                            onPageNumChange={(e) => true}
                            onPageNavBtnClick={(prevOrNext) => true}
                            onPageNumEnter={(e) => true}
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
        dispatchStatuses: state.dispatches.dispatchStatuses,
        dispatches: state.dispatches.dispatches,
        paginationData: state.dispatches.paginationData,
    };
};



const mapDispatchToProps = (dispatch) => {
    return {        
        readDispatchStatuses: () => dispatch(action.readDispatchStatuses())
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dispatches));
