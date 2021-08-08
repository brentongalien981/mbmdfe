export const ORDER_ITEM_TABLE_COLUMNS = [
    { dataField: 'id', text: 'ID', sort: true },
    { dataField: 'orderId', text: 'orderId', sort: true },
    { dataField: 'productId', text: 'productId', sort: true },
    { dataField: 'productSellerId', text: 'productSellerId', sort: true },
    { dataField: 'sizeAvailabilityId', text: 'sizeAvailabilityId', sort: true },
    { dataField: 'purchaseItemId', text: 'purchaseItemId', sort: true },
    { dataField: 'price', text: 'price', sort: true },
    { dataField: 'quantity', text: 'quantity', sort: true },
    { dataField: 'status_code', text: 'status_code', sort: true },
    { dataField: 'status_name', text: 'status_name', sort: true },
    { dataField: 'created_at', text: 'created_at', sort: true },
    { dataField: 'updated_at', text: 'updated_at', sort: true }
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