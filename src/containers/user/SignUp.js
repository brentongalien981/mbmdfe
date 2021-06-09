import React from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Spinner
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
                value={props.email}
                onChange={(e) => props.onCredentialChanged(e)}
              />
            </FormGroup>

            <FormGroup>
              <Label>Password</Label>
              <Input
                bsSize="lg"
                type="password"
                name="password"
                placeholder="Enter password"
                value={props.password}
                onChange={(e) => props.onCredentialChanged(e)}
              />
            </FormGroup>

            <br />
            <Label>Roles</Label>

            <FormGroup check className="mb-2">
              {getUserRolesComponent(props)}
            </FormGroup>

            {getButtonSectionComponent(props)}

          </Form>
        </div>
      </CardBody>
    </Card>
  </React.Fragment>
);



const getButtonSectionComponent = (props) => {
  const mainComponent = props.isCreatingUser ? (<Spinner color="dark" size="sm" className="mr-2" />) : (<Button color="primary" size="lg" onClick={props.onCreateUser}>Create User</Button>);

  return (
    <div className="text-center mt-3">
      {mainComponent}
    </div>
  );
  
};



const getUserRolesComponent = (props) => {
  return props.userRoles.map((r, i) => {
    return (
      <div key={i}>
        <Label check>
          <Input type="checkbox" value={r.id} name={r.name} onChange={(e) => props.onCredentialChanged(e)} /> {r.name}
        </Label>
        <br />
      </div>
    );
  });
};

export default SignUp;
