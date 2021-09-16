import BsJLS from "../../../bs/core/BsJLS";
import { DISPATCH_FILTERS_FORM_FIELDS, DISPATCH_FORM_FIELDS, INITIAL_DISPATCH_DATE_FILTER_IN_STR } from "../constants/consts";

export function removeReactComponentsFromDispatch(dispatch) {

    let updatedDispatch = {};

    for (const field of DISPATCH_FORM_FIELDS) {
        if (field.isMetaField) { continue; }
        updatedDispatch[field.field] = dispatch[field.field];
    }

    return updatedDispatch;
}



export const getInitialDispatchFilters = () => {

    const initialFilters = BsJLS.get('dispatches.filters');

    let filters = {};

    for (const formField of DISPATCH_FILTERS_FORM_FIELDS) {
        
        const filterName = formField.name;
        const defaultFilterVal = formField.type === 'date' ? INITIAL_DISPATCH_DATE_FILTER_IN_STR : '';
        const filterVal = initialFilters?.[filterName] ?? defaultFilterVal;

        filters[filterName] = filterVal;
    }

    return filters;
};