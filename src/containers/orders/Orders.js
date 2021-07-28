import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { connect } from 'react-redux';
import { Container, Row, Col, ListGroupItem, Media } from 'reactstrap';
import Spinner from 'reactstrap/lib/Spinner';

import avatar1 from "../../assets/img/avatars/avatar.jpg";
import * as actions from '../../redux/actions/orders';
import * as consts from './constants/consts';
import * as eventFuncs from './helpers/EventFuncsA';
import * as helperFuncs from './helpers/HelperFuncsA';
import './Orders.css';
import { PageNavigator } from './PageNavigator';



class Orders extends React.Component {

    /** PROPERTIES */
    state = {
        pageNum: 1,
        isReadingOrders: false,
        shouldRefreshOrders: false
    };



    /** HELPER-FUNCS */
    // BMD-DELETE
    getListGroupItems = () => {

        let items = [];
        for (let i = 0; i < 10; i++) {
            items.push(
                <ListGroupItem key={i} action tag="a" href="#" className="border-0">
                    <Media>
                        <img
                            src={avatar1}
                            className="rounded-circle mr-1"
                            alt="Ashley Briggs"
                            width="40"
                            height="40"
                        />
                        <Media body className="ml-3">
                            Ashley Briggs
                            <div className="small">
                                <FontAwesomeIcon icon={faCircle} className="chat-online" />{" "}
                                Online
                            </div>
                        </Media>
                    </Media>
                </ListGroupItem>
            );
        }

        return items;
    };



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
    }



    render() {
        return (
            <Container fluid className="p-0">
                <Row noGutters>
                    <Col lg={3} className="border-right">
                        <h3>Order Filters</h3>

                        <div>
                            {this.getListGroupItems()}
                        </div>

                    </Col>


                    <Col lg={9}>

                        <h3>Orders</h3>

                        <div className="position-relative">
                            <div className="chat-messages p-4 bmd-table-section">
                                {this.getOrdersTable()}
                            </div>
                        </div>

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
        orders: state.orders.orders,
        paginationData: state.orders.paginationData,
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        readOrders: (data) => dispatch(actions.readOrders(data))
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(Orders);