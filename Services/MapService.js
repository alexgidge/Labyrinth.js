class MapService {
    static async LoadMapAssets() {
        //TODO: Injection
        var JSONMaps = await AssetDataAccess.GetJSONFileData('maps.json');
        var playerMaps = JSON.parse(PlayerPrefs.GetPlayerPref('maps'));//TODO: Get player maps from local storage
        var allMaps = JSONMaps.Maps;

        if (playerMaps) {
            allMaps = [];
            playerMaps.Maps.forEach(element => {
                allMaps.push(element);
            });
        }

        return allMaps;
    }

    static async GetMap(mapName) {
        var assets = await MapService.LoadMapAssets();
        var map;
        assets.forEach(element => {
            if (element.ID == mapName) {
                map = element;
            }
        });
        return map;
    }

    static async SaveMaps(mapJSON) {
        PlayerPrefs.SavePlayerPref('maps', mapJSON);
    }
}