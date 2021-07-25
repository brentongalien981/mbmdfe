import BmdAuth from "../../bs/core/BmdAuth";
import BsCore2 from "../../bs/core/BsCore2";



/** NAMES */
export const ON_READ_ORDERS_RETURN = "ON_READ_ORDERS_RETURN";



/** FUNCS */
export const onReadOrdersReturn = (callBackData) => ({ type: ON_READ_ORDERS_RETURN, callBackData: callBackData });



/** AJAX FUNCS */
export const readOrders = (data) => {

    const bmdAuth = BmdAuth.getInstance();

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/orders',
            params: { 
                bmdToken: bmdAuth?.bmdToken, 
                authProviderId: bmdAuth?.authProviderId 
            },
            callBackFunc: (requestData, json) => {
                 const callBackData = { ...data, ...json };
                dispatch(onReadOrdersReturn(callBackData));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onReadOrdersReturn(callBackData));
            }
        });
    };

};