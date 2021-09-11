export const DISPATCH_STATUSES = {
    DEFAULT: {code: 500, name: 'DEFAULT' }
};



export const DISPATCH_FORM_FIELDS = [
    { field: 'id', type: 'text', isDisabled: true },
    { field: 'epBatchId', type: 'number', isDisabled: true },
    { field: 'colorCodedStatus', type: 'label', isDisabled: false, isMetaField: true },
    { field: 'statusCode', type: 'select', isDisabled: true },
    { field: 'createdAt', type: 'date', isDisabled: true },
    { field: 'updatedAt', type: 'date', isDisabled: true }
];