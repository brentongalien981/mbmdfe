import { getInitialDate, parseDateToStr } from "../../../bmd/helpers/HelperFuncsA";

export const DISPATCH_STATUSES = {
    DEFAULT: {code: 500, name: 'DEFAULT' }
};



export const DISPATCH_FORM_FIELDS = [
    { field: 'id', type: 'text', isDisabled: true },
    { field: 'epBatchId', type: 'number', isDisabled: true },
    { field: 'colorCodedStatus', type: 'label', isDisabled: false, isMetaField: true },
    { field: 'statusCode', type: 'select', isDisabled: true },
    { field: 'createdAt', type: 'date', isDisabled: true },
    { field: 'updatedAt', type: 'date', isDisabled: true }
];



export const DISPATCH_FILTERS_FORM_FIELDS = [
    { name: 'id', type: 'number' },
    { name: 'epBatchId', type: 'text' },
    { name: 'statusCode', type: 'select' },
    { name: 'notes', type: 'text' },
    { name: 'createdAt', type: 'date', label: 'createdAt (greater/equal)' },
    { name: 'updatedAt', type: 'date', label: 'updatedAt (greater/equal)' },
];



export const DISPATCHES_TABLE_COLUMNS = [
    { dataField: 'id', text: 'id', sort: true },
    { dataField: 'dispatchLink', text: 'dispatchLink', sort: false },

    { dataField: 'epBatchId', text: 'epBatchId', sort: false },

    { dataField: 'colorCodedStatus', text: 'colorCodedStatus', sort: false },
    { dataField: 'statusCode', text: 'statusCode', sort: true },
    { dataField: 'statusName', text: 'statusName', sort: true },

    { dataField: 'notes', text: 'notes', sort: false },
    { dataField: 'createdAt', text: 'createdAt', sort: true },
    { dataField: 'updatedAt', text: 'updatedAt', sort: true }
];



export const INITIAL_DISPATCH_DATE_FILTER_IN_STR = parseDateToStr(getInitialDate(-365), 'yyyy-mm-dd');