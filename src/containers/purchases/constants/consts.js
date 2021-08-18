import { getInitialDate, parseDateToStr } from "../../../bmd/helpers/HelperFuncsA";

export const INITIAL_DATE_FILTER_IN_STR = parseDateToStr(getInitialDate(-365), 'yyyy-mm-dd');



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
    { name: 'statusCode', type: 'number' },
    { name: 'statusName', type: 'text' },
    { name: 'estimatedDeliveryDate', type: 'date' },
    { name: 'orderIdFromSellerSite', type: 'text' },
    { name: 'shippingIdFromCarrier', type: 'text' },
    { name: 'notes', type: 'text' },
    { name: 'createdAt', type: 'date' },
    { name: 'updatedAt', type: 'date' },
    // { name: 'purchaseItems', type: 'text' }
];



export const PURCHASES_TABLE_COLUMNS = [
    { dataField: 'id', text: 'id', sort: true },
    { dataField: 'sellerId', text: 'sellerId', sort: true },
    { dataField: 'projectedSubtotal', text: 'projectedSubtotal', sort: false },
    { dataField: 'projectedShippingFee', text: 'projectedShippingFee', sort: false },
    { dataField: 'projectedOtherFee', text: 'projectedOtherFee', sort: false },
    { dataField: 'projectedTax', text: 'projectedTax', sort: false },
    { dataField: 'chargedSubtotal', text: 'chargedSubtotal', sort: false },
    { dataField: 'chargedShippingFee', text: 'chargedShippingFee', sort: false },
    { dataField: 'chargedOtherFee', text: 'chargedOtherFee', sort: false },
    { dataField: 'chargedTax', text: 'chargedTax', sort: false },
    { dataField: 'statusCode', text: 'statusCode', sort: true },
    { dataField: 'statusName', text: 'statusName', sort: true },
    { dataField: 'estimatedDeliveryDate', text: 'estimatedDeliveryDate', sort: true },
    { dataField: 'orderIdFromSellerSite', text: 'orderIdFromSellerSite', sort: false },
    { dataField: 'shippingIdFromCarrier', text: 'shippingIdFromCarrier', sort: false },
    { dataField: 'notes', text: 'notes', sort: false },
    { dataField: 'createdAt', text: 'createdAt', sort: true },
    { dataField: 'updatedAt', text: 'updatedAt', sort: true }
];