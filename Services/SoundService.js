class SoundService {
    static async LoadAudioAssets() {
        if (!SoundService.AudioAssets) {
            var playerSounds = JSON.parse(await PlayerPrefs.GetPlayerPref('sounds'));
            if (playerSounds) {
                SoundService.AudioAssets = playerSounds;
                return SoundService.AudioAssets;
            }
            else {
                SoundService.AudioAssets = await AssetDataAccess.GetJSONFileData('audio.json');
                return SoundService.AudioAssets;
            }
        }
        return SoundService.AudioAssets;
    }
    static async GetAudioAsset(entityType, soundName) {//TODO: EntityType
        var assets = await SoundService.LoadAudioAssets();
        var audioAsset;
        assets.GroupedSounds.forEach(element => {
            if (element.ID == entityType) {
                element.Sounds.forEach(sound => {
                    if (sound.SoundName == soundName) {
                        audioAsset = element;
                    }
                });
            }
        });
        if (audioAsset) {
            return audioAsset;
        } else {
            console.log('Audio asset not found');
        }
    }

    static SaveAudioAssets(AudioJSON) {
        PlayerPrefs.SavePlayerPref('sounds', AudioJSON)
    }
}