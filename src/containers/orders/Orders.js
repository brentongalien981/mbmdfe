import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { connect } from 'react-redux';
import { Container, Row, Col, ListGroupItem, Media, Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import avatar1 from "../../assets/img/avatars/avatar.jpg";
import * as actions from '../../redux/actions/orders';
import * as helperFuncs from './helpers/HelperFuncsA';



class Orders extends React.Component {

    /** PROPERTIES */

    // $table->string('city', 64);
    // $table->string('province', 32);
    // $table->string('country', 32);
    // $table->string('postal_code', 16);
    // $table->string('phone', 16);
    // $table->string('email', 128);
    // $table->timestamps();

    // $table->decimal('charged_subtotal', 8, 2)->after('email');
    // $table->decimal('charged_shipping_fee', 8, 2)->after('charged_subtotal');
    // $table->decimal('charged_tax', 8, 2)->after('charged_shipping_fee');

    // $table->timestamp('earliest_delivery_date')->after('charged_tax');
    // $table->timestamp('latest_delivery_date')->after('earliest_delivery_date');

    // $table->unsignedTinyInteger('projected_total_delivery_days')->after('latest_delivery_date');



    orderTableColumns = [
        { dataField: 'id', text: 'ID', sort: true },
        { dataField: 'user_id', text: 'User ID', sort: false },
        { dataField: 'cart_id', text: 'Cart ID', sort: false },
        { dataField: 'stripe_payment_intent_id', text: 'SPI ID', sort: false },
        { dataField: 'status_code', text: 'Status', sort: false },
        { dataField: 'first_name', text: 'First Name', sort: false },
        { dataField: 'last_name', text: 'Last Name', sort: false },
        { dataField: 'street', text: 'Street', sort: false },
    ];



    /** HELPER-FUNCS */
    getChatMessages = () => {
        let items = [];
        for (let i = 0; i < 20; i++) {
            items.push(
                <ChatMessage
                    key={i}
                    position="right"
                    name="You"
                    avatar={avatar1}
                    time="2:33 am"
                >
                    Lorem ipsum dolor sit amet, vis erat denique in, dicunt
                    prodesset te vix.
                </ChatMessage>
            );
        }

        return items;
    };



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
        return (
            <div>
                <Pagination aria-label="Page navigation example">
                    <PaginationItem>
                        <PaginationLink previous href="#" />
                    </PaginationItem>

                    <PaginationItem active>
                        <PaginationLink next href="#">2</PaginationLink>
                    </PaginationItem>

                    <PaginationItem>
                        <PaginationLink next href="#">3</PaginationLink>
                    </PaginationItem>

                    <PaginationItem>
                        <PaginationLink next href="#" />
                    </PaginationItem>

                </Pagination>
            </div>
        );
    };



    getOrdersTable = () => {

        // let data = [];

        // for (let i = 0; i < 20; i++) {
        //     data.push({ prop1: `val-${i}a`, prop2: `val-${i}b`, prop3: `val-${i}c` });

        // }

        let mainContent = (
            <BootstrapTable
                bootstrap4
                bordered={false}
                keyField="id"
                data={this.props.orders}
                columns={this.orderTableColumns}
            // expandRow={rowDetails}
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
                            <div className="chat-messages p-4">
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