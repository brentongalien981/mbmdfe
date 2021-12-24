class Bs {

    // BMD-ON-ITER: Every iteration, edit this.
    static appName = "MBMDFE";
    static detailedAppEnv = 'staging';
    static developmentOs = 'windows';
    static pubPhotoUrl = "https://s3.us-east-2.amazonaws.com/bs.s3.public/photos/";



    static getAppUrl() {
        switch (Bs.detailedAppEnv) {
            case 'development':
                return 'http://localhost:3001';
            case 'pretesting':
                return 'http://192.168.1.116:7002';
            case 'prestaging':
                return "http://managebmdstorestaging.asbdev.com";
            case 'staging':
            case 'deployment':
            case 'production':
                return "http://manage.penguinjam.ca";
            case 'jobportfolio':
                return "http://managebmdstore2.asbdev.com";
            default:
                return 'http://localhost:3001';
        }
    }



    static getAppBackendUrl() {
        switch (Bs.detailedAppEnv) {
            case 'development':
                if (Bs.developmentOs === 'mac') { return 'http://mbmdbe.test:8000'; }
                return 'http://mbmdbe.test';
            case 'pretesting':
                return 'http://192.168.1.116:9002';
            case 'prestaging':
                return "http://mbmdbestaging.asbdev.com";
            case 'staging':
            case 'deployment':
            case 'production':
                return "http://mbmdbe.penguinjam.ca";
            case 'jobportfolio':
                return "http://mbmdbe2.asbdev.com";
            default:
                return 'http://mbmdbe.test';
        }
    }



    static getAppApidUrl() {
        switch (Bs.detailedAppEnv) {
            case 'development':
                if (Bs.developmentOs === 'mac') { return 'http://mbmdbe.test:8000/api'; }
                return 'http://mbmdbe.test/api';
            case 'pretesting':
                return 'http://192.168.1.116:9002/api';
            case 'prestaging':
                return "http://mbmdbestaging.asbdev.com/api";
            case 'staging':
            case 'deployment':
            case 'production':
                return "http://mbmdbe.penguinjam.ca/api";
            case 'jobportfolio':
                return "http://mbmdbe2.asbdev.com/api";
            default:
                return 'http://mbmdbe.test/api';
        }
    }



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
        switch (Bs.detailedAppEnv) {
            case 'staging':
            case 'production':
            case 'deployment':
                return;
            default:
                console.log(msg);
        }

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
