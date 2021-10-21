class Bs {

    static appName = "MBMDFE";

    // BMD-ON-ITER: DEVELOPMENT, PRETESTING, PRESTAGING, STAGING, DEPLOYMENT
    static appUrl = "https://managebmdstore.asbdev.com";
    static pubPhotoUrl = "https://s3.us-east-2.amazonaws.com/bs.s3.public/photos/";

    // // FOR MAC
    // static appBackendUrl = "http://mbmdbe.test:8000";
    // static appApiUrl = "http://mbmdbe.test:8000/api";

    // FOR WINDOWS
    // DEVELOPMENT
    // static appBackendUrl = "http://mbmdbe.test";
    // static appApiUrl = "http://mbmdbe.test/api";
    // 
    // static appBackendUrl = "http://localhost:8000";
    // static appApiUrl = "http://localhost:8000/api";

    // PRETESTING
    // static appBackendUrl = "http://localhost:9002";
    // static appApiUrl = "http://localhost:9002/api";

    // PRESTAGING
    static appBackendUrl = "https://mbmdbe.asbdev.com";
    static appApiUrl = "https://mbmdbe.asbdev.com/api";



    static getRandomId(length = 64) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }



    static log(msg) {
        console.log(msg);
    }



    static displaySeparator(numOfLineBreaks = 0) {
        for (let i = 0; i < numOfLineBreaks; i++) {
            Bs.log("\n");

        }
        Bs.log("###################################");
    }



    static getParsedQueryParams(q, acceptedParams) {

        //
        q = q.substr(1);
        const keyValuePairs = q.split('&');

        let parsedParams = [];

        if (q) {
            keyValuePairs.forEach(pair => {
                const splitPair = pair.split('=');
                const key = splitPair[0]?.trim();
                const value = splitPair[1]?.trim();

                if (acceptedParams.includes(key)) {
                    parsedParams[key] = value;
                }
            });
        }


        return parsedParams;
    }



    static compareNumerically(a, b) {
        return a - b;
    }
}



export default Bs;