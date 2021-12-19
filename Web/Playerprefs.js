class PlayerPrefs {
    constructor() {
        this.controlsGroup = 'ControlsGroup';
        this.settingsGroup = 'SettingsGroup';
    }
    //TODO:Maps
    static GetKeyMappings() {
        //TODO: Get
        return PlayerPrefs.GetPlayerPref(this.controlsGroup);
    }
    static UpdateKeyMappings(keyName, keyMappings) {
        this.SavePlayerPref(this.controlsGroup, keyValue);
    }
    static GetSettings() {
        //TODO: Get
    }
    static SaveSettings() {
        //TODO: save
    }
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