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