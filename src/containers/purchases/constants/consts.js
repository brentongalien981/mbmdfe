export const PURCHASE_FILTERS_FORM_FIELDS = [
    { name: 'id', type: 'number', isDisabled: false },

    { name: 'orderId', type: 'text', isDisabled: true },
    { name: 'productId', type: 'number', isDisabled: false },
    { name: 'productSellerId', type: 'number', isDisabled: false },
    { name: 'sizeAvailabilityId', type: 'number', isDisabled: false },
    { name: 'purchaseItemId', type: 'number', isDisabled: false },
    { name: 'price', type: 'number', isDisabled: false },
    { name: 'quantity', type: 'number', isDisabled: false },
    { name: 'status_code', type: 'select', isDisabled: false },
    { name: 'created_at', type: 'date', isDisabled: true },
    { name: 'updated_at', type: 'date', isDisabled: true }
];