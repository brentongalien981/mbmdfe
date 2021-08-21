import BsJLS from '../../../bs/core/BsJLS';
import { INITIAL_DATE_FILTER_IN_STR, PURCHASE_FILTERS_FORM_FIELDS } from "../constants/consts";



export const getInitialPurchaseFilters = () => {

    const initialFilters = BsJLS.get('purchases.filters');

    let filters = {};

    for (const formField of PURCHASE_FILTERS_FORM_FIELDS) {
        
        const filterName = formField.name;
        const defaultFilterVal = formField.type == 'date' ? INITIAL_DATE_FILTER_IN_STR : '';
        const filterVal = initialFilters?.[filterName] ?? defaultFilterVal;

        filters[filterName] = filterVal;
    }

    return filters;
};



export const readPurchases = (container) => {

    if (container.state.isReadingPurchases) { return; }

    container.setState({ isReadingPurchases: true });


    const requestData = {
        params: {
            ...container.state.purchaseFilters,
            pageNum: container.state.pageNum
        },
        doCallBackFunc: () => {
            container.setState({ isReadingPurchases: false });
        }
    };

    container.props.readPurchases(requestData);

};