class PlayerPrefs {
    static SavePlayerPref(prefName, prefValue) {
        localStorage.setItem(prefName, JSON.stringify(prefValue));
    }
    static DeletePlayerPref(prefName) {
        localStorage.removeItem(prefName);
    }
    static GetPlayerPref(prefName) {
        return JSON.parse(localStorage.getItem(prefName));
    }
}