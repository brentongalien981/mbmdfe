import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import Spinner from 'reactstrap/lib/Spinner';
import * as actions from '../../redux/actions/orders';
import * as consts from './constants/consts';
import * as eventFuncs from './helpers/EventFuncsA';
import * as helperFuncs from './helpers/HelperFuncsA';
import { OrderFilters } from './OrderFilters';
import './Orders.css';
import { PageNavigator } from './PageNavigator';



class Orders extends React.Component {

    /** PROPERTIES */
    state = {
        isReadingOrders: false,
        shouldRefreshOrders: false,
        readQueryParams: helperFuncs.getInitialOrderReadQueryParams()
    };



    /** HELPER-FUNCS */
    getOrdersTable = () => {

        let mainContent = (
            <BootstrapTable
                bootstrap4
                bordered={false}
                keyField="id"
                data={this.props.orders}
                columns={consts.ORDER_TABLE_COLUMNS}
                expandRow={helperFuncs.getTableExpandedRowDetails()}
            />
        );

        if (this.state.isReadingOrders) {
            mainContent = (<Spinner />);
        }

        return mainContent;
    };



    /** MAIN FUNCS */
    componentDidUpdate() {
        if (this.state.shouldRefreshOrders) {
            helperFuncs.refreshOrders(this);
        }
    }



    componentDidMount() {
        helperFuncs.readOrders(this);
        this.props.readOrderStatuses();
    }



    render() {
        return (
            <Container fluid className="p-0">
                <Row noGutters>
                    <Col lg={3} className="border-right">
                        <OrderFilters
                            filters={this.state.readQueryParams}
                            orderStatuses={this.props.orderStatuses}
                            onOrderFilterInputChange={(e) => eventFuncs.onOrderFilterInputChange(this, e)}
                        />
                    </Col>


                    <Col lg={9}>

                        <h3>Orders</h3>

                        <div className="position-relative">
                            <div className="chat-messages p-4 bmd-table-section">
                                {this.getOrdersTable()}
                            </div>
                        </div>

                        <PageNavigator
                            pageNum={this.state.readQueryParams.pageNum}
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
        orders: state.orders.orders,
        paginationData: state.orders.paginationData,
        orderStatuses: state.orders.orderStatuses
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        readOrders: (data) => dispatch(actions.readOrders(data)),
        readOrderStatuses: () => dispatch(actions.readOrderStatuses())
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(Orders);