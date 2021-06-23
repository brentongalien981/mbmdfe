import React from "react";
import { connect } from "react-redux";

import {
  Row,
  Col,
  Collapse,
  Navbar,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ListGroup,
  ListGroupItem,
  Form,
  Input
} from "reactstrap";

import {
  AlertCircle,
  Bell,
  BellOff,
  Home,
  MessageCircle,
  PieChart,
  Settings,
  User,
  UserPlus,
  Monitor
} from "react-feather";

import avatar1 from "../assets/img/avatars/avatar.jpg";
import avatar3 from "../assets/img/avatars/avatar-3.jpg";
import BmdAuth from "../bs/core/BmdAuth";
import { Link } from "react-router-dom";

const notifications = [
  {
    type: "login",
    title: "Login from 192.186.1.1",
    description: "",
    time: "6h ago"
  },
  {
    type: "request",
    title: "New connection",
    description: "Anna accepted your request.",
    time: "12h ago"
  }
];


const NavbarDropdown = ({
  children,
  count,
  showBadge,
  header,
  footer,
  icon: Icon
}) => (
  <UncontrolledDropdown nav inNavbar className="mr-2">
    <DropdownToggle nav className="nav-icon dropdown-toggle">
      <div className="position-relative">
        <Icon className="align-middle" size={18} />
        {showBadge ? <span className="indicator">{count}</span> : null}
      </div>
    </DropdownToggle>
    <DropdownMenu right className="dropdown-menu-lg py-0">
      <div className="dropdown-menu-header position-relative">
        {count} {header}
      </div>
      <ListGroup>{children}</ListGroup>
      <DropdownItem header className="dropdown-menu-footer">
        <span className="text-muted">{footer}</span>
      </DropdownItem>
    </DropdownMenu>
  </UncontrolledDropdown>
);

const NavbarDropdownItem = ({ icon, title, description, time, spacing }) => (
  <ListGroupItem>
    <Row noGutters className="align-items-center">
      <Col xs={2}>{icon}</Col>
      <Col xs={10} className={spacing ? "pl-2" : null}>
        <div className="text-dark">{title}</div>
        <div className="text-muted small mt-1">{description}</div>
        <div className="text-muted small mt-1">{time}</div>
      </Col>
    </Row>
  </ListGroupItem>
);

const NavbarComponent = (props) => {

  return (
    <Navbar color="white" light expand>

      <Collapse navbar>
        <Nav className="ml-auto" navbar>

          <NavbarDropdown
            header="New Notifications"
            footer="Show all notifications"
            icon={Bell}
            count={notifications.length}
          >
            {notifications.map((item, key) => {
              let icon = <Bell size={18} className="text-warning" />;

              if (item.type === "important") {
                icon = <AlertCircle size={18} className="text-danger" />;
              }

              if (item.type === "login") {
                icon = <Home size={18} className="text-primary" />;
              }

              if (item.type === "request") {
                icon = <UserPlus size={18} className="text-success" />;
              }

              return (
                <NavbarDropdownItem
                  key={key}
                  icon={icon}
                  title={item.title}
                  description={item.description}
                  time={item.time}
                />
              );
            })}
          </NavbarDropdown>



          <UncontrolledDropdown nav inNavbar>

            <span className="d-inline-block d-sm-none">
              <DropdownToggle nav caret>
                <Settings size={18} className="align-middle" />
              </DropdownToggle>
            </span>


            <span className="d-none d-sm-inline-block">
              <DropdownToggle nav caret>
                <img
                  src={avatar3}
                  className="avatar img-fluid rounded-circle mr-1"
                  alt="username"
                />
                <span className="text-dark">{props.userEmail}</span>
              </DropdownToggle>
            </span>


            <DropdownMenu right>

              <DropdownItem>
                <PieChart size={18} className="align-middle mr-2" />
                Daily Summary
              </DropdownItem>

              <DropdownItem>
                <User size={18} className="align-middle mr-2" />
                Profile
              </DropdownItem>


              <DropdownItem>
                <Link to='/automated-jobs'>
                  <Monitor size={18} className="align-middle mr-2" />Automated Jobs
                </Link>
              </DropdownItem>

              <DropdownItem divider />


              <DropdownItem onClick={props.onSignOut}>Sign out</DropdownItem>
            </DropdownMenu>


          </UncontrolledDropdown>

        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default connect(store => ({
  app: store.app
}))(NavbarComponent);
