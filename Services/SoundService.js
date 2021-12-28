class SoundService {
    static async LoadAudioAssets() {
        if (!SoundService.AudioAssets) {
            var playerSounds = JSON.parse(await PlayerPrefs.GetPlayerPref('sounds'));
            if (playerSounds) {
                SoundService.AudioAssets = playerSounds;
                return SoundService.AudioAssets;
            }
            else {
                SoundService.AudioAssets = await AssetDataAccess.GetJSONFileData('sounds.json');
                return SoundService.AudioAssets;
            }
        }
        return SoundService.AudioAssets;
    }
    static async GetAudioAsset(entityType, soundName) {//TODO: EntityType
        var assets = await SoundService.LoadAudioAssets();
        var audioAsset;
        assets.Sounds.forEach(element => {
            if (element.SoundType == entityType) {
                if (sound.SoundName == soundName) {
                    audioAsset = sound;
                }
            }
        });
        if (audioAsset) {
            return audioAsset;
        } else {
            console.log('Audio asset not found');
        }
    }

    static SaveAudioSettings(AudioSettingsJSON) {
        PlayerPrefs.SavePlayerPref('sounds', AudioSettingsJSON);
    }
}