export const NUM_OF_DISPLAYED_ORDERS_PER_PAGE = 10;



export const ORDER_TABLE_COLUMNS = [
    { dataField: 'id', text: 'ID', sort: true },
    { dataField: 'user_id', text: 'User ID', sort: false },
    { dataField: 'cart_id', text: 'Cart ID', sort: false },
    { dataField: 'stripe_payment_intent_id', text: 'SPI ID', sort: false },
    // { dataField: 'status_code', text: 'Status', sort: false },
    { dataField: 'status_name', text: 'Status', sort: false },
    { dataField: 'first_name', text: 'First Name', sort: false },
    { dataField: 'last_name', text: 'Last Name', sort: false },
    { dataField: 'street', text: 'Street', sort: false },
    { dataField: 'city', text: 'City', sort: false },
    { dataField: 'province', text: 'Province', sort: false },
    { dataField: 'country', text: 'Country', sort: false },
    { dataField: 'postal_code', text: 'ZIP / Postal Code', sort: false },
    { dataField: 'phone', text: 'Phone', sort: false },
    { dataField: 'email', text: 'Email', sort: false },
    { dataField: 'created_at', text: 'Created At', sort: false },
    { dataField: 'updated_at', text: 'Updated At', sort: false },
    { dataField: 'charged_subtotal', text: 'Subtotal', sort: false },
    { dataField: 'charged_shipping_fee', text: 'Shipping', sort: false },
    { dataField: 'charged_tax', text: 'Tax', sort: false },
    { dataField: 'earliest_delivery_date', text: 'Early D-Date', sort: false },
    { dataField: 'latest_delivery_date', text: 'Late D-Date', sort: false },
    { dataField: 'projected_total_delivery_days', text: 'Projected D-Days', sort: false }
];