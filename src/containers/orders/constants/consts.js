import { getInitialDate, parseDateToStr } from "../../../bmd/helpers/HelperFuncsA";

export const NUM_OF_DISPLAYED_ORDERS_PER_PAGE = 10;
export const INIT_DATE_FILTERS_IN_STR = parseDateToStr(getInitialDate(-365), 'yyyy-mm-dd');



export const ORDER_TABLE_COLUMNS = [
    { dataField: 'order_id_link', text: 'Link', sort: false },
    { dataField: 'id', text: 'ID', sort: true },

    { dataField: 'colorCodedStatus', text: 'Status Color', sort: false },
    { dataField: 'status_code', text: 'Status Code', sort: true },
    { dataField: 'status_name', text: 'Status', sort: true },

    { dataField: 'user_id', text: 'User ID', sort: false },
    { dataField: 'cart_id', text: 'Cart ID', sort: false },
    { dataField: 'stripe_payment_intent_id', text: 'SPI ID', sort: false },

    { dataField: 'first_name', text: 'First Name', sort: false },
    { dataField: 'last_name', text: 'Last Name', sort: false },
    { dataField: 'street', text: 'Street', sort: false },
    { dataField: 'city', text: 'City', sort: false },
    { dataField: 'province', text: 'Province', sort: false },
    { dataField: 'country', text: 'Country', sort: false },
    { dataField: 'postal_code', text: 'ZIP / Postal Code', sort: false },
    { dataField: 'phone', text: 'Phone', sort: false },
    { dataField: 'email', text: 'Email', sort: false },
    { dataField: 'charged_subtotal', text: 'Subtotal', sort: false },
    { dataField: 'charged_shipping_fee', text: 'Shipping', sort: false },
    { dataField: 'charged_tax', text: 'Tax', sort: false },
    { dataField: 'earliest_delivery_date', text: 'Early D-Date', sort: false },
    { dataField: 'latest_delivery_date', text: 'Late D-Date', sort: false },
    { dataField: 'projected_total_delivery_days', text: 'Projected D-Days', sort: false },
    { dataField: 'created_at', text: 'Created At', sort: false },
    { dataField: 'updated_at', text: 'Updated At', sort: false },
];





/** ORDER-STATUSES */

// Order Error
export const PAYMENT_METHOD_NOT_CHARGED = -7001;
export const INVALID_CART = -8001;
export const CART_HAS_NO_ITEM = -8002;
export const INVALID_PAYMENT_METHOD = -8003;
export const ORDER_FINALIZATION_FAILED = -8004;
export const ORDER_FINALIZATION_EXCEPTION = -8005;
export const ORDER_FINALIZATION_INCOMPLETE = -8006;

export const POSSIBLE_DOUBLE_PAYMENT = 9001;
export const MISSING_STRIPE_PAYMENT_INTENT_LINK = 9002;
export const CUSTOMER_HAS_TO_BE_REFUNDED = 9003;



// Payment Processing
export const WAITING_FOR_PAYMENT = 7000;
export const PAYMENT_METHOD_VALIDATED = 7001;

export const STRIPE_PAYMENT_INTENT_CREATED = 7101;

export const START_OF_FINALIZING_ORDER_WITH_PREDEFINED_PAYMENT = 8100;
export const DB_CART_CREATED = 8101;
export const CACHE_CART_UPDATED_TO_LATEST_VERSION = 8102;
export const DB_CART_ITEMS_CREATED = 8103;



// Payment Received
export const PAYMENT_METHOD_CHARGED = 7002;

export const START_OF_FINALIZING_ORDER = 8000;
export const VALID_CART = 8001;
export const CART_HAS_ITEM = 8002;
export const CART_CHECKEDOUT_OK = 8003;



// Order Confirmed
export const ORDER_CREATED = 8006;
export const ORDER_ITEMS_CREATED = 8007;
export const INVENTORY_QUANTITIES_UPDATED = 8008;
export const INVENTORY_ORDER_LIMITS_UPDATED = 8009;
export const CACHE_CART_RESET_OK = 8010;
export const ORDER_CONFIRMED = 8011;
export const ORDER_DETAILS_EMAILED_TO_USER = 8012;



// Order Processing
export const PROCESSING_FOR_SHIPMENT = 8013;
export const BEING_SHIPPED = 8014;

export const EVALUATED_INCOMPLETELY_FOR_PURCHASE = -8301;
export const PURCHASE_INCOMPLETELY_RECEIVED = -8304;

export const BEING_EVALUATED_FOR_PURCHASE = 8300;
export const TO_BE_PURCHASED = 8301;
export const PURCHASED = 8302;
export const TO_BE_PURCHASE_RECEIVED = 8303;
export const PURCHASE_RECEIVED = 8304;
export const IN_STOCK = 8305;
export const TO_BE_PACKAGED = 8306;
export const PACKAGED = 8307;
export const TO_BE_DISPATCHED = 8308;



// Order Dispatched
export const DISPATCHED = 8309;



// Order Delivered
export const DELIVERED = 8015;
export const FINALIZED = 8016;



/** REFUNDS */
// Order Cancelled
export const CANCELLED = 666001;



// Order Being Returned
export const ORDER_APPLIED_FOR_REFUND = 666002;
export const ORDER_TO_BE_PICKED_UP_BY_CARRIER_FOR_REFUND = 666003;
export const ORDER_BEING_RETURNED_FOR_REFUND = 666004;
export const RETURNED = 666005;



// Order Being Refunded
export const PROCESSING_FOR_REFUND = 666006;



// Order Refunded
export const REFUNDED = 666007;



// Order Closed
export const CLOSED = 666008;