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

    $('#settingsBody').html(settingsList.map(AudioSettingsTemplate).join(''));

    $('.btn-listen-to-audio').click(function (evt) {
        var name = $(this).val();
        var names = name.split('-');
        var volume = $('#' + name + '-Volume').val();
        StopAllAudio();
        PlayAudio(names[1], names[2], names[0], volume);
        evt.preventDefault();
    });
}
var sound;//TODO: Move to audio engine
async function PlayAudio(SoundEntity, SoundEntitySubType, SoundName, volume) {
    var soundMeta = await SoundService.GetAudioAsset(SoundEntity, SoundEntitySubType, SoundName);
    var location = "../Assets/Audio/" + soundMeta.FileName;


    var soundVolume = soundMeta.Volume;//Default for non-specified audio
    if (volume) { soundVolume = volume; }//Overwrite if provided

    //TODO: Rewrite and wrap howl implementation
    sound = new Howl({
        src: [location],
        volume: soundVolume
    });

    var walking = sound.play();

    sound.stereo(soundVolume, walking);//TODO: Why is volume needed twice? I'm just slightly confused but it's working
}

function StopAllAudio() {
    if (sound) {
        sound.stop();
    }
}

async function SaveAudioSettingsForm(evt) {

    var currentSettings = await SoundService.LoadAudioAssets();//TODO: Get filename, group, subtype etc. and volume from current settings
    var form = $('#frmSettings').serializeArray();
    var audioSettings = [];
    form.forEach(element => {
        var names = element.name.split('-');
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
    $('#pSaveSuccess').text('Saved.');
    setTimeout(function () {
        $('#pSaveSuccess').text(' ');
    }, 1000);
}


//TODO: React or similar lightweight front end framework
const AudioSettingsTemplate = ({ SoundType, SoundSubType, SoundDisplayName, SoundName, Volume, FileName }) => `
<tr>
<td>
<label for="btn${SoundName}-${SoundType}-${SoundSubType}-Listen">${SoundSubType} ${SoundType} ${SoundDisplayName}</label>
</td>
<td >
<button id="btn${SoundName}-${SoundType}-${SoundSubType}-Listen" value="${SoundName}-${SoundType}-${SoundSubType}" class="btn btn-light btn-listen-to-audio">Listen</button>
</td>
<td>
<input type="text" class="form-control" name="${SoundName}-${SoundType}-${SoundSubType}-Volume" id="${SoundName}-${SoundType}-${SoundSubType}-Volume" value="${Volume}"></input>
</td>
<td>
<input type="text" class="form-control" name="${SoundName}-${SoundType}-${SoundSubType}-File" id="${SoundName}-${SoundType}-${SoundSubType}-File" value="${FileName}"></input>
</td>
</tr>
`