import { getInitialDate, parseDateToStr } from "../../../bmd/helpers/HelperFuncsA";

export const INITIAL_DISPATCH_DATE_FILTER_IN_STR = parseDateToStr(getInitialDate(-365), 'yyyy-mm-dd');


export const DISPATCH_STATUSES = {

    // RED
    EP_BATCH_CREATION_FAILED: { code: -504, name: 'EP_BATCH_CREATION_FAILED' },
    OTHER_ERRORS: { code: -501, name: 'OTHER_ERRORS' },

    // GRAY
    DEFAULT: { code: 500, name: 'DEFAULT' },
    EP_BATCH_CREATING: { code: 501, name: 'EP_BATCH_CREATING' },

    // BLUE
    EP_BATCH_CREATED: { code: 502, name: 'EP_BATCH_CREATED' },
    EP_BATCH_UPDATED: { code: 503, name: 'EP_BATCH_UPDATED' },
    EP_BATCH_LABELS_GENERATED: { code: 504, name: 'EP_BATCH_LABELS_GENERATED' },
    EP_BATCH_SCANFORM_GENERATED: { code: 505, name: 'EP_BATCH_SCANFORM_GENERATED' },

    // GREEN
    EP_PICKUP_BOUGHT: { code: 509, name: 'EP_PICKUP_BOUGHT' },
    DISPATCHING: { code: 506, name: 'DISPATCHING' },

    // BLACK
    DISPATCHED: { code: 507, name: 'DISPATCHED' },
    CANCELLED: { code: 508, name: 'CANCELLED' },
};



export const DISPATCH_FORM_FIELDS = [
    { field: 'id', type: 'text', isDisabled: true },
    { field: 'epBatchId', type: 'text', isDisabled: true },
    { field: 'colorCodedStatus', type: 'label', isDisabled: false, isMetaField: true },
    { field: 'statusCode', type: 'select', isDisabled: false },
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