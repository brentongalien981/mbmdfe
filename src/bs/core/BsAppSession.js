import Bs from "./Bs";

class BsAppSession {

    static clear() {
        sessionStorage.clear();
    }

    static set(key, val = '') {
        key = Bs.appName + "::" + key;

        try {
            sessionStorage.setItem(key, val);
        } catch (e) {
            return false;
        }

        return true;
    }



    static get(key) {
        key = Bs.appName + "::" + key;
        let val = sessionStorage.getItem(key);
        return val;
    }

    static isLoggedIn() {
        return BsAppSession.get("isLoggedIn") == 1;
    }
}



export default BsAppSession;