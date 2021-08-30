export const ORDER_ITEM_TABLE_COLUMNS = [
    { dataField: 'actions', text: 'actions', sort: false },
    { dataField: 'id', text: 'ID', sort: true },

    { dataField: 'colorCodedStatus', text: 'colorStatus', sort: false },
    { dataField: 'status_code', text: 'status_code', sort: true },
    { dataField: 'status_name', text: 'status_name', sort: true },
    
    { dataField: 'orderId', text: 'orderId', sort: true },
    { dataField: 'quantity', text: 'quantity', sort: true },

    { dataField: 'productId', text: 'productId', sort: true },
    { dataField: 'productName', text: 'productName', sort: true, isMetaField: true },

    { dataField: 'productSellerId', text: 'productSellerId', sort: true },
    { dataField: 'sellerProductLinkComponent', text: 'sellerProductLink', sort: false, isMetaField: true },
    { dataField: 'sizeAvailabilityId', text: 'sizeAvailabilityId', sort: true },
    { dataField: 'size', text: 'size', sort: true, isMetaField: true },
    { dataField: 'purchaseItemId', text: 'purchaseItemId', sort: true },
    { dataField: 'price', text: 'price', sort: true },    

    { dataField: 'created_at', text: 'created_at', sort: true },
    { dataField: 'updated_at', text: 'updated_at', sort: true }
];



export const ORDER_ITEM_FORM_FIELDS = [
    { name: 'id', type: 'number', isDisabled: true },
    { name: 'orderId', type: 'text', isDisabled: true },
    { name: 'productId', type: 'number', isDisabled: false },
    { name: 'productSellerId', type: 'number', isDisabled: false },
    { name: 'sizeAvailabilityId', type: 'number', isDisabled: false },
    { name: 'purchaseItemId', type: 'number', isDisabled: false },
    { name: 'price', type: 'number', isDisabled: false },
    { name: 'quantity', type: 'number', isDisabled: false },
    { name: 'status_code', type: 'select', isDisabled: false },
    // { name: 'created_at', type: 'date', isDisabled: true },
    // { name: 'updated_at', type: 'date', isDisabled: true }
];



export const ORDER_FORM_FIELDS = [
    { field: 'id', type: 'text' },
    { field: 'user_id', type: 'text' },
    { field: 'stripe_payment_intent_id', type: 'text' },
    { field: 'cart_id', type: 'number' },
    { field: 'first_name', type: 'text' },
    { field: 'last_name', type: 'text' },
    { field: 'street', type: 'text' },
    { field: 'city', type: 'text' },
    { field: 'province', type: 'text' },
    { field: 'country', type: 'text' },
    { field: 'postal_code', type: 'text' },
    { field: 'phone', type: 'text' },
    { field: 'email', type: 'text' },

    { field: 'colorCodedStatus', type: null, isLabel: true, isMetaField: true },
    { field: 'status_code', type: 'select' },
    // { field: 'status_name', type: 'text' },
    { field: 'charged_subtotal', type: 'text' },
    { field: 'charged_shipping_fee', type: 'text' },
    { field: 'charged_tax', type: 'text' },
    { field: 'earliest_delivery_date', type: 'date' },
    { field: 'latest_delivery_date', type: 'date' },
    { field: 'projected_total_delivery_days', type: 'number' },
    { field: 'created_at', type: 'date' },
    { field: 'updated_at', type: 'date' }
];



export const ORDER_ITEM_STATUSES = {
    PURCHASE_INCOMPLETELY_RECEIVED: {code: -304, name: 'PURCHASE_INCOMPLETELY_RECEIVED' },
    EVALUATED_INCOMPLETELY_FOR_PURCHASE: {code: -301, name: 'EVALUATED_INCOMPLETELY_FOR_PURCHASE' },
    DEFAULT: {code: 300, name: 'DEFAULT' },
    TO_BE_PURCHASED: {code: 301, name: 'TO_BE_PURCHASED' },
    PURCHASED: {code: 302, name: 'PURCHASED' },
    TO_BE_PURCHASE_RECEIVED: {code: 303, name: 'TO_BE_PURCHASE_RECEIVED' },
    PURCHASE_RECEIVED: {code: 304, name: 'PURCHASE_RECEIVED' },

    IN_STOCK: {code: 305, name: 'IN_STOCK' },
    TO_BE_PACKAGED: {code: 306, name: 'TO_BE_PACKAGED' },
    PACKAGED: {code: 307, name: 'PACKAGED' },
    TO_BE_DISPATCHED: {code: 308, name: 'TO_BE_DISPATCHED' },
    DISPATCHED: {code: 309, name: 'DISPATCHED' }

};