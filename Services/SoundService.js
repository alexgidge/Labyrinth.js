class SoundService {
    static async LoadAudioAssets() {

        SoundService.AudioAssets = { Sounds: [] };
        var defaultSounds = await AssetDataAccess.GetJSONFileData('sounds.json');
        var playerSounds = JSON.parse(await PlayerPrefs.GetPlayerPref('sounds'));

        defaultSounds.Sounds.forEach(setting => {
            if (playerSounds) {
                playerSounds.Sounds.forEach(playerSound => {
                    if (setting.SoundName == playerSound.SoundName && setting.SoundType == playerSound.SoundType && setting.SoundSubType == playerSound.SoundSubType) {
                        setting.Volume = playerSound.Volume;
                        setting.FileName = playerSound.FileName;
                    }
                });
            }
            SoundService.AudioAssets.Sounds.push(setting);
        });
        return SoundService.AudioAssets;
    }

    static async GetAudioAsset(entityType, entitySubType, soundName) {//TODO: EntityType
        var assets = await SoundService.LoadAudioAssets();
        var audioAsset;
        assets.Sounds.forEach(element => {
            if (element.SoundType == entityType && element.SoundName == soundName && element.SoundSubType == entitySubType) {
                audioAsset = element;
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