class AssetDataAccess {
    static Initialise() {
        if (!this.AudioAssets) {
            var asset = fetch('../Assets/audio.json', {
                credentials: 'same-origin'
            })
                .then(response => response.json())
                .then(data => this.AudioAssets = data);
        }
    }
    static GetAudioAsset(assetName) {//TODO: You guessed it - refactor.
        var assets = this.AudioAssets;
        if (assets[assetName]) {
            return assets[assetName];
        }
    }
}