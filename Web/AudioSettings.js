//TODO: Refactor UI



$(function () {
    PopulateAudioSettingsForm();
    $('#btnSaveAudio').click(function (evt) {
        SaveAudioSettingsForm(evt);
    });
});

async function PopulateAudioSettingsForm() {
    var audioSettings = await SoundService.LoadAudioAssets();
    var settingsList = [];

    audioSettings.Sounds.forEach(sound => {
        var soundSetting = {};
        soundSetting.SoundType = sound.SoundType;
        if (sound.SoundSubType) {
            soundSetting.SoundSubType = sound.SoundSubType;
        }
        else {
            soundSetting.SoundSubType = '';
        }
        soundSetting.SoundDisplayName = sound.SoundDisplayName;
        soundSetting.SoundName = sound.SoundName;
        soundSetting.Volume = sound.Volume;
        soundSetting.FileName = sound.FileName;
        settingsList.push(soundSetting);
    });

    $('#frmSettings').html(settingsList.map(AudioSettingsTemplate).join(''));
}

async function SaveAudioSettingsForm(evt) {

    var currentSettings = await SoundService.LoadAudioAssets();//TODO: Get filename, group, subtype etc. and volume from current settings
    var form = $('#frmSettings').serializeArray();
    var audioSettings = [];
    form.forEach(element => {
        var names = element.name.split(':');
        var name = names[0];

        var playerSoundSetting = {};
        playerSoundSetting.SoundName = names[0];
        playerSoundSetting.SoundType = names[1];
        if (names[2]) {
            playerSoundSetting.SoundSubType = names[2];
        }
        else {
            playerSoundSetting.SoundSubType = '';
        }

        if (names[3] == 'Volume') {
            playerSoundSetting.Volume = element.value;
        }
        else if (names[3] == 'File') {
            playerSoundSetting.FileName = element.value;
        }

        var exists = false;
        audioSettings.forEach(setting => {
            if (setting.SoundName == playerSoundSetting.SoundName && setting.SoundType == playerSoundSetting.SoundType && setting.SoundSubType == playerSoundSetting.SoundSubType) {
                exists = true;
                if (names[3] == 'Volume') {
                    setting.Volume = element.value;
                }
                else if (names[3] == 'File') {
                    setting.FileName = element.value;
                }
                setting.AudioLocation = 'PlayerData';
            }
        });

        if (exists != true) {
            audioSettings.push(playerSoundSetting);
        }
        //TODO: Drop down of all audio files
        //TODO: Ability to upload audio files
        //TODO: Button to delete all custom audio files, maps, etc.
    });
    SoundService.SaveAudioSettings(JSON.stringify({ Sounds: audioSettings }));
}


//TODO: React or similar lightweight front end framework
const AudioSettingsTemplate = ({ SoundType, SoundSubType, SoundDisplayName, SoundName, Volume, FileName }) => `
<div class="row">
<div>
<label>${SoundSubType} ${SoundType} ${SoundDisplayName}</label>
</div>
<div class="col">
<label for="${SoundName}:${SoundType}:${SoundSubType}:Volume">Volume</label>
<input type="text" class="form-control" name="${SoundName}:${SoundType}:${SoundSubType}:Volume" id="${SoundName}:${SoundType}:${SoundSubType}:Volume" value="${Volume}"></input>

</div>
<div class="col">
<label for="${SoundName}:${SoundType}:${SoundSubType}:File">Audio File</label>
<input type="text" class="form-control" name="${SoundName}:${SoundType}:${SoundSubType}:File" id="${SoundName}:${SoundType}:${SoundSubType}:File" value="${FileName}"></input>
</div>
</div>
`