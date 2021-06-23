/** NAMES */
// export const ON_GET_EXCHANGE_RATES_RETURN = "ON_GET_EXCHANGE_RATES_RETURN";



/** FUNCS */
// export const onGetExchangeRatesReturn = (callBackData) => ({ type: ON_GET_EXCHANGE_RATES_RETURN, callBackData: callBackData });



/** AJAX FUNCS */
// export const readCheckoutRequiredData = () => {

//     const bmdAuth = BmdAuth.getInstance();

//     return (dispatch) => {

//         BsCore2.ajaxCrud({
//             url: '/checkout/readCheckoutRequiredData',
//             method: 'post',
//             params: { bmdToken: bmdAuth?.bmdToken, authProviderId: bmdAuth?.authProviderId },
//             callBackFunc: (requestData, json) => {
//                  const callBackData = { ...data, ...json };
//                 dispatch(onReadCheckoutRequiredDataSuccess(callBackData));
//             },
//             errorCallBackFunc: (errors, errorStatusCode) => {
//                 const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode };
//                 dispatch(onReadCheckoutRequiredDataFail(callBackData));
//             }
//         });
//     };

// };