class AssetDataAccess {
    static MapAssets;
    static AudioAssets;
    static async Initialise() {
        await AssetDataAccess.LoadAudioAssets();
        await AssetDataAccess.LoadMapAssets();
        console.log(AssetDataAccess.AudioAssets);
        console.log(AssetDataAccess.MapAssets);
        return (AssetDataAccess.AudioAssets && AssetDataAccess.MapAssets);
    }
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
    }
    static async LoadMapAssets() {
        if (!AssetDataAccess.MapAssets) {
            var maps = await AssetDataAccess.GetJSONFileData('maps.json');
            AssetDataAccess.MapAssets = maps;
        }
    }
    static async LoadSettingsDefaults() {
        if (!AssetDataAccess.MapAssets) {
            var maps = await AssetDataAccess.GetJSONFileData('settings.json');
            AssetDataAccess.MapAssets = maps;
        }
    }
    static async LoadControlMappings() {
        if (!AssetDataAccess.ControlMappings) {
            var controls = await AssetDataAccess.GetJSONFileData('controls.json');
            AssetDataAccess.ControlMappings = controls;
        }
        return AssetDataAccess.ControlMappings;
    }
    static GetAudioAsset(assetName) {//TODO: You guessed it - refactor.
        var assets = AssetDataAccess.AudioAssets;
        if (assets[assetName]) {
            return assets[assetName];
        }
    }
    static GetMap(mapName) {
        var assets = AssetDataAccess.MapAssets;
        if (assets[mapName]) {
            return assets[mapName];
        }
    }
}