import React from 'react';
import { Form, FormGroup, Input, Label, Pagination, PaginationItem, PaginationLink } from 'reactstrap';


export const PageNavigator = (props) => {
    
    const pageNumInput = (
        <Form inline>
            <FormGroup>
                <Input
                    value={props.pageNum}
                    type="number"
                    min="1"
                    name="pageNum"
                    onChange={props.onPageNumChange}
                    className="mb-3"
                />
            </FormGroup>

            {/* <FormGroup className="mb-2 mr-sm-2 mb-sm-0"> */}
            <FormGroup>
                <Label>of {props.numOfPages}</Label>
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