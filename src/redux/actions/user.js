/** NAMES */
export const DO_SHIT = "DO_SHIT";



/** FUNCS */
export const doShit = (callBackData) => ({ type: DO_SHIT, callBackData: callBackData });



/** AJAX FUNCS */
// export const readCheckoutRequiredData = () => {

//     const bmdAuth = BmdAuth.getInstance();

//     return (dispatch) => {

//         BsCore2.ajaxCrud({
//             url: '/checkout/readCheckoutRequiredData',
//             method: 'post',
//             params: { bmdToken: bmdAuth?.bmdToken, authProviderId: bmdAuth?.authProviderId },
//             callBackFunc: (requestData, json) => {
//                 dispatch(onReadCheckoutRequiredDataSuccess(json.objs));
//             },
//             errorCallBackFunc: (errors, errorStatusCode) => {
//                 const callBackData = { errors: errors, errorStatusCode: errorStatusCode };
//                 dispatch(onReadCheckoutRequiredDataFail(callBackData));
//             }
//         });
//     };

// };