export const PURCHASE_FORM_FIELDS = [
    { field: 'id', type: 'number', isDisabled: true },
    { field: 'sellerId', type: 'number', isDisabled: false },
    { field: 'projectedSubtotal', type: 'number', isDisabled: false },
    { field: 'projectedShippingFee', type: 'number', isDisabled: false },
    { field: 'projectedOtherFee', type: 'number', isDisabled: false },
    { field: 'projectedTax', type: 'number', isDisabled: false },
    { field: 'chargedSubtotal', type: 'number', isDisabled: false },
    { field: 'chargedShippingFee', type: 'number', isDisabled: false },
    { field: 'chargedOtherFee', type: 'number', isDisabled: false },
    { field: 'chargedTax', type: 'number', isDisabled: false },

    { field: 'statusCode', type: 'select', isDisabled: false },
    // { field: 'statusName', type: 'text', isDisabled: false },    
    { field: 'orderIdFromSellerSite', type: 'text', isDisabled: false },
    { field: 'shippingIdFromCarrier', type: 'text', isDisabled: false },
    { field: 'notes', type: 'text', isDisabled: false },
    { field: 'estimatedDeliveryDate', type: 'date', isDisabled: false },
    { field: 'createdAt', type: 'date', isDisabled: true },
    { field: 'updatedAt', type: 'date', isDisabled: true }
];



export const NOT_INCLUDED_FIELDS_FOR_CREATE_PURCHASE_FORM = [
    'createdAt', 'updatedAt'
];



export const PURCHASE_ITEMS_TABLE_COLUMNS = [    
    { dataField: 'id', text: 'id', sort: true },
    { dataField: 'actions', text: 'actions', sort: false },

    { dataField: 'colorCodedStatus', text: 'colorCodedStatus', sort: false },
    { dataField: 'statusCode', text: 'statusCode', sort: true },
    { dataField: 'statusName', text: 'statusName', sort: true },

    { dataField: 'purchaseId', text: 'purchaseId', sort: true },
    { dataField: 'sellerProductId', text: 'sellerProductId', sort: true },
    { dataField: 'sizeAvailabilityId', text: 'sizeAvailabilityId', sort: true },
    { dataField: 'quantity', text: 'quantity', sort: true },
    { dataField: 'projectedPrice', text: 'projectedPrice', sort: false },
    { dataField: 'actualPrice', text: 'actualPrice', sort: false },    
    { dataField: 'createdAt', text: 'createdAt', sort: true },
    { dataField: 'updatedAt', text: 'updatedAt', sort: true }
];



export const PURCHASE_ITEM_FORM_FIELDS = [    
    { field: 'purchaseId', label: 'purchaseId', type: 'number', isDisabled: true },
    { field: 'sellerProductId', label: 'sellerProductId', type: 'number', isDisabled: false },
    { field: 'sizeAvailabilityId', label: 'sizeAvailabilityId', type: 'number', isDisabled: false },
    { field: 'quantity', label: 'quantity', type: 'number', isDisabled: false },
    { field: 'statusCode', label: 'statusCode', type: 'select', isDisabled: false },
    { field: 'projectedPrice', label: 'projectedPrice', type: 'number', isDisabled: false },
    { field: 'actualPrice', label: 'actualPrice', type: 'number', isDisabled: false }
];