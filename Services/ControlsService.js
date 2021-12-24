class ControlsService {
    static async LoadControlMappings() {
        if (!ControlsService.ControlMappings) {
            var defaultControls = await AssetDataAccess.GetJSONFileData('controls.json');
            var playerControls = JSON.parse(await PlayerPrefs.GetPlayerPref('controls'));
            var settings = [];//TODO: Cache

            defaultControls.Controls.forEach(element => {
                var value = element.key;
                if (playerControls) {
                    playerControls.forEach(playerPref => {
                        if (playerPref.action == element.action) {
                            value = playerPref.key;
                        }
                    });
                }
                settings.push({ text: element.text, action: element.action, key: value });
            });
            ControlsService.ControlMappings = settings;
        }
        return ControlsService.ControlMappings;
    }

    static async SaveControls(controlsJSON) {
        PlayerPrefs.SavePlayerPref('controls', controlsJSON);
    }
}