import React from 'react';
import { Form, FormGroup, Input, Label, Pagination, PaginationItem, PaginationLink } from 'reactstrap';


export const PageNavigator = (props) => {

    const pageNumInput = (
        <Form inline className="mx-4 w-50 form-inline d-flex justify-content-center">

            <FormGroup className="w-50 pr-1">
                <Input
                    value={props.pageNum}
                    type="number"
                    min="1"
                    name="pageNum"
                    onChange={(e) => props.onPageNumChange(e)}
                    onKeyPress={(e) => props.onPageNumEnter(e)}
                    className="mb-3 w-100"
                    
                />
            </FormGroup>

            
            <FormGroup className="w-50 pl-1 mb-2">
                <Label>of {props.numOfPages}</Label>
            </FormGroup>

        </Form>
    );


    return (
        <div className="d-flex justify-content-center mt-4">
            <Pagination aria-label="Page navigation example">
                <PaginationItem>
                    <PaginationLink previous href="#" onClick={() => props.onPageNavBtnClick('previous')} />
                </PaginationItem>

                {pageNumInput}

                <PaginationItem>
                    <PaginationLink next href="#" onClick={() => props.onPageNavBtnClick('next')} />
                </PaginationItem>

            </Pagination>
        </div>
    );

};