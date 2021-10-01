import axios from 'axios';
import { GENERAL_HTTP_RESPONSE_ERROR_MSG } from '../../bmd/constants/consts';
import Bs from './Bs';



class BsCore2 {

    static alertForGeneralError() {
        alert(GENERAL_HTTP_RESPONSE_ERROR_MSG);
    }



    static alertForGeneralErrors(errors) {
        let errorMsg = "";

        for (const field in errors) {
            if (errors.hasOwnProperty(field)) {
                const fieldErrors = errors[field];

                errorMsg += fieldErrors[0] + "\n";

            }
        }

        if (errorMsg.length > 0) { alert(errorMsg); }
        else { alert(GENERAL_HTTP_RESPONSE_ERROR_MSG); }
    }



    static tryAlertForBmdResultCodeErrors(data = {}) {

        if (data.objs?.resultCode) {
            alert("Oops! " + data.objs.resultCode?.readableMessage);
        }
        else {
            BsCore2.alertForCallBackDataErrors(data);
        }

    }



    static tryAlertForBmdResultCodeErrors2(data = {}) {

        if (data.resultCode) {
            alert("Oops! " + data.resultCode?.readableMessage);
        }
        else {
            BsCore2.alertForCallBackDataErrors(data);
        }

    }



    static alertForCallBackDataErrors(data = {}) {

        // Unauthenticated.
        if (data.errorStatusCode === 401) { 
            alert('Oops! Please log-in to continue.');
            return;
        }
        // Unauthorized. Forbidden.
        if (data.errorStatusCode === 403) {
            alert('Oops! You are not allowed to do that...');
            return;
        }


        let errors = data.errors;
        let errorMsg = "";

        for (const field in errors) {
            if (errors.hasOwnProperty(field)) {
                const fieldErrors = errors[field];

                errorMsg += fieldErrors[0] + "\n";

            }
        }

        if (errorMsg.length > 0) { alert(errorMsg); }
        else { alert(GENERAL_HTTP_RESPONSE_ERROR_MSG); }
    }



    static ajaxCrud(data = {}) {

        let defaultCrudData = {
            method: "get",
            url: data.url,
            params: {},
            headers: {},
            callBackFunc: BsCore2.defaultCallBackFunc,
            neededResponseParams: [],
            bmdHttpErrorCallBackFunc: BsCore2.bmdHttpErrorCallBackFunc,
            errorCallBackFunc: BsCore2.defaultErrorCallBackFunc,
            ...data
        };


        // 
        let json = {
            originalResultData: null,
            isResultOk: false,
            resultCode: null,
            objs: {},
            // isViewingOwnAccount: false,
            errors: {},
            customErrors: null,
            customError: null,
            caughtCustomErrors: null,
            caughtCustomError: null,
        };



        //
        let url = Bs.appApiUrl + defaultCrudData.url;
        if (data.isUrlExternal) { url = defaultCrudData.url; }

        axios({
            method: defaultCrudData.method,
            url: url,
            params: defaultCrudData.params,
            headers: defaultCrudData.headers,
        })
            .then(function (response) {
                //
                Bs.log("\n\n\n##############################");
                Bs.log("Start of THEN clause for");
                Bs.log("AJAX Request URL ==> " + defaultCrudData.url);
                Bs.log("##############################");


                BsCore2.displayObjects(response, "response");
                BsCore2.displayObjects(response.data, "response.data");
                // displayObjects(response.data.validatedData, "response.data.validatedData");

                const jsonData = response.data;

                json.originalResultData = jsonData;
                json.isResultOk = jsonData["isResultOk"];
                json.resultCode = jsonData["resultCode"];
                json.objs = jsonData["objs"];
                json.obj = jsonData["obj"];
                json.isViewingOwnAccount = jsonData["isViewingOwnAccount"];
                json.customErrors = jsonData["customErrors"];
                json.customError = jsonData["customError"];
                json.caughtCustomErrors = jsonData["caughtCustomErrors"];
                json.caughtCustomError = jsonData["caughtCustomError"];


                const neededResponseParams = defaultCrudData.neededResponseParams;
                for (const param of neededResponseParams) {
                    json[param] = jsonData[param];
                }



                try {
                    defaultCrudData.callBackFunc(defaultCrudData, json);
                } catch (error) {
                    Bs.log("\n##############################");
                    Bs.log("error calling the method: callBackFunc()");
                    Bs.log("error ==> ...");
                    Bs.log(error);
                    Bs.log("##############################");
                }


                Bs.log("\n##############################");
                Bs.log("End of THEN clause for");
                Bs.log("AJAX Request URL ==> " + defaultCrudData.url);
                Bs.log("##############################");

            })
            .catch(function (error) {
                Bs.log("\n\n\n##############################");
                Bs.log("Start of the CATCH clause");
                Bs.log("AJAX Request URL ==> " + defaultCrudData.url);
                Bs.log("##############################");
                Bs.log("\nAJAX Request URL ==> " + defaultCrudData.url);


                BsCore2.displayErrors(error);
                json.errors = BsCore2.tryGetErrors(error);
                // defaultCrudData.bmdHttpErrorCallBackFunc(error);
                const errorStatusCode = error.response.status;
                defaultCrudData.errorCallBackFunc(json.errors, errorStatusCode);


                Bs.log("\n##############################");
                Bs.log("End of the CATCH clause");
                Bs.log("AJAX Request URL ==> " + defaultCrudData.url);
                Bs.log("##############################");
            });
    }



