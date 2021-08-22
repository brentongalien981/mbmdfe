import { getInitialDate, parseDateToStr } from "../../../bmd/helpers/HelperFuncsA";

export const INITIAL_DATE_FILTER_IN_STR = parseDateToStr(getInitialDate(-365), 'yyyy-mm-dd');
export const NUM_OF_DISPLAYED_PURCHASES_PER_PAGE = 10;

export const PURCHASE_STATUSES = {
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



export const PURCHASE_FILTERS_FORM_FIELDS = [
    { name: 'id', type: 'number' },
    { name: 'sellerId', type: 'number' },
    // { name: 'projectedSubtotal', type: 'number' },
    // { name: 'projectedShippingFee', type: 'number' },
    // { name: 'projectedOtherFee', type: 'number' },
    // { name: 'projectedTax', type: 'number' },
    { name: 'chargedSubtotal', type: 'number' },
    { name: 'chargedShippingFee', type: 'number' },
    { name: 'chargedOtherFee', type: 'number' },
    { name: 'chargedTax', type: 'number' },
    { name: 'statusCode', type: 'select' },
    // { name: 'statusName', type: 'text' },
    // { name: 'estimatedDeliveryDate', type: 'date', label: 'estimatedDeliveryDate (greater/equal)' },
    { name: 'orderIdFromSellerSite', type: 'text' },
    { name: 'shippingIdFromCarrier', type: 'text' },
    { name: 'notes', type: 'text' },
    { name: 'createdAt', type: 'date', label: 'createdAt (greater/equal)' },
    { name: 'updatedAt', type: 'date', label: 'updatedAt (greater/equal)' },
];



export const PURCHASES_TABLE_COLUMNS = [
    { dataField: 'id', text: 'id', sort: true },
    { dataField: 'purchaseLink', text: 'link', sort: false },

    { dataField: 'colorCodedStatus', text: 'colorCodedStatus', sort: false },
    { dataField: 'statusCode', text: 'statusCode', sort: true },
    { dataField: 'statusName', text: 'statusName', sort: true },

    { dataField: 'numOfPurchaseItems', text: 'numOfPurchaseItems', sort: true },
    { dataField: 'totalQuantityOfPurchaseItems', text: 'totalQuantityOfPurchaseItems', sort: true },

    { dataField: 'sellerId', text: 'sellerId', sort: true },    

    { dataField: 'projectedSubtotal', text: 'projectedSubtotal', sort: false },
    { dataField: 'projectedShippingFee', text: 'projectedShippingFee', sort: false },
    { dataField: 'projectedOtherFee', text: 'projectedOtherFee', sort: false },
    { dataField: 'projectedTax', text: 'projectedTax', sort: false },
    { dataField: 'chargedSubtotal', text: 'chargedSubtotal', sort: false },
    { dataField: 'chargedShippingFee', text: 'chargedShippingFee', sort: false },
    { dataField: 'chargedOtherFee', text: 'chargedOtherFee', sort: false },
    { dataField: 'chargedTax', text: 'chargedTax', sort: false },

    { dataField: 'estimatedDeliveryDate', text: 'estimatedDeliveryDate', sort: true },
    { dataField: 'orderIdFromSellerSite', text: 'orderIdFromSellerSite', sort: false },
    { dataField: 'shippingIdFromCarrier', text: 'shippingIdFromCarrier', sort: false },
    { dataField: 'notes', text: 'notes', sort: false },
    { dataField: 'createdAt', text: 'createdAt', sort: true },
    { dataField: 'updatedAt', text: 'updatedAt', sort: true }
];