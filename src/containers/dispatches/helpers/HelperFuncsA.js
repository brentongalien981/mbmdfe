import { DISPATCH_FORM_FIELDS } from "../constants/consts";

export function removeReactComponentsFromDispatch(dispatch) {

    let updatedDispatch = {};

    for (const field of DISPATCH_FORM_FIELDS) {
        if (field.isMetaField) { continue; }
        updatedDispatch[field.field] = dispatch[field.field];
    }

    return updatedDispatch;
}