    static tryGetErrors(error) {
        let actualErrors = null;

        try {
            actualErrors = error.response.data.errors;
        } catch (error) {
            Bs.displaySeparator(1);
            Bs.log("error in method: tryGetErrors()");
            Bs.log("error ==> ...");
            Bs.log(error);
            Bs.displaySeparator();
        }

        return actualErrors;
    }


    static defaultCallBackFunc(data, json) {
        Bs.displaySeparator(3);
        Bs.log("In method: defaultCallBackFunc()");
        Bs.log("NOTE: Override this callback func.");
        Bs.displaySeparator();
    }


    static defaultErrorCallBackFunc(errors, errorStatusCode = null) {
        Bs.displaySeparator(3);
        Bs.log("In method: defaultErrorCallBackFunc()");
        Bs.log("NOTICE: There's error with your AJAX request bro.");
        Bs.log("NOTE: Override this error callback func.");
        Bs.displaySeparator();
    }



    static bmdHttpErrorCallBackFunc(error) {
        Bs.displaySeparator(3);
        Bs.log("In method: bmdHttpErrorCallBackFunc()");
        Bs.log("NOTICE: There's error with your AJAX request bro.");
        Bs.displaySeparator();

        switch (error.response?.status) {
            case 401:
                alert('Oops! Try logging-in to continue.');
                break;
            case 501:

                break;

            default:
                break;
        }
    }



    static displayErrors(error) {

        if (error === null) { return; }
        Bs.displaySeparator(1);
        Bs.log("Start of method:: displayErrors()");
        Bs.displaySeparator();
        Bs.log("\nerror ==> ...");
        Bs.log(error);


        Bs.log("\nlooping through object:: error...");
        for (const property in error) {
            if (error.hasOwnProperty(property)) {
                Bs.log(`${property}: ${error[property]}`);

            }
        }


        try {
            Bs.log("\nerror.response ==> ...");
            Bs.log(error.response);
        } catch (e) {
            Bs.log("\nerror displaying error.response");
        }

        try {
            Bs.log("\nerror.response.data.message ==> ...");
            Bs.log(error.response.data.message);
        } catch (e) {
            Bs.log("\nerror displaying error.response.data.message");
        }

        try {
            Bs.log("\nerror.response.data.errors ==> ...");
            Bs.log(error.response.data.errors);
        } catch (e) {
            Bs.log("\nerror displaying error.response.data.errors");
        }


        Bs.displaySeparator(1);
        Bs.log("End of method:: displayErrors()");
        Bs.displaySeparator();
    }


    static displayObjects(obj, objName) {

        Bs.displaySeparator(1);
        Bs.log("Start of method:: displayObjects()");
        Bs.displaySeparator();

        Bs.log("objName ==> " + objName);
        Bs.log("obj ==> ...");
        Bs.log(obj);


        Bs.log("\nlooping through object:: " + objName);
        for (const property in obj) {
            Bs.log(`${property}: ${obj[property]}`);
        }


        Bs.displaySeparator(1);
        Bs.log("End of method:: displayObjects()");
        Bs.displaySeparator();
    }
}



export default BsCore2;