class GameControls {
    static async GetControls() {
        //TODO: Where does this belong? Should I instead inject controls and let the web JS decide control input to use?
        var defaultControls = await AssetDataAccess.LoadControlMappings();
        var playerControls = await PlayerPrefs.GetPlayerPref('Controls');
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
        return settings;
    }
}