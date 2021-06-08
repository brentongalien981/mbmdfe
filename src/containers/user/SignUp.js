import React from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

const SignUp = (props) => (

  <React.Fragment>
    <div className="text-center mt-4">
      <h1 className="h2">New User Info</h1>
    </div>

    <Card>
      <CardBody>
        <div className="m-sm-4">

          <Form>
            <FormGroup>
              <Label>Email</Label>
              <Input
                bsSize="lg"
                type="email"
                name="email"
                placeholder="Enter your email"
              />
            </FormGroup>

            <FormGroup>
              <Label>Password</Label>
              <Input
                bsSize="lg"
                type="password"
                name="password"
                placeholder="Enter password"
              />
            </FormGroup>

            <br />
            <Label>Roles</Label>

            <FormGroup check className="mb-2">
              {getUserRolesComponent(props.userRoles)}
            </FormGroup>

            <div className="text-center mt-3">
              <Link to="/dashboard/default">
                <Button color="primary" size="lg">
                  Create User
                </Button>
              </Link>
            </div>

          </Form>
        </div>
      </CardBody>
    </Card>
  </React.Fragment>
);



const getUserRolesComponent = (roles) => {
  return roles.map((r, i) => {
    return (
      <div key={i}>
        <Label check><Input type="checkbox" value={r.id} /> {r.name}</Label>
        <br />
      </div>
    );
  });
};

export default SignUp;
