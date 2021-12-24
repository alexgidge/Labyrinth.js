class SettingService {
    static async LoadSettingsDefaults() {
        if (!SettingService.Settings) {
            SettingService.Settings = settings;
        }

        if (!SettingService.Settings) {
            var defaultSettings = await AssetDataAccess.GetJSONFileData('settings.json');
            var playerSettings = JSON.parse(await PlayerPrefs.GetPlayerPref('controls'));
            var settings = [];//TODO: Cache

            defaultSettings.Settings.forEach(element => {
                var value = element.value;
                if (playerControls) {
                    playerControls.forEach(playerPref => {
                        if (playerPref.action == element.action) {
                            value = playerPref.value;
                        }
                    });
                }
                settings.push({ text: element.text, action: element.setting, key: value });
            });
            SettingService.Settings = settings;
        }
        return SettingService.Settings;
    }
}