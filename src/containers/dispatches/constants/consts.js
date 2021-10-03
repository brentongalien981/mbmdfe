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



export const DISPATCH_ORDERS_TABLE_COLUMNS = [    
    { dataField: 'actions', text: 'actions', sort: false },
    { dataField: 'order_id_link', text: 'Order Link', sort: false },
    { dataField: 'id', text: 'Order ID', sort: true },

    { dataField: 'colorCodedStatus', text: 'Status Color', sort: false },
    { dataField: 'status_code', text: 'Status Code', sort: true },
    { dataField: 'status_name', text: 'Status', sort: true },

    { dataField: 'ep_shipment_id', text: 'EP Shipment ID', sort: false },

    { dataField: 'first_name', text: 'First Name', sort: false },
    { dataField: 'last_name', text: 'Last Name', sort: false },
    { dataField: 'street', text: 'Street', sort: false },
    { dataField: 'city', text: 'City', sort: false },
    { dataField: 'province', text: 'Province', sort: false },
    { dataField: 'country', text: 'Country', sort: false },
    { dataField: 'postal_code', text: 'ZIP / Postal Code', sort: false },
    { dataField: 'phone', text: 'Phone', sort: false },
    { dataField: 'email', text: 'Email', sort: false },
    
    { dataField: 'charged_shipping_fee', text: 'Shipping', sort: false },

    { dataField: 'latest_delivery_date', text: 'Late D-Date', sort: true },
    { dataField: 'projected_total_delivery_days', text: 'Projected D-Days', sort: false },
    { dataField: 'created_at', text: 'Created At', sort: true },
    { dataField: 'updated_at', text: 'Updated At', sort: true },
];



export const EP_BATCH_SHIPMENTS_TABLE_COLUMNS = [    
    { dataField: 'id', text: 'EP Shipment ID', sort: true },
    { dataField: 'batch_status', text: 'Status', sort: true },
    { dataField: 'tracking_code', text: 'Tracking Code', sort: true },    
    { dataField: 'reference', text: 'Reference', sort: true },
    { dataField: 'batch_message', text: 'Batch Message', sort: false }    
];