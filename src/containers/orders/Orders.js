import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Container, Row, Col, ListGroupItem, Media, Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import avatar1 from "../../assets/img/avatars/avatar.jpg";



class Orders extends React.Component {

    /** PROPERTIES */
    orderTableColumns = [
        { dataField: "prop1", text: "Property 1", sort: true },
        { dataField: "prop2", text: "Property 2", sort: false },
        { dataField: "prop3", text: "Property 3", sort: false }
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

        let data = [];

        for (let i = 0; i < 20; i++) {
            data.push({ prop1: `val-${i}a`, prop2: `val-${i}b`, prop3: `val-${i}c` });

        }

        let mainContent = (
            <BootstrapTable
                bootstrap4
                bordered={false}
                keyField="prop1"
                data={data}
                columns={this.orderTableColumns}
            // expandRow={rowDetails}
            />
        );

        return mainContent;
    };



    /** MAIN FUNCS */
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



export default Orders;