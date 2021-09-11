/** NAMES */
export const RESET_CREATE_DISPATCH_FLAGS = "RESET_CREATE_DISPATCH_FLAGS";



/** FUNCS */
export const resetCreateDispatchFlags = (callBackData) => ({ type: RESET_CREATE_DISPATCH_FLAGS, callBackData: callBackData });



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