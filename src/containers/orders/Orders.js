import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { connect } from 'react-redux';
import { Container, Row, Col, ListGroupItem, Media, Pagination, PaginationItem, PaginationLink, Input, Label, Form, FormGroup } from 'reactstrap';

import avatar1 from "../../assets/img/avatars/avatar.jpg";
import * as actions from '../../redux/actions/orders';
import * as consts from './constants/consts';
import * as eventFuncs from './helpers/EventFuncsA';
import * as helperFuncs from './helpers/HelperFuncsA';
import './Orders.css';



class Orders extends React.Component {

    /** PROPERTIES */



    /** HELPER-FUNCS */
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



    getPaginationComponent = () => {

        const pageNumInput = (
            <Form inline>
                <FormGroup>
                    <Input
                        value="1"
                        type="number"
                        min="1"
                        name="pageNum"
                        onChange={eventFuncs.onPageNumChange}
                        className="mb-3"
                    />
                </FormGroup>

                {/* <FormGroup className="mb-2 mr-sm-2 mb-sm-0"> */}
                <FormGroup>
                    <Label>of 34</Label>
                </FormGroup>

            </Form>
        );


        return (
            <div>
                <Pagination aria-label="Page navigation example">
                    <PaginationItem>
                        <PaginationLink previous href="#" />
                    </PaginationItem>

                    {pageNumInput}

                    <PaginationItem>
                        <PaginationLink next href="#" />
                    </PaginationItem>

                </Pagination>
            </div>
        );
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

        return mainContent;
    };



    /** MAIN FUNCS */
    componentDidMount() {
        helperFuncs.readOrders(this)
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

                        {this.getPaginationComponent()}
                    </Col>

                </Row>
            </Container>
        );
    }

}



const ChatMessage = ({ position, avatar, name, children, time }) => (
    <div className={`chat-message-${position} pb-4`}>
        <div>
            <img
                src={avatar}
                className="rounded-circle mr-1"
                alt={name}
                width="40"
                height="40"
            />
            <div className="text-muted small text-nowrap mt-2">{time}</div>
        </div>
        <div
            className={`flex-shrink-1 bg-light rounded py-2 px-3 ${position === "right" ? "mr-3" : "ml-3"
                }`}
        >
            <div className="font-weight-bold mb-1">{name}</div>
            {children}
        </div>
    </div>
);



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