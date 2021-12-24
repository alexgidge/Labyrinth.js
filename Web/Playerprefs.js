class PlayerPrefs {
    constructor() {

    }
    static SavePlayerPref(prefName, prefJSONValue) {
        localStorage.setItem(prefName, prefJSONValue);
    }
    static DeletePlayerPref(prefName) {
        localStorage.removeItem(prefName);
    }
    static GetPlayerPref(prefName) {
        return localStorage.getItem(prefName);
    }
}