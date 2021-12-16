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
    static async LoadAudioAssets() {
        if (!AssetDataAccess.MapAssets) {
            var maps = await fetch('../Assets/maps.json', {
                credentials: 'same-origin'
            })
                .then(response => response.json())
                .then(data => AssetDataAccess.MapAssets = data);
        }
    }
    static async LoadMapAssets() {
        if (!AssetDataAccess.AudioAssets) {
            var audioAssets = await fetch('../Assets/audio.json', {
                credentials: 'same-origin'
            })
                .then(response => response.json())
                .then(data => AssetDataAccess.AudioAssets = data);
        }
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