class AssetDataAccess {
    static async GetJSONFileData(filename) {
        var data = await fetch('../Assets/' + filename, {
            credentials: 'same-origin'
        })
            .then(response => response.json())
        return data;
    }
    static async LoadAudioAssets() {
        if (!AssetDataAccess.AudioAssets) {
            var audio = await AssetDataAccess.GetJSONFileData('audio.json');
            AssetDataAccess.AudioAssets = audio;
        }
        return AssetDataAccess.AudioAssets;
    }
    static async LoadMapAssets() {
        if (!AssetDataAccess.MapAssets) {
            var maps = await AssetDataAccess.GetJSONFileData('maps.json');
            AssetDataAccess.MapAssets = maps.Maps;
        }
        return AssetDataAccess.MapAssets;
    }
    static async LoadSettingsDefaults() {
        if (!AssetDataAccess.Settings) {
            var settings = await AssetDataAccess.GetJSONFileData('settings.json');
            AssetDataAccess.Settings = settings;
        }
        return AssetDataAccess.Settings;
    }
    static async LoadControlMappings() {
        if (!AssetDataAccess.ControlMappings) {
            var controls = await AssetDataAccess.GetJSONFileData('controls.json');
            AssetDataAccess.ControlMappings = controls;
        }
        return AssetDataAccess.ControlMappings;
    }
    static async GetAudioAsset(entityType, soundName) {//TODO: EntityType
        var assets = await AssetDataAccess.LoadAudioAssets();
        if (assets[entityType].Sounds) {
            var audioAsset;
            assets[entityType].Sounds.forEach(element => {
                if (element.SoundName == soundName) {
                    audioAsset = element;
                }
            });
            return audioAsset;
        }
    }
    static async GetMap(mapName) {
        var assets = await AssetDataAccess.LoadMapAssets();
        var map;
        assets.forEach(element => {
            if (element.ID == mapName) {
                map = element;
            }
        });
        return map;
    }
}