import BsCore2 from "../../bs/core/BsCore2";

/** NAMES */
// BMD-DELETE
export const ON_TEST_DISPATCH_RETURN = "ON_TEST_DISPATCH_RETURN";
export const TEST_INCREMENT = "TEST_INCREMENT";
export const DO_SHIT = "DO_SHIT";



/** FUNCS */
// BMD-DELETE
export const onTestDispatchReturn = (callBackData) => ({ type: ON_TEST_DISPATCH_RETURN, callBackData: callBackData });
export const testIncrement = () => ({ type: TEST_INCREMENT });
export const doShit = (callBackData) => ({ type: DO_SHIT, callBackData: callBackData });



/** AJAX FUNCS */
// BMD-DELETE
export const testDispatch = () => {

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/mytest/forMBMDBE',
            params: { a: 1, b: 'p' },
            callBackFunc: (requestData, json) => {
                const callBackData = { ...json };
                dispatch(onTestDispatchReturn(callBackData));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                const callBackData = { errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onTestDispatchReturn(callBackData));
            }
        });
    };

};